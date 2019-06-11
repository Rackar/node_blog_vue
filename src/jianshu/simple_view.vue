<template>
  <div class="list">
    <el-row :gutter="10">
      <el-col class="left" v-bind:class="{ active: newsrc }">
        <!-- <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 20, offset: 0 }"> -->
        <h2 @click="$router.push(url)">{{ mydata.title }}</h2>

        <div class="markdown-body">{{ mydata.output }}</div>

        <div class="tail">
          <!-- <span class="el-icon-message info">{{ mydata.count_some }}</span> -->
          <i class="el-icon-user"></i>
          <span class="info">{{ mydata.username }}</span>
          <i class="el-icon-view"></i>
          <span class="info">{{ mydata.clickCount }}</span>
          <i class="el-icon-chat-line-square"></i>
          <span class="info">{{ mydata.comment.length }}</span>
          <span>❤</span>
          <span class="info">{{ mydata.liked.length }}</span>

          <span class="time">{{ datestring }}</span>
        </div>
      </el-col>
      <!-- <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 4, offset: 0 }"> -->
      <el-col v-if="newsrc" class="right">
        <img :src="newsrc" class="previewImg">
      </el-col>
    </el-row>
    <!-- <div class="left">
      <h2 @click="$router.push(url)">{{ mydata.title }}</h2>

      <div class="markdown-body">{{ mydata.output }}</div>
      <img :src="newsrc" class="previewImg" />
      <div class="tail">
        <i class="el-icon-user"></i>
        <span class="info">{{ mydata.username }}</span>
        <i class="el-icon-view"></i>
        <span class="info">{{ mydata.clickCount }}</span>
        <i class="el-icon-chat-line-square"></i>
        <span class="info">{{ mydata.comment.length }}</span>
        <span>❤</span>
        <span class="info">{{ mydata.liked.length }}</span>

        <span class="time">{{ datestring }}</span>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  methods: {},
  data() {
    return {
      content: {},
      newsrc: ""
    };
  },
  mounted() {
    function transformArrayBufferToBase64(buffer) {
      var binary = "";
      var bytes = new Uint8Array(buffer);
      for (var len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    }
    if (this.mydata.previewImageId)
      this.$axios
        .get("/getoneimage/id/" + this.mydata.previewImageId)
        .then(res => {
          console.log(res);
          // this.user = res.data.data;
          // console.log(this.user.avatar.toString());
          if (res.data && res.data.img) {
            this.newsrc =
              "data:image/jpeg;base64," +
              transformArrayBufferToBase64(res.data.img.data.data);
          } else {
            // this.$message.
          }
          // });
        });
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
          img_url: "/img/1.jpg",
          liked: [],
          publicdate: "2019-06-05T15:11:48.227Z"
        };
      }
    }
  },
  computed: {
    url() {
      return "/article/" + this.mydata._id;
    },
    datestring() {
      let d = new Date(this.mydata.publicdate);
      let datestring =
        d.getFullYear() +
        "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + d.getDate()).slice(-2) +
        " " +
        ("0" + d.getHours()).slice(-2) +
        ":" +
        ("0" + d.getMinutes()).slice(-2);
      return datestring;
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  margin: 10px 3px;
  // margin-left: 30px;
  text-align: center;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px rgb(197, 196, 196) solid;
  .left {
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    display: inline-block;
    position: relative;
    // width: 80%;

    &.active {
      width: 70%;
    }

    // .time {
    //   position: absolute;
    //   right: 2%;
    //   top: 30%;
    // }
    h2 {
      margin: 0 5px;
      cursor: pointer;
      display: inline-block;
      &:hover {
        text-decoration-line: underline;
      }
    }
    .markdown-body {
      overflow: hidden;
      padding: 18px 0;
      // white-space: nowrap;
    }
    .name {
      position: absolute;
      right: 20px;
      top: 20px;
    }
    .tail {
      .time {
        float: right;
        margin-right: 20px;
        color: rgb(179, 149, 149);
        // text-align: right;
      }
    }
  }
  .right {
    width: 30%;
    .previewImg {
      width: 200px;
    }
  }
  .info {
    padding: 5px 25px 5px 0;
    margin-left: 6px;
  }
}
</style>
