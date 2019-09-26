<template>
  <div id="app">
    <el-container>
      <el-main>
        <el-tabs v-model="activeName">
          <el-tab-pane label="Pop" name="first">
            <Home></Home>
          </el-tab-pane>
          <el-tab-pane label="Search" name="second">
            <Search></Search>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>

    <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <router-link class="font-none" to="/home">Pop</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link class="font-none" to="/search">Search</router-link>
      </el-menu-item>
    </el-menu>
    <div class="line"></div>
    <router-view></router-view>-->
    <!-- <aplayer :autoplay="true" :music="playerList" v-if="flag" :float="true" ref="player" /> -->
  </div>
</template>

<script>
import Home from "./views/Home";
import Search from "./views/Search";
export default {
  name: "app",
  data() {
    return {
      activeName: "second"
    };
  },
  components: {
    Home,
    Search
  },
  methods: {
   
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
