<template>
  <div>
    <div>
      <el-input v-model="key" placeholder="请输入内容">
        <el-button slot="append" @click="searchKey" icon="el-icon-search">搜索</el-button>
      </el-input>
    </div>
    <el-table v-if="searchFlag" :data="tableData" @row-click="playMusic" style="width: 100%">
      <el-table-column label="专辑" width="70">
        <template slot-scope="scope">
          <img :src="scope.row.albumurl" width="40" height="40" />
        </template>
      </el-table-column>
      <el-table-column prop="songname" label="歌名" width="150"></el-table-column>
      <el-table-column prop="singer[0].name" label="歌手" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click.native="addMusic($event,scope.row)" type="primary" size="small">添加到列表</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import utils from "../utils";
export default {
  data() {
    return {
      key: "",
      tableData: [],
      searchFlag: false
    };
  },
  mounted() {},
  destroyed() {},
  methods: {
    async addMusic(e,row) {
      e.stopPropagation()
      let music = await this.addMusictoPlayer(row);
      if (!utils.checkObj(music)) {
        this.$store.dispatch("insertMusic", music);
      }
    },
    async playMusic(row) {
      console.log(row)
      let music = await this.addMusictoPlayer(row);
      if (!utils.checkObj(music)) {
        this.$store.dispatch("playerMusic", music);
        this.$store.dispatch("insertMusic", music);
      }
    },
    async searchKey() {
      let that = this;
      if (utils.checkObj(that.key)) {
        that.$notify({
          title: "输入值不能为空"
        });
        return;
      }
      await that
        .$fetch("/music/search", {
          params: {
            key: that.key,
            p: 1,
            n: 10
          }
        })
        .then(response => {
          that.tableData = response;
          that.searchFlag = true;
        })
        .catch(() => {
          that.$notify({
            title: "歌曲不见了"
          });
          return;
        });
    },
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
        })
        .catch(() => {
          console.log("获取" + music.songname + "歌词失败");
        });
      let playMusic = {
        title: music.songname,
        artist: music.singer[0].name,
        src: src,
        pic: music.albumurl,
        lrc: lrc
      };
      if (!utils.checkObj(src)) {
        return playMusic;
      }
      return null;
    }
  },
  created: function() {}
};
</script>

<style >
</style>