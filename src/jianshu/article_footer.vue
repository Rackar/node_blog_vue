<template>
  <div class="myfooter">
    <!-- <el-button type="danger" round>赞赏支持</el-button> -->

    <el-select v-model="listSelected" placeholder="请选择">
      <el-option
        v-for="item in lists"
        :key="item.id"
        :label="item.name"
        :value="item._id"
      ></el-option>
    </el-select>
    <el-button @click="addToList">加入文集</el-button>
    <div class="jubao">
      <!-- <span class="right">举报</span>
      <span class="left">文集</span>-->
    </div>
    <div class="writer">
      <a href class="pic">
        <!-- <img src="/img/1.jpg" alt width="80px" /> -->
        <img :src="newsrc" />
      </a>
      <el-button
        type="success"
        round
        class="guanzhu"
        @click="followUser"
        :class="{ isFollowed: isFollowed }"
        >{{ isFollowed ? "取关" : "关注" }}</el-button
      >
      <div class="writer-name">作者名字:{{ user.username }}</div>
      <div>
        <!-- 写了 {{ user.count.words }} 字， -->
        被 {{ user.followed.length }} 人关注
        <!-- ，获得了{{ user.count.liked }} 个喜欢 -->
      </div>
      <div class="info">
        <!-- 微信公众号【程序员江湖】 作者黄小斜，斜杠青年，某985硕士，阿里 Java
        研发工程师，于 2018 年秋招拿到-->
        {{ user.info }}
      </div>
    </div>
    <div class="buttons">
      <div class="left">
        <transition>
          <div
            class="xihuan_button"
            @click="likeArticle"
            :class="{ iflike: iflike() }"
          >
            {{ iflike() ? "取消" : "点赞" }} ❤ |
            {{ liked_lists.length }}
          </div>
        </transition>
      </div>

      <div class="right">
        <el-button icon="el-icon-search" circle></el-button>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button icon="el-icon-search" circle></el-button>
      </div>
    </div>
    <div></div>

    <div class="pinglun">
      <span class="pic">
        <img :src="myavatar" />
      </span>
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
        <el-row :gutter="10">
          <el-col :lg="{ span: 2 }" :sm="{ span: 2 }">
            <img :src="item.avatar" />
          </el-col>
          <el-col :lg="{ span: 4 }" :sm="{ span: 4 }">
            <div class="username">{{ item.username }}</div>
            <div class="time">{{ showDate(item.publicdate) }}</div>
          </el-col>
          <el-col :lg="{ span: 14 }" :sm="{ span: 16 }">
            <div>{{ item.content }}</div>
          </el-col>
        </el-row>

        <!-- <div class="left">
          <div>
            <span class="name">
              <span class="pic">
                <img :src="item.avatar" />
              </span>
              {{ item.username }}
            </span>
          </div>
          <div>
            <span class="time">{{ showDate(item.publicdate) }}</span>
          </div>
        </div>-->

        <!-- <span class="content">{{ item.content }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import utility from "@/utility";
export default {
  data() {
    return {
      newsrc: "",
      myavatar: "",
      listSelected: "",
      lists: [],
      textarea: "",
      user: { count: {}, followed: [] },
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
      ],
      mylike: true,
      isFollowed: false
    };
  },
  props: {
    uid: {
      type: String,
      default: ""
    },
    article: {
      type: Object,
      default() {
        return {
          aid: "",
          title: "",
          userid: "",
          username: ""
        };
      }
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
            content: "",
            userid: "",
            avatar: ""
          }
        ];
      }
    },
    liked_lists: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    utility
      .getAvatarByUid(this.$store.state.userid)
      .then(image => (this.myavatar = image));
  },
  watch: {
    comment_lists(newValue, oldValue) {
      newValue.forEach(element => {
        element.userid;
        utility.getAvatarByUid(element.userid).then(image => {
          // element.avatar = image;
          this.$set(element, "avatar", image);
        });
      });
    },
    uid(newValue, oldValue) {
      if (newValue != "") {
        utility
          .getUser(this.uid)
          .then(user => {
            this.user = user;
            this.isFollowed = this.iffollowing();
            // getAvatar(user.avatar);
            utility.getAvatar(user.avatar).then(image => {
              this.newsrc = image;
            });
          })

          .catch(() => {
            console.log("无结果");
          });
        utility
          .getListsByUid(this.$store.state.userid)
          .then(lists => (this.lists = lists));
      }
    }
  },
  methods: {
    showDate(publicdate) {
      return utility.dateToString(publicdate);
    },

    addToList() {
      console.log(this.listSelected);
      //判断选中的id和已有id中的article重不重
      // debugger;
      if (!this.listSelected) {
        this.$mymess.error("请先选择文集");

        return;
      }
      var listSel = this.lists.find(list => list._id == this.listSelected);
      var contains = listSel.articles.find(arti => arti.id == this.aid);
      if (contains) {
        this.$message({
          showClose: true,
          duration: 1000,
          type: "error",
          message: "文集中已存在本文章"
        });
      } else {
        var body = {
          listid: this.listSelected,
          userid: this.$store.state.userid,
          article: {
            aid: this.aid,
            title: this.article.title,
            userid: this.article.userid,
            username: this.article.username
          }
        };
        this.$axios.post("/api/lists/article", body).then(
          res => {
            console.log(res);
            if (res.data && res.data.status == 1) {
              this.$message({
                showClose: true,
                duration: 1000,
                type: "success",
                message: "添加成功"
              });
              var newarti = {
                id: this.aid,
                title: this.article.title,
                userid: this.article.userid,
                username: this.article.username
              };

              listSel.articles.push(newarti);
            } else {
              this.$message({
                showClose: true,
                duration: 1000,
                type: "error",
                message: "添加失败"
              });
            }
          },
          err => {
            this.$message({
              showClose: true,
              duration: 1000,
              type: "error",
              message: "添加失败"
            });
          }
        );
      }
      //
    },
    likeArticle() {
      let body = {
        // token: token,
        userid: this.$store.state.userid,
        username: this.$store.state.username,
        // content: this.textarea,
        // publicdate: new Date(),
        _id: this.aid
      };
      // body = JSON.stringify(body);
      this.$axios.put("/api/article/like", body).then(
        res => {
          console.log(res);
          if (res.data && res.data.status == 1) {
            this.$mymess.success(res.data.msg);
            if (res.data.msg == "取消点赞成功") {
              var i = this.liked_lists.findIndex(
                value => value.userid == this.$store.state.userid
              );
              this.liked_lists = this.liked_lists.splice(i, 1);
            } else if (res.data.msg == "点赞成功") {
              this.liked_lists.push(body);
            }
          } else {
            this.$mymess.error("点赞失败");
          }
        },
        err => {
          this.$mymess.error("点赞失败");
        }
      );
    },
    followUser() {
      let body = {
        // token: token,
        userid: this.$store.state.userid,
        username: this.$store.state.username,
        // content: this.textarea,
        // publicdate: new Date(),
        _id: this.uid,
        aimusername: this.user.username
      };
      // body = JSON.stringify(body);
      this.$axios.put("/api/user/follow", body).then(
        res => {
          console.log(res);
          if (res.data && res.data.status == 1) {
            this.$mymess.success(res.data.msg);
            if (res.data.msg == "取关成功") {
              this.isFollowed = false;

              var i = this.user.followed.findIndex(
                value => value.userid == this.$store.state.userid
              );

              if (i == 0 && this.user.followed.length == 1) {
                this.user.followed = [];
              } else {
                this.user.followed = this.user.followed.splice(i, 1);
              }
            } else if (res.data.msg == "关注成功") {
              this.isFollowed = true;
              this.user.followed.push(body);
            }
          } else {
            this.$mymess.error("关注失败");
          }
        },
        err => {
          this.$message({
            showClose: true,
            duration: 1000,
            type: "error",
            message: "关注失败"
          });
        }
      );
    },
    iflike() {
      var i = this.liked_lists.findIndex(
        value => value.userid == this.$store.state.userid
      );
      // console.log(i);
      return !(i == -1);
    },
    iffollowing() {
      var i = this.user.followed.findIndex(
        value => value.userid == this.$store.state.userid
      );
      // console.log(i);
      return !(i == -1);
    },
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
  },
  computed: {
    like_count() {
      return this.data;
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
    margin: 30px;
    border-radius: 20px;
    font-size: 14px;
    color: rgb(77, 77, 77);
    border: 1px solid rgb(190, 190, 190);
    background-color: #f8f8f8;
    height: 120px;
    .writer-name {
      font-size: 22px;
    }
    .pic {
      float: left;
      margin-right: 8px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
      }
    }
    .guanzhu {
      float: right;
      // transition: background-color 1.9s linear 0;
      // transition: font-size 5s ease 0;
      font-size: 16px;
      &.isFollowed {
        color: gery;
        background-color: rgb(163, 200, 182);
      }
      &.hover {
        font-size: 30px;
      }
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
        color: #ea6f5a;
        border-radius: 40px;
        display: inline-block;

        // transition: background-color 3s ease 0;
        // font-size: 18px;
        // &.isFollowed {
        //   color: gery;
        //   background-color: rgb(27, 236, 132);
        // }

        &:hover {
          background-color: rgb(255, 229, 236);
          // font-size: 30px;
        }
        &.iflike {
          color: rgb(255, 255, 255);
          background-color: #ea6f5a;
        }
      }
    }
  }
  .pinglun {
    text-align: left;
    padding: 0 2%;
    .pic {
      // // float: left;
      // width: 10%;
      margin-right: 4%;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
      }
    }
    .textbox {
      width: 84%;
      background-color: #f8f8f8;
      textarea.el-textarea__inner {
        background-color: #f8f8f8 !important;
        // height: 150px !important;
      }
    }
  }
  .pinglun_page {
    text-align: left;
    margin: 15px 5px;
    h3 {
      padding: 10px 0;
      // border-bottom: 1px solid rgb(75, 75, 75);
    }
    .pinglun_single {
      padding: 15px 5px;
      border-top: 1px solid rgb(214, 214, 214);
      margin: 0 10px;
      line-height: 24px;
      font-size: 16px;
      // position: relative;
      .username {
        font-size: 20px;
        line-height: 30px;
      }
      .time {
        // display: inline;
        font-size: 14px;
        color: gray;
        // margin-right: 40px;
      }

      img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
      }
    }
  }
}
</style>
