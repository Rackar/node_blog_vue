<template>
  <div class="editor">
    <el-input v-model="title" placeholder="文章标题"></el-input>
    <editor
      v-model="content"
      previewStyle="tab"
      :options="options"
      :html="output"
      height="500px"
      mode="markdown"
      @load="onEditorLoad"
    />
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="是否插入预览图">
        <el-checkbox v-model="formInline.active">上传预览图</el-checkbox>
      </el-form-item>
      <el-form-item label v-show="formInline.active">
        <myupload :uploadType="{ type: 'articleImage' }" @uploadedImageId="getImageId"></myupload>
      </el-form-item>
    </el-form>
    <!-- 创建文集
    <el-input v-model="listname" placeholder></el-input>
    <el-button @click="saveList">添加</el-button>-->
    <el-button @click="save">保存</el-button>
  </div>
</template>

<script>
import myupload from "../components/upload";
import Editor from "@toast-ui/vue-editor/src/Editor.vue";
import Viewer from "@toast-ui/vue-editor/src/Viewer.vue";
export default {
  components: {
    Editor,
    Viewer,
    myupload
  },
  computed: {},
  mounted() {
    if (this.$route.params.id) {
      debugger;
      this.$axios
        .get("http://localhost:3000/article/" + this.$route.params.id)
        .then(result => {
          console.log(result);
          if (result.data.status === 1) {
            this.article = result.data.data;
            this.uid = result.data.data.userid;

            this.content = this.article.content;
            this.title = this.article.title;
          }
        });
    } else if (this.$store.state.temp.ifTemp) {
      this.content = this.$store.state.temp.content;
      this.title = this.$store.state.temp.title;
    }
    // console.log(this.simplemde);
    // this.simplemde.togglePreview();
  },
  data() {
    return {
      previewImageId: "",
      listname: "",
      formInline: {
        active: false,
        url: ""
      },
      article: {},
      uid: "",
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
    getImageId(id) {
      this.previewImageId = id;
    },
    save() {
      // console.log(this.content);
      // this.output = this.simplemde.markdown(this.content);
      this.$store.commit("saveTempContent", {
        title: this.title,
        content: this.content
      });
      // var token = window.localStorage.getItem("token");

      let body = {
        // token: token,
        title: this.title,
        content: this.content,
        output: this.content.substring(0, 120),
        time: new Date(),
        count_some: 0,
        count_view: 0,
        count_comit: 0,
        count_like: 0
      };
      if (this.formInline.active) body.previewImageId = this.previewImageId;

      if (this.$route.params.id) {
        body._id = this.$route.params.id;
        body.userid = this.article.userid;
        this.$axios.put("/api/article", body).then(
          res => {
            console.log(res);
            if (res.data && res.data.status == 1) {
              this.$message({
                showClose: true,
                duration: 1000,
                type: "success",
                message: "文章编辑成功"
              });
            } else {
              this.$message({
                showClose: true,
                duration: 1000,
                type: "error",
                message: "文章编辑失败"
              });
            }
          },
          err => {
            this.$message({
              showClose: true,
              duration: 1000,
              type: "error",
              message: "文章编辑失败"
            });
          }
        );
      } else {
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
      }
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
