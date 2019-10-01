<template>
    <div class="register">
      <section class="form_container">
        <div class="manage_tip">
          <span class="title">后台管理系统</span>
          <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="registerUser.name" autocomplete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="registerUser.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="registerUser.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input type="password" v-model="registerUser.password2" autocomplete="off" placeholder="请确认密码"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="identity">
              <el-select v-model="registerUser.identity" placeholder="请选择身份" style="width: 100%">
                <el-option label="员工" value="employee"></el-option>
                <el-option label="管理员" value="manager"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resgiterBtn('registerForm')" class="register-btn">注册</el-button>
            </el-form-item>
          </el-form>
        </div>

      </section>
    </div>

</template>


<script>
    export default {
        data(){
            let checkPassword2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                registerUser:{
                    name:"",
                    email:"",
                    password:"",
                    password2:"",
                    identity:"employee",
                },
                rules: {
                    name: [
                        {required:true,message:"用户名不能为空",trigger: 'blur'},
                        {min:2,max:20,message:"用户名长度为2到20之间",trigger: 'blur'}
                    ],
                    email: [
                        {required:true,message:"邮箱不能为空",trigger: 'blur'},
                        { type:"email", message:"邮箱格式不正确",trigger: 'blur'}
                    ],
                    password: [
                        {required:true,message:"密码不能为空",trigger: 'blur'},
                        {min:6,max:30,message:"密码长度在6到30之间",trigger: 'blur'}
                    ],
                    password2: [
                        { required:true,validator: checkPassword2, trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            resgiterBtn(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post("/api/users/register",this.registerUser)
                            .then(res => {
                                //注册成功
                                this.$message({
                                  message:'账号注册成功',
                                    type:"success"
                                });
                                this.$router.push("/login")
                            })

                    }

                });
            },
        }

    }



</script>


<style lang="scss" scoped>
  .register{
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
        .registerForm{
          padding-right: 50px;
          .register-btn{
            width: 100%;
          }
        }
      }
    }
  }
</style>
