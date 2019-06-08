<template>
  <div class="list">
    <div class="left">
      <h2 @click="$router.push(url)">{{ mydata.title }}</h2>
      <!-- <div class="time">发布时间：{{ datestring }}</div> -->
      <!-- <div>{{ mydata.content }}</div> -->
      <!-- <div class="name">{{ mydata.username }}</div> -->
      <div class="markdown-body">{{ mydata.output }}</div>
      <div class="tail">
        <!-- <span class="el-icon-message info">{{ mydata.count_some }}</span> -->
        <span class="el-icon-user info">{{ mydata.username }}</span>
        <span class="el-icon-view info">{{ mydata.clickCount }}</span>
        <span class="el-icon-chat-line-square info">{{
          mydata.comment.length
        }}</span>
        <span class="info">❤{{ mydata.liked.length }}</span>

        <span class="time">{{ datestring }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
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
  .left {
    text-align: left;
    display: inline-block;
    position: relative;
    width: 80%;
    padding-bottom: 20px;
    border-bottom: 1px rgb(197, 196, 196) solid;
    // .time {
    //   position: absolute;
    //   right: 2%;
    //   top: 30%;
    // }
    h2 {
      cursor: pointer;
      display: inline-block;
      &:hover {
        text-decoration-line: underline;
      }
    }
    .markdown-body {
      overflow: hidden;
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
        // text-align: right;
      }
    }
  }
  // .right {
  //   display: inline-block;
  //   width: 20%;
  // }
  .info {
    padding: 5px 15px 5px 0;
  }
}
</style>
