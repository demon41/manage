<template>
    <div class="menu_page">
      <el-menu
        default-active="2"
        class="el-menu el-menu-vertical-demo"
        text-color="#fff"
        background-color="#324057"
        active-text-color="#409eff">
        <el-menu-item index="1" @click="nextToHome">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>资金管理</span>
          </template>
            <el-menu-item @click="nextToMoneyUse">资金流水</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>信息管理</span>
          </template>
          <el-menu-item @click="nextToInfo">个人信息</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

</template>


<script>
    export default {
        methods: {
            nextToHome(){
                this.$router.push("/home")
            },
            nextToInfo(){
                this.$router.push("/info")
            },
            nextToMoneyUse(){
                this.$router.push("/moneyUse")
            }
        }
    }


</script>


<style lang="scss">
  .menu_page{
    box-sizing: border-box;
    /*background-color: #324057;*/
  }
  .el-menu {
    height: 100%;
    width: 260px;
    border: none !important;
  }




</style>
