<template>
  <div>
    <simple v-for="x in lists" :mydata="x" :key="x.id" />
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
      lists: [
        // {
        //   title: "标题1",
        //   id: "224",
        //   content:
        //     "背景 天天5岁以后，明显开始不好说服和指挥了。之前随意指挥一下“该做Book Room了”（英语app阅读任务），他就颠颠的配合你做，可现在会找...",
        //   count_some: "0",
        //   count_view: "0",
        //   count_comit: "0",
        //   count_like: "0",
        //   time: "04.25 01:24",
        //   img_url: "/img/1.jpg"
        // },
        // {
        //   title: "标题2",
        //   id: "223",
        //   content:
        //     "背景 天天5岁以后，明显开始不好说服和指挥了。之前随意指挥一下“该做Book Room了”（英语app阅读任务），他就颠颠的配合你做，可现在会找...",
        //   count_some: "0",
        //   count_view: "0",
        //   count_comit: "0",
        //   count_like: "0",
        //   time: "04.25 01:24",
        //   img_url: "/img/1.jpg"
        // },
        // {
        //   title: "标题3",
        //   id: "225",
        //   content:
        //     "背景 天天5岁以后，明显开始不好说服和指挥了。之前随意指挥一下“该做Book Room了”（英语app阅读任务），他就颠颠的配合你做，可现在会找...",
        //   count_some: "0",
        //   count_view: "0",
        //   count_comit: "0",
        //   count_like: "0",
        //   time: "04.25 01:24",
        //   img_url: "/img/1.jpg"
        // }
      ]
    };
  },
  mounted() {
    this.getAllList();
  },
  methods: {
    getAllList() {
      this.$axios.get("http://localhost:3000/article/").then(res => {
        console.log(res);
        // this.lists = res.data;
        this.lists = [];
        this.lists.push(...res.data.data);
      });
      // this.$axios.get("http://localhost:3000/api/").then(res => {
      //   console.log(res);
      //   // this.lists = res.data;
      // });
    }
  }
};
</script>

<style lang="scss" scoped></style>
