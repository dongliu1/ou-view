<template>
    <div class="house-management">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/houseManagement?navIndex=3' }">数据中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/houseManagement?navIndex=3' }" v-if="dtype!='list'" @click.native="dtype='list'">房屋管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="dtype=='list'">房屋管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="dtype=='add'">添加房屋</el-breadcrumb-item>
        <el-breadcrumb-item v-if="dtype=='edit'">编辑房屋</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="el-margin-v-30 el-padding-l-25 el-padding-r-40">
        <el-row class="el-padding-20 el-white-bgcolor">
          <el-row  v-show="dtype==='list'">
            <el-button type="primary" size="small" @click="routeTo('add')">添加房屋</el-button>
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
              <el-table-column label="栋" prop="building" width="180"></el-table-column>
              <el-table-column label="单元" prop="unit" width="180"></el-table-column>
              <el-table-column label="房号" prop="houseNum" width="180"></el-table-column>
              <el-table-column label="销售面积(平方米)" prop="salesArea" width="180"></el-table-column>
              <el-table-column label="实际面积(平方米)" prop="actArea" width="180"></el-table-column>
              <el-table-column label="房屋类型" prop="houseType">
                <template slot-scope="scope">
                  {{houseTypes[scope.row.houseType-1]}}
                </template>
              </el-table-column>
              <el-table-column label="业主认证" prop="ownerCertification" width="180">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.ownerCertification?'success':'warning'" effect="light">
                    {{scope.row.ownerCertification?'已认证':'未认证'}}
                  </el-tag>
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
  import ouEditor from "./addOrEdit.vue"
export default {
    components:{
      ouEditor
    },
    data(){
        return {
          houseTypes:["商品房","还建房","经济适用房"],
          dtype:"list",
          curRow:{},
          table: {
            tableData: [
              {
                building: "1栋",
                unit: "1单元",
                houseNum: "1001",
                salesArea: 108.94,
                actArea: 87.10,
                houseType:1,
                ownerCertification:1
              },
              {
                building: "1栋",
                unit: "2单元",
                houseNum: "1002",
                salesArea: 108.94,
                actArea: 87.10,
                houseType:2,
                ownerCertification:0
              },
              {
                building: "1栋",
                unit: "3单元",
                houseNum: "1003",
                salesArea: 108.94,
                actArea: 87.10,
                houseType:3,
                ownerCertification:1
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
        self.curRow = rows?rows:{
          building: '',
          unit: '',
          houseNum: '',
          salesArea: '',
          actArea: '',
          houseType: ''
         }
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
