<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">后台管理系统</span>
        <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="80px" class="loginForm">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginBtn('loginForm')" class="login-btn">登录</el-button>
          </el-form-item>
          <el-form-item>

            <div class="register-data">还没有账号？现在<a @click="registerBtn" class="register">注册</a></div>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>

</template>


<script>
  import jwtDecode from "jwt-decode"
    export default {
        data(){
            return{
                loginUser:{
                    name:"",
                    email:"",
                    password:"",
                },
                rules: {
                    email: [
                        {required:true,message:"邮箱不能为空",trigger: 'blur'},
                        { type:"email", message:"邮箱格式不正确",trigger: 'blur'}
                    ],
                    password: [
                        {required:true,message:"密码不能为空",trigger: 'blur'},
                        {min:6,max:30,message:"密码长度在6到30之间",trigger: 'blur'}
                    ],
                }
            }
        },
        methods:{
            loginBtn(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post("/api/users/login",this.loginUser)
                            .then(res => {
                                //登录成功
                                const {token} = res.data;
                                localStorage.setItem("eleToken",token);
                                const decoded = jwtDecode(token);
                                console.log(decoded)
                                this.$store.dispatch("setAu",!this.isEmpty(decoded));
                                this.$store.dispatch("setUser",decoded);
                                this.$router.push("/index")
                            })

                    }
                });
            },
            registerBtn(){
                this.$router.push("/register")
                },
            isEmpty(value){
                return(
                    value === undefined || value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0)||
                    (typeof value === "string" && value.trim().length === 0)
                )
            }
        },

    }



</script>


<style lang="scss" scoped>
  .login{
    background-color: skyblue;
    position:absolute;
    width:100%;
    height:100%;
    .form_container{
      margin: 200px auto;
      width: 550px;
      background-color: white;
      .manage_tip{
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        width: 400px;
        .title{
          font-size:25px;
          font-weight:bold;
          margin: 20px 31.2%;
        }
        .loginForm{
          padding-right: 50px;
          .login-btn{
            width: 100%;
          }
        }
      }
    }
  }
  .register-data{
    text-align: right;
    .register{
      color: red;
      font-weight: bold;
      font-size: 17px;
    }
    .register:hover{
      color: skyblue;
      cursor:pointer
    }
  }
</style>
