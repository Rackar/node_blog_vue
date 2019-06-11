<template>
  <div>
    上传/更新头像
    <myupload :uploadType="{ type: 'avatar' }"></myupload>
  </div>
</template>

<script>
import myupload from "./upload";
export default {
  data() {
    return {};
  },
  components: {
    myupload
  }
};
</script>

<style lang="scss"></style>
