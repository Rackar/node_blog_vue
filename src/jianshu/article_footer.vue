<template>
  <div class="myfooter">
    <el-button type="danger" round>赞赏支持</el-button>
    <div class="jubao">
      <!-- <span class="right">举报</span>
      <span class="left">文集</span> -->
    </div>
    <div class="writer">
      <a href class="pic">
        <img src="/img/1.jpg" alt width="80px" />
      </a>
      <el-button type="success" round class="guanzhu">+关注</el-button>
      <div class="writer-name">作者名字:{{ user.username }}</div>
      <div>
        写了 {{ user.count.words }} 字，被
        {{ user.count.followed }} 人关注，获得了 {{ user.count.liked }} 个喜欢
      </div>
      <div class="info">
        微信公众号【程序员江湖】 作者黄小斜，斜杠青年，某985硕士，阿里 Java
        研发工程师，于 2018 年秋招拿到
      </div>
    </div>
    <div class="buttons">
      <div class="left"><div class="xihuan_button">❤喜欢 | 2</div></div>

      <div class="right">
        <el-button icon="el-icon-search" circle></el-button>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button icon="el-icon-search" circle></el-button>
      </div>
    </div>
    <div></div>

    <div class="pinglun">
      <a href class="pic">
        <img src="/img/1.jpg" alt width="80px" />
      </a>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="textarea"
        class="textbox"
      ></el-input>
    </div>
    <div>
      <el-button @click="addComment">发送</el-button>
    </div>
    <div class="pinglun_page">
      <h3>评论</h3>
      <div v-for="item in comment_lists" :key="item.id" class="pinglun_single">
        <!-- {{ item }} -->
        <div class="name">{{ item.username }}</div>
        <div class="time">{{ item.time }}</div>
        <div class="content">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      user: { count: {} },
      items: [
        {
          id: 0,
          username: "嘁嘁嘁",
          time: "201905",
          content: "收藏了，欢迎"
        },
        {
          id: 1,
          username: "嘁嘁嘁2",
          time: "201905",
          content: "收藏了，欢迎2"
        },
        {
          id: 2,
          username: "嘁嘁嘁3",
          time: "201905",
          content: "收藏了，欢迎3"
        }
      ]
    };
  },
  props: {
    uid: {
      type: String,
      default: ""
    },
    aid: {
      type: String,
      default: ""
    },
    comment_lists: {
      type: Array,
      default() {
        return [
          {
            id: 0,
            username: "",
            time: "",
            content: ""
          }
        ];
      }
    }
  },
  mounted() {},
  watch: {
    uid(newValue, oldValue) {
      if (newValue != "") {
        this.$axios.get("/user/" + this.uid).then(res => {
          console.log(res);
          this.user = res.data.data;
        });
      }
    }
  },
  methods: {
    addComment() {
      let body = {
        // token: token,
        userid: this.$store.state.userid,
        username: this.$store.state.username,
        content: this.textarea,
        publicdate: new Date(),
        _id: this.aid
      };
      // body = JSON.stringify(body);
      this.$axios.put("/api/article/comment", body).then(
        res => {
          console.log(res);
          if (res.data && res.data.status == 1) {
            this.$message({
              showClose: true,
              duration: 1000,
              type: "success",
              message: "评论发布成功"
            });
            this.comment_lists.push(body);
          } else {
            this.$message({
              showClose: true,
              duration: 1000,
              type: "error",
              message: "评论发布失败"
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
  }
};
</script>

<style lang="scss" scoped>
.myfooter {
  text-align: center;
  .jubao {
    position: relative;
    height: 20px;
    .left {
      position: absolute;
      left: 4px;
      //   float: left;
    }
    .right {
      position: absolute;
      right: 4px;
      //   float: right;
    }
  }
  .writer {
    text-align: left;
    padding: 20px;
    font-size: 14px;
    color: rgb(77, 77, 77);
    border: 1px solid rgb(190, 190, 190);
    background-color: rgb(240, 240, 240);
    height: 120px;
    .writer-name {
      font-size: 22px;
    }
    .pic {
      float: left;
      margin-right: 8px;
      img {
        width: 50px;
        border-radius: 50px;
      }
    }
    .guanzhu {
      float: right;
    }
    .info {
      &::before {
        clear: both;
      }
      margin: 10px;
      //   margin-top: 10px;
      padding-top: 16px;
      border-top: solid 1px rgb(172, 133, 76);
    }
  }
  .buttons {
    text-align: left;
    margin: 20px 5px;
    div {
      display: inline-block;
      text-align: left;
    }
    .right {
      width: 48%;
      text-align: right;
      padding-right: 2%;
    }
    .left {
      width: 48%;
      padding-left: 2%;
      .xihuan_button {
        cursor: pointer;
        padding: 12px 20px;
        margin: 5px;
        font-size: 20px;
        border: 1px solid rgb(230, 107, 127);
        border-radius: 40px;
        display: inline-block;
        &:hover {
          background-color: rgb(243, 187, 201);
        }
      }
    }
  }
  .pinglun {
    text-align: left;
    padding: 0 2%;
    .pic {
      // float: left;
      width: 10%;
      margin-right: 2%;
    }
    .textbox {
      width: 84%;
      textarea.el-textarea__inner {
        // height: 150px !important;
      }
    }
  }
  .pinglun_page {
    text-align: left;
    margin: 10px;
    h3 {
      padding: 5px 0;
      // border-bottom: 1px solid rgb(75, 75, 75);
    }
    .pinglun_single {
      padding: 10px;
      border-top: 1px solid grey;
      .name {
        display: inline;
        // font-size: 18px;
        margin-left: 40px;
        margin-right: 20px;
      }
      .time {
        display: inline;
        font-size: 14px;
        color: gray;
      }
      .content {
        margin-top: 20px;
      }
    }
  }
}
</style>
