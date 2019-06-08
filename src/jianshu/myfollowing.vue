<template>
  <div class="simple">
    <simple v-for="x in lists" :mydata="x" :key="x.id" />
  </div>
</template>

<script>
import simple from "./simple_view";
export default {
  components: {
    simple
  },
  data() {
    return {
      lists: []
    };
  },
  mounted() {
    this.getAllList();
  },
  methods: {
    getAllList() {
      this.$axios.get("http://localhost:3000/api/article/follow").then(res => {
        console.log(res);
        // this.lists = res.data;
        this.lists = [];
        if (res.data.data) this.lists.push(...res.data.data);
      });
      // this.$axios.get("http://localhost:3000/api/").then(res => {
      //   console.log(res);
      //   // this.lists = res.data;
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.simple {
  width: 80%;
  margin-left: 10%;
}
</style>
