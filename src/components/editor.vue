<template>
  <div class="editor">
    <el-input v-model="title" placeholder="文章标题"></el-input>
    <!-- <editor
      v-model="content"
      previewStyle="tab"
      :options="options"
      :html="output"
      height="500px"
      mode="markdown"
      @load="onEditorLoad"
    />-->
    <div id="vditor"></div>预览窗口：
    <div class="vditor-preview vditor-reset" v-html="html"></div>
    <!-- <div id="preview"></div> -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="是否插入预览图">
        <el-checkbox v-model="formInline.active">开启</el-checkbox>
      </el-form-item>
      <myupload :uploadType="{ type: 'articleImage' }" @uploadedImageId="getImageId"></myupload>
    </el-form>
    <!-- 创建文集
    <el-input v-model="listname" placeholder></el-input>
    <el-button @click="saveList">添加</el-button>-->
    <el-button @click="newsave">保存</el-button>
  </div>
</template>

<script>
import myupload from "../components/uploadnew";
import Vditor from "vditor";
// import Editor from "@toast-ui/vue-editor/src/Editor.vue";
// import Viewer from "@toast-ui/vue-editor/src/Viewer.vue";
export default {
  components: {
    myupload
  },
  computed: {},
  mounted() {
    let options = {
      preview: {
        delay: 100,
        show: true
      }
    };
    let options2 = {
      preview: {
        delay: 100
        // show: true
      },
      toolbar: []
    };
    this.initVditor();
    this.$nextTick(async () => {
      await this.vditor.getHTML(true);
      this.isLoading = false;
    });
    const vditor = new Vditor("vditor", options);
    // const vditor2 = new Vditor("preview", options2);
    this.vditor = vditor;
    vditor.focus();
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
      html: "aaa",
      vditor: {},
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
    initVditor() {
      const options = {
        cache: true,
        // toolbar: toolbarConf,
        width: this.isMobile ? "100%" : "80%",
        height: "0",
        tab: "\t",
        counter: "999999",
        preview: {
          delay: 100,
          show: !this.isMobile
        }
      };
      this.vditor = new Vditor("vditor", options);
      this.vditor.focus();
      this.setDefaultText();
    },
    setDefaultText() {
      const savedValue = this.vditor.getValue();
      if (!savedValue) {
        this.vditor.insertValue();
      }
    },
    getImageId(id) {
      this.previewImageId = id;
    },

    save() {
      this.$store.commit("saveTempContent", {
        title: this.title,
        content: this.content
      });
      let title = this.vditor.getHTML().then(res => {
        console.log(res);
      });
      debugger;
      let body = {
        title: this.title,
        content: this.content,
        output: this.content.substring(0, 120),
        time: new Date(),
        count_some: 0,
        count_view: 0,
        count_comit: 0,
        count_like: 0,
        previewImageId: this.previewImageId
      };

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
    newsave() {
      console.log(this.vditor.getValue());
      // let that = this;
      // async function getHtml() {
      //   let result = await that.vditor.getHTML();
      //   return result;
      // }
      // this.html = getHtml();

      this.vditor.getHTML().then(res => {
        this.html = res;
        console.log(res);
      });
    },
    onEditorLoad() {}
  }
};
</script>

<style lang="scss">
@import "../../node_modules/vditor/src/assets/scss/classic";
#vditor {
  height: 800px;
}
#preview {
  height: 600px;
}

.editor {
  text-align: left;
  width: 100%;
}

div.tui-editor-defaultUI {
  text-align: left;
}
</style>
