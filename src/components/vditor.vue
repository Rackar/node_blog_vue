<template>
  <div>
    <div id="vditor"></div>
  </div>
</template>

<script>
import Vditor from "vditor";
export default {
  mounted() {
    const vditor = new Vditor("vditor");
    vditor.focus();
  }
};
</script>

<style lang="scss">
@import "../../node_modules/vditor/src/assets/scss/classic";
#vditor {
  height: 800px;
}
</style>
