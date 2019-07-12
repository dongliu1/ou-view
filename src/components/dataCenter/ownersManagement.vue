<template>
    <div class="house-management">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/ownersManagement?navIndex=3' }">数据中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ownersManagement?navIndex=3' }" v-if="dtype!='list'" @click.native="dtype='list'">业主管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="dtype=='list'">业主管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="dtype=='add'">添加业主</el-breadcrumb-item>
        <el-breadcrumb-item v-if="dtype=='edit'">编辑业主</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="el-margin-v-30 el-padding-l-25 el-padding-r-40">
        <el-row class="el-padding-20 el-white-bgcolor">
          <el-row  v-show="dtype==='list'">
            <el-button type="primary" size="small" @click="routeTo('add')">添加业主</el-button>
            <el-button size="small" @click="importData">excel导入</el-button>
            <el-button size="small" @click="downloadData">下载excel</el-button>
            <el-table
              class="el-margin-t-10"
              :data="table.tableData"
              border
              stripe
              style="width:100%"
              size="small"
              :highlight-current-row="true"
              ref="multipleTable"
            >
              <el-table-column label="房号信息" prop="house" width="180"></el-table-column>
              <el-table-column label="业主姓名" prop="owners" width="180">
                <template slot-scope="scope">
                  <el-row v-for="(o,index) in scope.row.owners" :key="index">
                    {{o.name}}
                    <hr class="el-hr-dashed" v-if="scope.row.owners.length>1&&index<scope.row.owners.length-1"/>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="性别" prop="owners" width="180">
                <template slot-scope="scope">
                  <el-row v-for="(o,index) in scope.row.owners" :key="index">
                    {{o.sex?"男":"女"}}
                    <hr class="el-hr-dashed" v-if="scope.row.owners.length>1&&index<scope.row.owners.length-1"/>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="联系方式" prop="owners" width="180">
                <template slot-scope="scope">
                  <el-row v-for="(o,index) in scope.row.owners" :key="index">
                    {{o.telephone}}
                    <hr class="el-hr-dashed" v-if="scope.row.owners.length>1&&index<scope.row.owners.length-1"/>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="证件号码" prop="owners" width="180">
                <template slot-scope="scope">
                  <el-row v-for="(o,index) in scope.row.owners" :key="index">
                    {{o.cardNum}}
                    <hr class="el-hr-dashed" v-if="scope.row.owners.length>1&&index<scope.row.owners.length-1"/>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="产权证号/合同备案号" prop="propertyNum"></el-table-column>
              <el-table-column label="使用情况" prop="useType" width="180">
                <template slot-scope="scope">
                  {{useTypes[scope.row.useType-1]}}
                </template>
              </el-table-column>
              <el-table-column label="创建时间" prop="time">
                <template slot-scope="scope">
                  {{scope.row.time|dateformat()}}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button type="text" @click="routeTo('edit',scope.row)">编辑</el-button>
                  <el-button type="text" @click="del(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              class="el-margin-t-10 my-el-pagination"
              @current-change="currentChangeHandle"
              :current-page="table.currentPage"
              :page-size="table.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="table.rowCount"
            ></el-pagination>
          </el-row>
          <ou-editor v-show="dtype!=='list'" @rePrev="rePrev" :ruleForm="curRow"></ou-editor>
        </el-row>

      </el-row>

    </div>
</template>
<script>
  import ouEditor from "./addOrEditOwners.vue"
export default {
    components:{
      ouEditor
    },
    data(){
        return {
          useTypes:["自用","租用","空置"],
          dtype:"list",
          curRow:{},
          table: {
            tableData: [
              {
                house: "1栋1单元2001",
                owners: [
                  {name:"刘德华",telephone:13457894276,cardNum:429004199010081075,sex:1}
                ],
                propertyNum: "1001165230004154",
                useType: 1,
                time:"2019-12-13 14:23:00"
              },
              {
                house: "2栋2单元4001",
                owners: [
                  {name:"李敏镐",telephone:13457894276,cardNum:429004199010081075,sex:1},
                  {name:"杨幂",telephone:13457894276,cardNum:429004199010081075,sex:0}
                ],
                propertyNum: "1001165230004154",
                useType: 2,
                time:"2019-12-13 14:23:00"
              },
              {
                house: "2栋3单元1001",
                owners: [
                  {name:"向佐",telephone:13457894276,cardNum:429004199010081075,sex:1},
                  {name:"郭碧婷",telephone:13457894276,cardNum:429004199010081075,sex:0}
                ],
                propertyNum: "1001165230004154",
                useType: 3,
                time:"2019-12-13 14:23:00"
              }
            ],
            currentPage: 1,
            pageSize: 10,
            rowCount: 3,
            queryKey: ""
          }
        }
    },
    methods:{
      routeTo(type,rows){
        let self = this;
        self.dtype = type;
        let row = rows?rows.owners[0]:{
          house: '',
          name:'',
          sex:'',
          telephone:'',
          cardNum:'',
          idNum:'',
          useType: ''
        };
        if(rows){
          row.house = rows.house;
          row.useType = rows.useType;
        }
        self.curRow = row;
      },
      currentChangeHandle(){

      },
      del(rows){

      },
      importData(){},
      downloadData(){},
      rePrev() {
        console.log("aaaaaaa");
        this.dtype = "list";
      }
    }
}
</script>
