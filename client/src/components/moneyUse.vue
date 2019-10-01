<template>
    <div class="money-icon">
      <div class="title-content">
        <div class="time-data" :model="search">
          <span class="demonstration">起始时间：</span>
          <el-date-picker
            v-model="search.startTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
          ——
          <span class="demonstration">结束时间：</span>
          <el-date-picker
            v-model="search.endTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
          <el-button type="primary" style="margin-left: 20px" size="small" @click="filterDate">筛选</el-button>
          <el-button type="primary" style="margin-left: 20px" size="small" @click="removeDate">复原</el-button>
        </div>

        <el-form :inline="true" ref="add_data">
          <el-form-item class="btnRight">
            <el-button type="primary" size="small" icon="view" @click="handleAdd" :disabled="user.identity == 'employee'">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table_container">
<!--      <el-button @click="resetDateFilter">清除日期过滤器</el-button>-->
<!--      <el-button @click="clearFilter">清除所有过滤器</el-button>-->
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="450px"
          border
          stripe>
          <el-table-column
            prop="index"
            type="index"
            label="序号"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="创建时间"
            width="190"
            align="center"
            >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date | dateString}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="收支类型"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="describe"
            label="收支描述"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="income"
            label="收入"
            width="180"
            align="center">
            <template slot-scope="scope">
              <span style="color:#00d053">{{ scope.row.income }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="expend"
            label="支出"
            width="180"
            align="center">
            <template slot-scope="scope">
              <span style="color:#f56767">{{ scope.row.expend }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="cash"
            label="账户资金"
            width="180"
            align="center">
            <template slot-scope="scope">
              <span style="color:#4db3ff">{{ scope.row.cash }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="176"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180px">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="small"
                icon="edit"
                :disabled="user.identity == 'employee'"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                icon="delete"
                :disabled="user.identity == 'employee'"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          :layout="pagination.layout"
          :total="pagination.total">
        </el-pagination>
      </div>

      <Dialog :dialog="dialog" @updateInfo = "updateInfo" :form="form"></Dialog>
    </div>

</template>


<script>
    import Dialog from "./addInfo.vue"
    export default {
        data() {
            return {
                search:{
                    startTime:"",
                    endTIme:""
                },
                filterTableDate:[],
                allTableData:[],
                pagination:{
                    currentPage:1,
                    pageSizes:[5, 10, 20, 50],
                    pageSize:1,
                    layout : "total, sizes, prev, pager, next, jumper",
                    total:10
                },
                tableData: [],
                dialog:{
                    show:false,
                    title:"",
                    option:"edit",
                    id:0
                },
                form: {
                    type:"提现",
                    describe: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id:'',
                },
            }
        },
        computed:{
            user(){
                return this.$store.getters.user
            }
        },
        methods: {
            handleEdit(index, row) {
                this.form = {
                    type:row.type,
                    describe: row.describe,
                    income: row.income,
                    expend: row.expend,
                    cash: row.cash,
                    remark: row.remark,
                    id:row.id,
                }
              this.dialog.title = "修改资金信息"
              this.dialog.show = true
              this.dialog.option = "edit"
              this.dialog.id = row._id
            },
            handleDelete(index, row) {
                this.axios.delete('/api/profiles/delete/' + row._id)
                    .then(res => {
                        this.getInfo()
                        this.$message("删除成功")
                    })
            },
            getInfo() {
                // postId = this.$store.getters.user.id
                this.axios.get('/api/profiles')
                    .then(res => {
                        this.allTableData = res.data
                        this.filterTableDate = res.data
                        this.changePage()
                    })
            },
            updateInfo(){
                this.getInfo()
            },
            handleAdd() {
                this.dialog.title = "添加资金信息"
                this.dialog.show = true
                this.dialog.option = ""
                this.form = {
                      type:"提现",
                      describe: '',
                      income: '',
                      expend: '',
                      cash: '',
                      remark: '',
                      id:'',
                }
            },
            handleCurrentChange(page){
                let index = this.pagination.pageSize * (page-1)
                let nums  = this.pagination.pageSize * page
                let table = []
                for(let i=index;i<nums;i++){
                    if(this.allTableData[i]){
                        table.push(this.allTableData[i])
                    }
                }
                this.tableData = table
            },
            handleSizeChange(pageSize){
                this.pagination.currentPage = 1
                this.pagination.pageSize = pageSize
                this.tableData = this.allTableData.filter((item,index) => {
                    return index < pageSize;
                })
            },
            changePage(){
                this.pagination.total = this.allTableData.length
                this.pagination.pageSize = 5
                this.pagination.currentPage = 1
                this.tableData = this.allTableData.filter((item,index) => {
                    return index < this.pagination.pageSize;
                })

            },
            filterDate(){
                if (!this.search.startTime || !this.search.endTime){
                    this.$message({
                        type:"warning",
                        message:"请选择时间区域"
                    })
                }
                let sTime = this.search.startTime.getTime()
                let eTime = this.search.endTime.getTime()
                this.allTableData = this.filterTableDate.filter(item => {
                    let dateTime = new Date(item.date).getTime()
                    return dateTime>=sTime && dateTime<=eTime
                })
                this.changePage();
            },
            removeDate(){
                this.getInfo()
            }
        },
        created() {
            this.getInfo()
        },
        components:{
            Dialog
        },

    }


</script>


<style lang="scss" scoped>
  .money-icon{
    width: calc(100% - 260px);
    height:100%;
    box-sizing: border-box;
    padding: 30px;
  }
  .title-content{
    display: flex;
    justify-content: space-between;
  }
  .btnRight{
    padding-right: 10px;
  }
  .block{
    margin-top: 18px;
    float: right;
    padding-right: 10px;
  }
  .demonstration{
    font-size: 15px;
  }

</style>
