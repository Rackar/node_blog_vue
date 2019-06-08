<template>
  <div class="mylists">
    <div class="titleout">
      创建文集
      <el-input
        v-model="listname"
        placeholder="回车即可添加"
        class="title"
        @keyup.native.13="saveList"
      ></el-input>
      <el-button @click="saveList">添加</el-button>
    </div>

    <div v-for="item in lists" :key="item._id" class="list">
      <h3>
        文集名称 {{ item.name }}
        <el-button @click="delList(item)" size="medium" round
          >删除文集</el-button
        >
        <!-- <el-button @click="delList(item)">删除文集</el-button> -->
      </h3>
      <div v-for="article in item.articles" :key="article.id">
        <div class="article">
          <span @click="$router.push('/article/' + article.id)"
            >文章标题 {{ article.title }}</span
          >
          <el-button
            @click="delArticleFromList(article, item._id)"
            size="small"
            round
            >移除文章</el-button
          >
          <!-- <el-button @click="delArticleFromList(article, item._id)"
            >移除文章</el-button
          >-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debuglog } from "util";
export default {
  data() {
    return {
      lists: [],
      listname: ""
    };
  },
  mounted() {
    this.getAllLists();
  },
  methods: {
    getAllLists() {
      this.$axios.get("/api/lists/" + this.$store.state.userid).then(res => {
        console.log(res);
        if (res.data.status === 1 && res.data.msg == "拉取文集成功")
          this.lists = res.data.data;
      });
    },
    saveList() {
      var body = {
        userid: this.$store.state.userid,
        name: this.listname,
        username: this.$store.state.username
      };

      this.$axios.post("/api/lists", body).then(
        res => {
          console.log(res);
          if (res.data && res.data.status == 1) {
            this.$message({
              showClose: true,
              duration: 1000,
              type: "success",
              message: "文集新增成功"
            });
            this.getAllLists();
            this.listname = "";
          } else {
            this.$message({
              showClose: true,
              duration: 1000,
              type: "error",
              message: "文集新增失败"
            });
          }
        },
        err => {
          this.$message({
            showClose: true,
            duration: 1000,
            type: "error",
            message: "文集新增失败"
          });
        }
      );
    },
    delList(list) {
      this.$axios.delete("/api/lists/" + list._id).then(res => {
        console.log(res);
        if (res.data.status === 1 && res.data.msg == "文集删除成功")
          this.lists = this.lists.filter(l => l._id != list._id);
      });
    },
    delArticleFromList(article, listid) {
      var body = {
        _id: listid,
        aid: article.id,
        uid: this.$store.state.userid
      };

      this.$axios.put("/api/lists/article", body).then(res => {
        console.log(res);
        if (res.data.status === 1 && res.data.msg == "文集移除文章成功")
          // debugger;
          var changelist = this.lists.find(list => list._id == listid);
        var newlist = changelist.articles.filter(arti => arti.id != article.id);
        changelist.articles = newlist;

        // this.lists = this.lists.splice(this.lists.indexOf(list), 1);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mylists {
  .titleout {
    // margin-top: 40px;
    .title {
      width: 45%;
    }
  }

  .list {
    margin: 40px;
    font-size: 20px;
    border: 1px gray solid;
    .article {
      cursor: pointer;
      line-height: 45px;
    }
  }
}
</style>
