<template>
  <div class="editor">
    <el-input v-model="title"></el-input>
    <editor
      v-model="content"
      previewStyle="tab"
      :options="options"
      :html="output"
      height="500px"
      mode="markdown"
      @load="onEditorLoad"
    />
    <el-button @click="save">保存</el-button>
    <!-- {{ content }} -->

    <div>浏览页</div>
    {{ content }}
    <div>{{ output }}</div>
    <viewer :value="content" />
    <!-- <div v-html="output" class="markdown-body"></div> -->
  </div>
</template>

<script>
import Editor from "@toast-ui/vue-editor/src/Editor.vue";
import Viewer from "@toast-ui/vue-editor/src/Viewer.vue";
export default {
  components: {
    Editor,
    Viewer
  },
  computed: {},
  mounted() {
    // console.log(this.simplemde);
    // this.simplemde.togglePreview();
  },
  data() {
    return {
      title: "",
      output: "",
      content: "",

      options: {
        // usageStatistics: false,//关闭数据反馈
        hideModeSwitch: true,
        language: "zh_CN"
      }
    };
  },
  methods: {
    save() {
      // console.log(this.content);
      // this.output = this.simplemde.markdown(this.content);
      // this.$store.commit("saveTempContent", this.output);
      // var token = window.localStorage.getItem("token");

      let body = {
        // token: token,
        title: this.title,
        content: this.content,
        output: this.output,
        time: new Date(),
        count_some: 0,
        count_view: 0,
        count_comit: 0,
        count_like: 0
      };
      // body = JSON.stringify(body);
      this.$axios.post("/api/article", body).then(
        res => {
          console.log(res);
          if (res.data && res.data.status == 1) {
            this.$message({
              showClose: true,
              duration: 1000,
              type: "success",
              message: "文章发布成功"
            });
          } else {
            this.$message({
              showClose: true,
              duration: 1000,
              type: "error",
              message: "文章发布失败"
            });
          }
        },
        err => {
          this.$message({
            showClose: true,
            duration: 1000,
            type: "error",
            message: "文章发布失败"
          });
        }
      );
    },
    onEditorLoad() {}
  }
};
</script>

<style lang="scss" scoped>
@import "~tui-editor/dist/tui-editor.css";
@import "~tui-editor/dist/tui-editor-contents.css";
@import "~codemirror/lib/codemirror.css";
@import "~highlight.js/styles/github.css";

.editor {
  text-align: left;
  width: 100%;
}
div.tui-editor-defaultUI {
  text-align: left;
}
</style>
