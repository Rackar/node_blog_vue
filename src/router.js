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
      component: () => import("./jianshu/editer.vue")
    },
    {
      name: "login",
      path: "/login",
      component: () => import("./jianshu/login.vue")
    },
    {
      name: "signup",
      path: "/signup",
      component: () => import("./jianshu/signup.vue")
    },
    {
      name: "list",
      path: "/list",
      component: () => import("./jianshu/list.vue")
    },
    {
      name: "article",
      path: "/article/:id",
      component: () => import("./jianshu/article.vue")
    }
  ]
});
