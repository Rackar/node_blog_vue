<template>
  <div class="list">
    <el-pagination
      class="page"
      :hide-on-single-page="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="lists.length"
    ></el-pagination>
    <simple class="simple" v-for="x in pagedLists" :mydata="x" :key="x.id"/>
  </div>
</template>

<script>
import simple from "./simple_view";
export default {
  components: {
    simple
  },
  data() {
    return {
      lists: [],
      currentPage: 1,
      pagesize: 10
    };
  },
  mounted() {
    this.getAllList();
  },
  methods: {
    getAllList() {
      this.$axios.get("/article/").then(res => {
        console.log(res);
        // this.lists = res.data;
        this.lists = [];
        this.lists.push(...res.data.data);
      });
      // this.$axios.get("http://localhost:3000/api/").then(res => {
      //   console.log(res);
      //   // this.lists = res.data;
      // });
    },

    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    }
  },
  computed: {
    pagedLists: {
      get: function() {
        var ep = this.lists.slice(
          (this.currentPage - 1) * this.pagesize,
          this.currentPage * this.pagesize
        );
        // console.log("分页数据变化");
        return ep;
      },
      // setter
      set: function(newValue) {
        this.lists = newValue;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  .page {
    // margin-top: 30px;
  }
  .simple {
    margin-left: 10%;
    width: 80%;
    text-align: center;
  }
}
</style>
