import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
      // name: "login",
      // component: () => import("./jianshu/login.vue")
    },

    {
      name: "edit",
      path: "/edit",
      component: () =>
        import(/* webpackChunkName: "editer" */ "./jianshu/editer2.vue")
    },
    {
      name: "login",
      path: "/login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./jianshu/login.vue")
    },
    {
      name: "signup",
      path: "/signup",
      component: () =>
        import(/* webpackChunkName: "signup" */ "./jianshu/signup.vue")
    },
    {
      name: "list",
      path: "/list",
      component: () =>
        import(/* webpackChunkName: "list" */ "./jianshu/list.vue")
    },
    {
      name: "article",
      path: "/article/:id",
      component: () =>
        import(/* webpackChunkName: "article" */ "./jianshu/article.vue")
    },
    {
      name: "myfollowing",
      path: "/myfollowing",
      component: () =>
        import(/* webpackChunkName: "myfollowing" */ "./jianshu/myfollowing.vue")
    }
  ]
});
