<template>
  <div>
    <aplayer
      :showLrc="true"
      :autoplay="true"
      :music="playerList"
      v-if="flag"
      :float="true"
      ref="player"
    />
    <el-table :data="tableData" @row-click="playMusic" style="width: 100%">
      <el-table-column label="专辑" width="70">
        <template slot-scope="scope">
          <img :src="scope.row.albumurl" width="40" height="40" />
        </template>
      </el-table-column>
      <el-table-column prop="songname" label="歌名" width="150"></el-table-column>
      <el-table-column prop="singer[0].name" label="歌手" width="150"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import Aplayer from "vue-aplayer";
import utils from "../utils";
export default {
  data() {
    return {
      tableData: [],
      playerList: {},
      flag: false,
      isFixed: false,
      offsetTop: 0
    };
  },
  components: {
    Aplayer
  },
  mounted() {
   
  },
  destroyed() {
  
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= this.offsetTop) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    playMusic(e) {
      this.addMusictoPlayer(e);
    },
    // 去掉歌词中的转义字符
    _normalizeLyric: function(lyric) {
      return lyric
        .replace(/&#58;/g, ":")
        .replace(/&#10;/g, "\n")
        .replace(/&#46;/g, ".")
        .replace(/&#32;/g, " ")
        .replace(/&#45;/g, "-")
        .replace(/&#40;/g, "(")
        .replace(/&#41;/g, ")");
    },
    async addMusictoPlayer(music) {
      let that = this;
      let src = "";
      /** 获取歌曲 */
      await that
        .$fetch("/music/get", {
          params: {
            mid: music.albummid
          }
        })
        .then(response => {
          src = response.link;
        })
        .catch(() => {
          this.$notify({
            title: "歌曲不见了",
            message: "可以尝试搜索这个(" + music.songname + ")歌曲听歌"
          });
          return;
        });
      let lrc = "";
      /** 获取歌词 */
      await that
        .$fetch("/lyric/get", {
          params: {
            mid: music.songid
          }
        })
        .then(response => {
          lrc = that._normalizeLyric(response.lyric);
        }).catch(() =>{
          console.log('获取'+music.songname+'歌词失败')
        });
      let playMusic = {
        title: music.songname,
        artist: music.singer[0].name,
        src: src,
        pic: music.albumurl,
        lrc: lrc
      };
      if (!utils.checkObj(src)) {
        that.playerList = playMusic;
        this.flag = true;
      }
    }
  },
  created: function() {
    let that = this;
    that.$fetch("/music/top").then(response => {
      that.tableData = response;
    });
  }
};
</script>

<style >

</style>