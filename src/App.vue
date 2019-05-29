<template>
  <div id="app">
    <!-- <myheader></myheader> -->
    <div class="link" @click="$router.push('/edit')">发布新文章</div>
    <div class="link" @click="$router.push('/list')">列表</div>
    <div class="link" @click="$router.push('/signup')">注册</div>
    <div class="link" @click="$router.push('/login')">登录</div>
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
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
