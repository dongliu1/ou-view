<template>
    <div class="owners-group">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/ownersGroup?navIndex=2' }">业委会</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/ownersGroup?navIndex=2' }" v-if="dtype!='list'" @click.native="dtype='list'">业委会成员</el-breadcrumb-item>
        <el-breadcrumb-item v-if="dtype=='list'">业委会成员</el-breadcrumb-item>
        <el-breadcrumb-item v-if="dtype=='add'">添加成员</el-breadcrumb-item>
        <el-breadcrumb-item v-if="dtype=='edit'">编辑成员</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row class="el-margin-v-30 el-padding-l-25 el-padding-r-40">
        <el-row class="el-padding-20 el-white-bgcolor">
          <el-row  v-show="dtype==='list'">
            <el-button type="primary" size="small" @click="routeTo('add')">添加成员</el-button>
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
              <el-table-column label="姓名" prop="name" width="180"></el-table-column>
              <el-table-column label="手机号码" prop="telephone" width="180"></el-table-column>
              <el-table-column label="房号信息" prop="house" width="180"></el-table-column>
              <el-table-column label="职位" prop="duty" width="120"></el-table-column>
              <el-table-column label="组织" prop="group"></el-table-column>
              <el-table-column label="创建时间" prop="time" width="180">
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
  import ouEditor from "./addOrEdit.vue"
export default {
    components:{
      ouEditor
    },
    data(){
        return {
          dtype:"list",
          curRow:{},
          table: {
            tableData: [
              {
                name: "陈园",
                telephone: 18571684488,
                time: "2017-05-04 08:15:00",
                house: "1503",
                duty: "主任",
                group:"万科城市花园第二届业主委员会"
              },
              {
                name: "刘德华",
                telephone: 13571684487,
                time: "2017-05-04 08:15:00",
                house: "1504",
                duty: "委员",
                group:"万科城市花园第二届业主委员会"
              },
              {
                name: "周杰伦",
                telephone: 15571684489,
                time: "2017-05-04 08:15:00",
                house: "1505",
                duty: "副主任",
                group:"万科城市花园第二届业主委员会"
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
        console.log(type,rows);
        let self = this;
        self.dtype = type;
        self.curRow = rows?rows:{
          name: '',
          telephone: '',
          house: '',
          duty: '',
         }
      },
      currentChangeHandle(){

      },
      del(rows){

      },
      rePrev() {
        console.log("aaaaaaa");
        this.dtype = "list";
      }
    }
}
</script>
