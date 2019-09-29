<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="trunMenu"
    >
      <el-menu-item index="1">Pop</el-menu-item>
      <el-menu-item index="2">Search</el-menu-item>
    </el-menu>
    <div class="line"></div>
    <Aplayer
      :autoplay="true"
      :list="playerList"
      :music="playerMusic"
      v-if="flag"
      :repeat="repeat"
      :float="true"
      ref="player"
    />
    <router-view></router-view>
    <!--  -->
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
export default {
  name: "app",
  data() {
    return {
      playerList: [],
      playerMusic: {},
      repeat: "repeat-all",
      flag: false,
      activeIndex: "2"
    };
  },
  computed: {
    music: function() {
      return this.$store.state.music;
    },
    musicList: function() {
      return this.$store.state.playerList;
    }
  },
  watch: {
    music(nMusic) {
      this.flag = true;
      this.playerMusic = nMusic;
    },
    musicList(nList) {
      this.flag = true;
      this.playerList = nList;
    }
  },
  methods: {
    trunMenu(e) {
      let path = this.$route.path
      if (e === "1" && path !== '/home') {
          this.$router.push("/home");
      }
      if (e === "2" && path !== '/search') {
          this.$router.push("/search");
      }
    }
  },
  components: {
    Aplayer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.font-none {
  text-decoration: none;
}
</style>
