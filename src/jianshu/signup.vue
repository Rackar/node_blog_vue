<template>
  <div>
    <!-- <h2 style="text-align:center">注册账号</h2> -->
    <el-row :gutter="10">
      <el-col :xs="{span:18,offset:3}" :sm="{span:12,offset:6}" :md="{span:10,offset:7}">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" v-loading="loading">
          <el-form-item label="电话号码" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="form.password2"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="user_name">
            <el-input v-model="form.user_name"></el-input>
          </el-form-item>

          <el-button type="primary" round @click="onSubmit('form')">注册</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "sighup",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.password2 !== "") {
          this.$refs.form.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      form: {
        user_name: "",
        real_name: "",
        tel: "",
        birthday: "",
        sex: "",
        password: "",
        password2: ""
      },
      rules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        password2: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        tel: [{ required: true, message: "请输入电话号码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      console.log("submit!");
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          var form = {
            username: this.form.user_name,
            mobile: this.form.tel,
            pwd: this.form.password
          };
          this.$axios
            .post("/user/signup", form)
            .then(res => {
              console.log(res);
              if (res.statusText == "OK") {
                this.loading = false;
                //   this.totalstars -= stars;
                this.$emit("refreshID", this.form.user_name);
                this.$message({
                  showClose: true,
                  duration: 1500,
                  type: "success",
                  message: "注册成功"
                });
              } else {
                if (res.status == 403)
                  this.$message({
                    showClose: true,
                    duration: 1500,
                    type: "error",
                    message: "用户名已存在，请更换重试"
                  });
                else
                  this.$message({
                    showClose: true,
                    duration: 1500,
                    type: "error",
                    message: "注册失败，请报告管理员"
                  });
              }
            })
            .catch(err => {
              console.log(err);
              this.$message({
                showClose: true,
                duration: 1500,
                type: "error",
                message: err.response.data
              });
              this.loading = false;
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
