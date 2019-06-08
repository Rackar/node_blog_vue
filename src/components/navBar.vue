<template>
  <div class="nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="/">首页</el-menu-item>

      <el-menu-item index="myFollowing">关注</el-menu-item>
      <el-menu-item index="mylists">我的文集</el-menu-item>
      <el-menu-item index="edit">发表新文章</el-menu-item>
      <el-submenu index="5">
        <template slot="title"
          >用户设置</template
        >
        <el-menu-item index="useredit">用户信息修改</el-menu-item>
        <el-menu-item index="upload">上传更新头像</el-menu-item>
        <!-- <el-menu-item index="2-3">选项3</el-menu-item> -->
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"
          >注册登录</template
        >
        <el-menu-item index="signup">注册</el-menu-item>
        <el-menu-item index="login">登录</el-menu-item>
        <el-menu-item index="logout">注销</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);

      if (key == "logout") {
        this.$router.push("/");
        this.$store.commit("logout_delToken");
        this.$message({
          showClose: true,
          duration: 1000,
          type: "info",
          message: "已注销用户登录"
        });
      } else {
        var url = "/" + (key === "/" ? "" : key);
        this.$router.push(url);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  margin-bottom: 40px;
}
</style>
