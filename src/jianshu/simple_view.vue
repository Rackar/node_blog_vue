<template>
  <div class="list">
    <div class="left">
      <h2 @click="$router.push(url)">{{ mydata.title }}</h2>
      <!-- <div>{{ mydata.content }}</div> -->
      <div v-html="mydata.content" class="markdown-body"></div>
      <div>
        <span class="el-icon-message info">{{ mydata.count_some }}</span>
        <span class="el-icon-message info">{{ mydata.count_view }}</span>
        <span class="el-icon-message info">{{ mydata.count_comit }}</span>
        <span class="el-icon-message info">{{ mydata.count_like }}</span>

        <span>{{ mydata.time }}</span>
      </div>
    </div>

    <div class="right">
      <img :src="mydata.img_url" alt width="120px" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: {}
    };
  },
  mounted() {
    // this.content = this.simplemde.markdown(this.mydata.content);
  },
  props: {
    mydata: {
      type: Object,
      default() {
        return {
          title: "标题",
          _id: "",
          content:
            "背景 天天5岁以后，明显开始不好说服和指挥了。之前随意指挥一下“该做Book Room了”（英语app阅读任务），他就颠颠的配合你做，可现在会找...",
          count_some: "0",
          count_view: "0",
          count_comit: "0",
          count_like: "0",
          time: "04.25 01:24",
          img_url: "/img/1.jpg"
        };
      }
    }
  },
  computed: {
    url() {
      return "/article/" + this.mydata._id;
    }

    // simplemde() {
    //   return this.$refs.markdownEditor.simplemde;
    // },
    // newcontent() {
    //   return this.mydata.content;
    // }
  }
};
</script>

<style lang="scss" scoped>
.list {
  margin: 12px 3px;
  margin-left: 30px;
  text-align: left;
  width: 100%;
  .left {
    display: inline-block;
    width: 80%;
    h2 {
      cursor: pointer;
      &:hover {
        text-decoration-line: underline;
      }
    }
  }
  .right {
    display: inline-block;
    width: 20%;
  }
  .info {
    padding: 5px;
  }
}
</style>
