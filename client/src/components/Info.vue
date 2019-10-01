<template>
    <div class="infoshow">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="8">
            <div class="user">
              <img :src="user.avatar" class="avatar" alt="">
            </div>
          </el-col>
          <el-col :span="16">
            <div class="userInfo">
              <div class="user-item">
                <div class="name">
                  <span>{{user.name}}</span>
                </div>
                <div class="employee">
                  <span>{{user.identity =="employee"?"员工":"管理员" }}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
    </div>

</template>


<script>
    export default {
        computed:{
            user(){
                return this.$store.getters.user
            }
        }
    }


</script>


<style lang="scss" scoped>
  .infoshow{
    width: 100%;
    height: 100%;
    .row-bg{
      width: 100%;
      height: 100%;
    }
  }
  .user{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: white;
    .avatar{
      width: 200px;
      height: 200px;
      margin: 0 30px 100px 0 ;
    }

  }
  .userInfo{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: rgba(1,1,1,0.1);
    .user-item{
      width: 200px;
      height: 200px;
      margin: 0 0 100px 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 30px;
      font-weight: bold;
    }
  }
</style>

