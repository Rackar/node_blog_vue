<template>
  <div id="app">
    <el-row :gutter="10">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 16, offset: 4 }">
        <navBar></navBar>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 16, offset: 4 }">
        <div>
          <!-- <div id="nav">
            <div class="link" @click="$router.push('/myFollowing')">
              我的关注
            </div>
            <div class="link" @click="$router.push('/mylists')">我的文集</div>
            <div class="link" @click="$router.push('/list')">全部文章列表</div>
            <div class="link" @click="$router.push('/edit')">发布新文章</div>

            <div class="link" @click="$router.push('/signup')">注册</div>
            <div class="link" @click="$router.push('/login')">登录</div>

            <div class="link" @click="$router.push('/upload')">上传组件</div>

            <div class="link" @click="$router.push('/useredit')">
              用户信息修改
            </div>
          </div>-->

          <router-view />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import navBar from "./components/navBar.vue";
export default {
  components: {
    navBar
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
  // width: 500px;
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
