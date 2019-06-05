<template>
  <div>
    创建文集
    <el-input v-model="listname" placeholder></el-input>
    <el-button @click="saveList">添加</el-button>
    <div v-for="item in lists" :key="item._id" class="list">
      <h3>
        文集名称 {{ item.name }}
        <el-button @click="delList(item)">删除文集</el-button>
      </h3>
      <div v-for="article in item.articles" :key="article.id">
        <div class="article">
          <span @click="$router.push('/article/' + article.id)">文章标题 {{ article.title }}</span>
          <el-button @click="delArticleFromList(article,item._id)">删除文集</el-button>
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
.list {
  margin: 40px;
  font-size: 20px;
  border: 1px gray solid;
  .article {
    cursor: pointer;
  }
}
</style>
