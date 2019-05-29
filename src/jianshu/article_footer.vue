<template>
  <div class="myfooter">
    <el-button type="danger" round>赞赏支持</el-button>
    <div class="jubao">
      <span class="right">举报</span>
      <span class="left">文集</span>
    </div>
    <div class="writer">
      <a href class="pic">
        <img src="/img/1.jpg" alt width="80px" />
      </a>
      <el-button type="success" round class="guanzhu">+关注</el-button>
      <div>作者名字:{{ user.username }}</div>
      <div>
        写了 {{ user.count.words }} 字，被
        {{ user.count.followed }} 人关注，获得了 {{ user.count.liked }} 个喜欢
      </div>
      <div class="info">
        微信公众号【程序员江湖】 作者黄小斜，斜杠青年，某985硕士，阿里 Java
        研发工程师，于 2018 年秋招拿到
      </div>
    </div>
    <div>
      <div class="xihuan_button">❤喜欢 | 2</div>
      <div>
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
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
        class="textbox"
      ></el-input>
    </div>
    <div>
      <el-button>发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      user: { count: {} }
    };
  },
  props: {
    uid: {
      type: String,
      default: ""
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
  }
};
</script>

<style lang="scss" scoped>
.myfooter {
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
    border: 1px solid rgb(190, 190, 190);
    background-color: rgb(240, 240, 240);
    height: 120px;
    .pic {
      float: left;

      img {
        border-radius: 40px;
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

      border-top: solid 1px rgb(172, 133, 76);
    }
  }
  .xihuan_button {
    cursor: pointer;
    padding: 18px;
    margin: 5px;
    font-size: 24px;
    border: 1px solid pink;
    border-radius: 40px;
    display: inline-block;
    &:hover {
      background-color: rgb(255, 252, 248);
    }
  }
  .pinglun {
    .pic {
      float: left;
    }
    .textbox {
      width: 400px;
    }
  }
}
</style>
