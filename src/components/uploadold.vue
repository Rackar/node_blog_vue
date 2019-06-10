<template>
  <!-- <form action="/profile" method="post" enctype="multipart/form-data">
      <input type="file" name="avatar" />
      <button type="submit">提交</button>
  </form>-->
  <div>
    <!-- <el-upload
      class="avatar-uploader"
      action="/profile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :on-success="handleSuccess"
      name="avatar"
      type="file"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <ol>
    </ol>-->

    <el-upload
      class="avatar-uploader"
      action="/api/user/image"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      name="avatar"
      type="file"
      :headers="headers"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    {{ this.done }}
    <!-- <h3>测试拉取图片</h3>
    <el-button @click="getImage">获取</el-button>-->
    <!-- <img :src="newsrc" /> -->
  </div>
</template>

<script>
export default {
  computed: {
    headers() {
      return { Authorization: this.$store.state.token };
    }
  },
  data() {
    return {
      newsrc: "",
      done: "",
      imageUrl: "",
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ],
      results: [
        {
          path: "上传文件路径"
        }
      ]
    };
  },
  methods: {
    getImage() {
      function transformArrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        for (var len = bytes.byteLength, i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      this.$axios.get("/getoneimage/" + this.$store.state.userid).then(res => {
        console.log(res);
        this.newsrc =
          "data:image/jpeg;base64," +
          transformArrayBufferToBase64(res.data.img.data.data);
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$mymess.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(event, file, fileList) {
      console.log(event, file, fileList);
      this.results.push(event.data);
    },
    handleAvatarSuccess(res, file) {
      // debugger;
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.results.push(res.data);
      if (res.data && res.data.path) {
        this.done = res.data.path;
        this.$message({
          showClose: true,
          duration: 1000,
          type: "success",
          message: "上传成功"
        });
      } else {
        this.$message({
          showClose: true,
          duration: 1000,
          type: "error",
          message: "上传失败"
        });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$mymess.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$mymess.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
