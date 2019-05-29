<template>
  <div class="main">
    <h1>{{ article.title }}</h1>
    <div class="info">
      <!-- <div class="left">图片</div>
      <div class="middle">
        <div class="top"></div>
        <div class="bottle"></div>
      </div>
      <div class="right">按钮</div>-->
    </div>

    <!-- <div class="contant">{{ article.output }}</div> -->

    <div v-html="article.output" class="markdown-body"></div>
    <articlefooter :uid="uid"></articlefooter>
  </div>
</template>

<script>
import articlefooter from "./article_footer";
// import markdownEditor from "vue-simplemde/src/markdown-editor";
export default {
  components: {
    // markdownEditor
    articlefooter
  },

  data() {
    return {
      // output: "",
      uid: "",
      article: {
        title: "如何轻松",
        contant: `介绍
学习强国小助手app，可以自动切换文章和视频，设定停留时间。刷牙时，吃饭时，洗碗时，任何时候都可以不占用双手随时学习。需要安卓手机开启root，或者使用雷电模拟器。

注意:新版本的分享界面不一样，请不要勾选分析两次的设置。
电脑模拟器步骤`,
        writer: {
          name: "rackar"
        },
        info: "2019.04.18 16:45* 字数 312 阅读 35评论 1喜欢 0"
      }
    };
  },
  mounted() {
    this.initArticle();
  },
  methods: {
    initArticle() {
      this.$axios
        .get("http://localhost:3000/article/" + this.id)
        .then(result => {
          console.log(result);
          if (result.data.status === 1) {
            this.article = result.data.data;
            this.uid = result.data.data.userid;
          }
        });

      // this.article.contant = "今天的内容是xxxxxx，文章id" + this.id;
      // this.output = this.simplemde.markdown(this.content);
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    output() {
      return this.$store.state.output;
    }
  },
  watch: {
    id() {
      this.initArticle();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~simplemde/dist/simplemde.min.css";
.main {
  text-align: left;
  width: 100%;
  h1 {
    text-align: center;
  }
  .markdown-body {
    margin: 30px;
    border: 3px orange solid;
    padding: 20px;
    border-radius: 20px;
    font-size: 18px;
  }
  .info {
    div {
      display: inline-block;
    }
    .left {
      width: 10%;
    }
    .middle {
      width: 80%;
      .top {
        display: block;
      }
    }
    .right {
      width: 10%;
    }
  }
}
</style>
