<template>
  <div>
    <!-- <h2 style="text-align:center">登录</h2> -->
    <el-row :gutter="10">
      <el-col
        :xs="{ span: 18, offset: 3 }"
        :sm="{ span: 12, offset: 6 }"
        :md="{ span: 10, offset: 7 }"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          status-icon
          v-loading="loading"
        >
          <el-form-item label="手机号" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>

          <!-- <el-form-item>
      
        <el-button @click="$router.replace('/login')">注册</el-button>
          </el-form-item>-->
        </el-form>
        <el-button type="primary" round @click="onSubmit('form')"
          >登录</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "sighup",
  data() {
    return {
      loading: false,
      form: {
        user_name: "",
        real_name: "",
        // tel: "",
        birthday: "",
        sex: "",
        password: "",
        password2: ""
      },
      rules: {
        tel: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      console.log("submit!");

      // this.$emit("refreshID", this.form.user_name);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // fetch("http://localhost:3012/users/login", {
          //   method: "POST",
          //   mode: "cors",
          //   body: JSON.stringify(this.form),
          //   headers: {
          //     "content-type": "application/json"
          //   }
          // })
          this.loading = true;
          this.$axios
            .post("/user/login", {
              mobile: this.form.tel,
              pwd: this.form.password
            })
            .then(res => {
              // console.log(res);
              // debugger;
              if (res.data.status == 1) {
                this.loading = false;
                //   this.totalstars -= stars;
                this.$emit("refreshID", this.form.user_name);
                console.log(res.data);

                this.$message({
                  showClose: true,
                  duration: 1500,
                  type: "success",
                  message: res.data && res.data.msg
                });
                var token = "Bearer " + res.data.data.token;

                // this.$store.state.token = token;
                this.$store.commit("login_saveToken", token);

                console.log(this.$route.query);
                let previousUrl = "/";
                if (this.$route.query && this.$route.query.redirect)
                  previousUrl = this.$route.query.redirect;
                this.$router.push(previousUrl);
              } else {
                this.loading = false;
                this.$message({
                  showClose: true,
                  duration: 1500,
                  type: "error",
                  message: res.data && res.data.msg
                });
              }
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
              this.$message({
                showClose: true,
                duration: 1500,
                type: "error",
                message: err.response.data.msg
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
