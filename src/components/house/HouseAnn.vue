<template>
  <!-- 小区公告 -->
  <div class="houseAnn">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/houseAnn' }">小区管理</el-breadcrumb-item>
      <el-breadcrumb-item>小区公告</el-breadcrumb-item>
    </el-breadcrumb>

    <section class="section-content">
      <el-main class="content-wrapper">
        <el-row class="my-margin-top-20" :gutter="6">
          <el-col :span="2" v-show="!form.isShow" style="min-width:120px;">
            <el-button type="primary" size="small" @click="addAnn">新增公告</el-button>
          </el-col>
          <el-col :span="2" v-show="form.isShow">
            <el-button type="primary" size="small" @click="goBack">返回列表</el-button>
          </el-col>
          <el-col :span="4" v-show="!form.isShow">
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
        <!-- table -->
        <el-row class="my-margin-top-10" v-show="!form.isShow">
          <el-table
            :data="table.tableData"
            border
            stripe
            style="width:100%"
            size="small"
            :highlight-current-row="true"
            ref="multipleTable"
          >
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="状态" width="180">
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">编辑中</span>
                <span v-if="scope.row.status==0">已发布</span>
              </template>
            </el-table-column>
            <el-table-column label="发布时间" prop="lastLoginTime" width="180"></el-table-column>
            <el-table-column label="发布人" prop="name" width="220"></el-table-column>
            <el-table-column label="浏览数" prop="count" width="120"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button type="text" @click="modifyStudent(scope.row)">编辑</el-button>
                <el-button type="text" @click="preview(scope.row)">预览</el-button>
                <el-button type="text" @click="del(scope.row)">删除</el-button>
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
        <!-- editor -->
        <el-row v-show="form.isShow" class='edit-row'>
          <div class="writediarytitle">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="60px"
              class="demo-ruleForm"
            >
              <el-form-item label="标题" prop="title">
                <el-input size="mini" v-model="ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item class="el-form-item_data" label="内容" prop="region">
                <editor
                  :value="ruleForm.region"
                  style="height:515px;background:#fff"
                  @input="input"
                  @onEditorBlur="onEditorBlur"
                ></editor>
              </el-form-item>
              <el-form-item class="el-form-item_btn">
                <el-button
                  v-if="state=='writediary'"
                  type="primary"
                  @click="submitForm('ruleForm')"
                >保存</el-button>
                <!-- <el-button
                  v-if="state=='editdiary'"
                  type="primary"
                  @click="submitForm('ruleForm')"
                >保存</el-button> -->
                <el-button plain @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-row>
      </el-main>
    </section>
  </div>
</template>

<script>
import Editor from "./Editor.vue";
export default {
  data() {
    var titleVerification = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入标题"));
      } else {
        value = value.replace(/\s+/g, "");
        if (value === "") {
          callback(new Error("标题不能为空"));
        }
        callback();
      }
    };
    var ContentVerification = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入内容"));
      } else {
        console.log(value);
        value = value.replace(/\s+/g, "");
        console.log(value);
        if (value == "<p></p>") {
          callback(new Error("内容不能为空"));
        }
        callback();
      }
    };
    return {
      form: {
        isShow: false
      },
      table: {
        tableData: [
          {
            title: "物业送戏进小区活动的通知",
            status: 1,
            lastLoginTime: "2017-05-04   08：15：00",
            name: "万科城市花园 · 第一届业委会",
            count: 42542
          },
          {
            title: "物业送戏进小区活动的通知",
            status: 1,
            lastLoginTime: "2017-05-04   08：15：00",
            name: "万科城市花园 · 第一届业委会",
            count: 42542
          },
          {
            title: "物业送戏进小区活动的通知",
            status: 0,
            lastLoginTime: "2017-05-04   08：15：00",
            name: "万科城市花园 · 第一届业委会",
            count: 42542
          }
        ],
        currentPage: 1,
        pageSize: 10,
        rowCount: 0,
        queryKey: ""
      },
      ruleForm: {
        title: "",
        region: ""
      },
      rules: {
        title: [
          { validator: titleVerification, trigger: "blur" },
          { min: 1, max: 25, message: "长度在 1 到 25个字符", trigger: "blur" }
        ],
        region: [{ validator: ContentVerification, trigger: "blur" }]
      },
      state:'writediary',
    };
  },
  methods: {
    cleanKey() {},
    queryKey() {},
    addAnn() {
      this.form.isShow = true;
    },
    goBack() {
      this.form.isShow = false;
    },
    currentChangeHandle() {},
    submitForm(_ref) {},
    input(value) {
      //富文本编辑器
      this.ruleForm.region = value;
    },
    onEditorBlur(value) {
      console.log(value);
    },
    del(){}
  },
  components: {
    editor: Editor
  },
  mounted() {}
};
</script>

<style scoped>
.edit-row{
  margin-top: 20px;
}
</style>


