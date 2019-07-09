<template>
  <div class="operation-log">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>操作日志</el-breadcrumb-item>
    </el-breadcrumb>

    <section class="section-content">
      <el-main class="content-wrapper">
        <el-row>
          <el-col :span="4">
            <el-input
              size="small"
              placeholder="请输入关键字"
              suffix-icon="el-icon-search"
              :clearable="true"
              @clear="cleanKey"
              v-model="table.queryKey"
              @keyup.enter.native="queryKey"
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="my-margin-top-10">
          <el-table
            :data="table.tableData"
            border
            stripe
            style="width:100%"
            size="small"
            :highlight-current-row="true"
            ref="multipleTable"
          >
            <el-table-column label="账号" prop="account"></el-table-column>
            <el-table-column label="姓名" prop="user"></el-table-column>
            <el-table-column label="操作时间" prop="time"></el-table-column>
            <el-table-column label="操作内容" min-width="150">
              <template slot-scope="scope">
                <span style="white-space: nowrap;" :title="scope.row.context">{{scope.row.context}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="my-margin-top-10 my-el-pagination"
            @current-change="currentChangeHandle"
            :current-page="table.currentPage"
            :page-size="table.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="table.rowCount"
          ></el-pagination>
        </el-row>
      </el-main>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: {
        tableData: [{
            account:'13525232',
            user:'王明杰',
            time:'2018-01-10'
        },{
            account:'13525232',
            user:'王明杰',
            time:'2018-01-10'
        },{
            account:'13525232',
            user:'王明杰',
            time:'2018-01-10'
        }],
        currentPage: 1,
        pageSize: 10,
        rowCount: 0,
        queryKey: ""
      }
    };
  },
  methods: {
    cleanKey() {},
    queryKey() {},
    currentChangeHandle(){},
  }
};
</script>

<style scoped>
</style>


