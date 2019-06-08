<template>
  <div>
    <myupload :uploadType="{ type: 'avatar' }"></myupload>
  </div>
</template>

<script>
import myupload from "./uploadnew";
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
