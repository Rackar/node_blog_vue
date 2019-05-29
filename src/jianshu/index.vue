<template>
  <div class="main">
    <!-- <div class="link" @click="$router.push('/p/jianshu/')">简书</div> -->
    <div class="link" @click="$router.push('/p/jianshu/edit')">发布新文章</div>
    <div class="link" @click="$router.push('/p/jianshu/list')">列表</div>
    <div class="link" @click="$router.push('/p/jianshu/signup')">注册</div>
    <div class="link" @click="$router.push('/p/jianshu/login')">登录</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {}
};
</script>

<style lang="scss">
.main {
  .link {
    display: inline-block;
    cursor: pointer;
    margin: 2px 8px;
  }
}
</style>
