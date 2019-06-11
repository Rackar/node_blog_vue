<template>
  <div>
    <el-row :gutter="10">
      <el-col :sm="{ span: 24, offset: 0 }" :md="{ span: 12, offset: 6 }">
        <!-- <h4>个人信息修改</h4> -->
        <div>个人信息修改</div>
        <el-form
          :model="ruleForm"
          status-icon
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-form-item label="修改密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model.number="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="个人信息">
            <el-input type="textarea" v-model="ruleForm.info"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <div>头像修改</div>
      <!-- <el-button @click="initAvatar">测试函数</el-button> -->
      <el-col
        :xs="{ span: 12, offset: 0 }"
        :sm="{ span: 12, offset: 0 }"
        :md="{ span: 6, offset: 5 }"
      >
        <div>原头像</div>
        <img :src="newsrc">
      </el-col>
      <el-col
        :xs="{ span: 12, offset: 0 }"
        :sm="{ span: 12, offset: 0 }"
        :md="{ span: 6, offset: 2 }"
      >
        <div>上传头像</div>
        <myupload :uploadType="{ type: 'avatar' }"></myupload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import myupload from "../components/upload";
import utility from "@/utility";
export default {
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("年龄不能为空"));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("请输入数字值"));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error("必须年满18岁"));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    // var validatePass = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入密码"));
    //   } else {
    //     if (this.ruleForm.checkPass !== "") {
    //       this.$refs.ruleForm.validateField("checkPass");
    //     }
    //     callback();
    //   }
    // };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
        username: "",
        info: ""
      },
      rules: {
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      newsrc: ""
    };
  },
  mounted() {
    this.initAvatar();
  },
  methods: {
    initAvatar() {
      utility
        .getAvatarByUid(this.$store.state.userid)
        .then(image => {
          // console.log(res);
          this.newsrc = image;
        })
        .catch(() => {
          console.log("无结果");
        });
    },
    submitForm(formName) {
      var body = {
        _id: this.$store.state.userid,
        username: this.ruleForm.username,
        pwd: this.ruleForm.pass,
        info: this.ruleForm.info
      };
      this.$axios.put("/api/user", body).then(res => {
        console.log(res);
        this.initAvatar();
        if (res.data.status == 1) {
          this.$mymess.success(res.data.msg);
        } else {
          this.$mymess.error(res.data.msg);
        }
      });
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      //       alert("submit!");
      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {
    myupload
  }
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  // width: 50%;
  text-align: center;
  // margin-left: 25%;
}
</style>
