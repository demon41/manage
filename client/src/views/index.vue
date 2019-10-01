
<template>
  <el-container class="index">
    <headNav></headNav>

    <div class="link">
      <Navmenu></Navmenu>
      <router-view></router-view>
    </div>


  </el-container>
</template>


<script>
  import headNav from "../components/headNav";
  import Navmenu from "../components/Navmenu";
    export default {
      components:{
          headNav,
          Navmenu
      }
    }


</script>


<style lang="scss" scoped>
  .index{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 3000;
  }
  .link{
    width: 100%;
    display: flex;
    height: 100%;
  }
</style>

