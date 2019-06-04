<template>
  <div>
    <div v-for="item in lists" :key="item.id" class="list">
      文集名称 {{ item.name }}:
      <div v-for="article in item.articles" :key="article.id">
        <div @click="$router.push('/article/' + article.id)" class="article">
          文章标题 {{ article.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: []
    };
  },
  mounted() {
    this.$axios.get("/api/lists/" + this.$store.state.userid).then(res => {
      console.log(res);
      if (res.data.status === 1 && res.data.msg == "拉取文集成功")
        this.lists = res.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.list {
  margin: 40px;
  font-size: 20px;
  border: 1px gray solid;
  .article {
    cursor: pointer;
  }
}
</style>
