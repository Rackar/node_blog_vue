<template>
  <div id="app">
    <!-- <myheader></myheader> -->
    <div id="nav">
      <div class="link" @click="$router.push('/edit')">发布新文章</div>
      <div class="link" @click="$router.push('/list')">列表</div>
      <div class="link" @click="$router.push('/signup')">注册</div>
      <div class="link" @click="$router.push('/login')">登录</div>
    </div>

    <router-view />
  </div>
</template>
<script>
// import myheader from "./header/header.vue";
export default {
  components: {
    // myheader
  },
  mounted() {
    var token = window.localStorage.token;
    if (token) this.$store.commit("login_saveToken", token);
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  .link {
    display: inline-block;
    padding: 8px;
    margin: 10px;
    background-color: antiquewhite;
    border-radius: 5px;
    font-weight: bold;
    color: #2c3e50;
    cursor: pointer;
    &:hover {
      background-color: #93eec5;
    }
  }
}
</style>
