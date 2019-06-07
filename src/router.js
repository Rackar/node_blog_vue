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
        import(/* webpackChunkName: "editer" */ "./jianshu/editer.vue")
    },
    {
      name: "editArticle",
      path: "/edit/:id",
      component: () =>
        import(/* webpackChunkName: "editer" */ "./jianshu/editer.vue")
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
      name: "upload",
      path: "/upload",
      component: () =>
        import(/* webpackChunkName: "upload" */ "./components/upload.vue")
    },
    {
      name: "useredit",
      path: "/useredit",
      component: () =>
        import(/* webpackChunkName: "useredit" */ "./jianshu/userinfoEdit.vue")
    },
    {
      name: "mylists",
      path: "/mylists",
      component: () =>
        import(/* webpackChunkName: "mylists" */ "./jianshu/mylists.vue")
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
        import(/* webpackChunkName: "myfollowing" */
        "./jianshu/myfollowing.vue")
    }
  ]
});
