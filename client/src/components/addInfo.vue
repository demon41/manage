<template>
    <div class="Dialog">
      <el-dialog :title="this.dialog.title"
                 :visible.sync="dialog.show"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :modal-append-to-body="false">
        <el-form :model="form" :rules="rules" ref="addForm">
          <el-form-item label="收支类型" :label-width="formLabelWidth" prop="region">
            <el-select v-model="form.type" placeholder="收支类型">
              <el-option v-for="(item,index) in region" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收支描述" :label-width="formLabelWidth" prop="describe">
            <el-input v-model="form.describe" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="收入" :label-width="formLabelWidth" prop="income">
            <el-input v-model="form.income" autocomplete="off" type="number"></el-input>
          </el-form-item>
          <el-form-item label="支出" :label-width="formLabelWidth" prop="expend">
            <el-input v-model="form.expend" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="账户现金" :label-width="formLabelWidth" prop="cash">
            <el-input v-model="form.cash" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.show = false">取 消</el-button>
          <el-button type="primary" @click="addInfo('addForm')">提 交</el-button>
        </div>
      </el-dialog>
    </div>

</template>


<script>
export default {
  data(){
      return {
          region: ['提现','提现手续费','充值','优惠券','充值礼券','转账',],
          formLabelWidth: '120px',
          rules:{
              describe:[{required:true,message:"不能为空",trigger: 'blur'}],
              income:[{required:true,message:"不能为空",trigger: 'blur'}],
              expend:[{required:true,message:"不能为空",trigger: 'blur'}],
              cash:[{required:true,message:"不能为空",trigger: 'blur'}],
          }
      };
  },
  props:{
      dialog:Object,
      form:Object
  },
  methods:{
      addInfo(addForm){
          this.$refs[addForm].validate((valid) => {
              if (valid) {
                  console.log(this.dialog.option)
                  const url = this.dialog.option === "edit"?'edit/'+this.dialog.id:'add'
                  console.log(url)
                  console.log(this.form)
                  this.axios.post('api/profiles/'+url,this.form)
                            .then(res => {
                               this.$message({
                                   message:'操作成功',
                                   type:'success'
                               });
                               this.dialog.show = false
                               this.$emit("updateInfo")
                           })

              }
          })
      }
  }
}


</script>


<style lang="scss" scoped>

</style>
