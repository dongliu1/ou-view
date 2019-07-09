<template>
  <div class="vote">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/houseAnn' }">小区管理</el-breadcrumb-item>
      <el-breadcrumb-item>投票事议</el-breadcrumb-item>
    </el-breadcrumb>

    <section class="section-content">
      <el-main class="content-wrapper">
        <section v-if="tableFlag">
          <el-row class="my-margin-top-20" :gutter="4">
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
              <el-table-column label="议事标题" prop="title"></el-table-column>
              <el-table-column label="状态" width="180">
                <template slot-scope="scope">
                  <span v-if="scope.row.status==1">编辑中</span>
                  <span v-if="scope.row.status==0">已发布</span>
                </template>
              </el-table-column>
              <el-table-column label="投票开始时间" prop="starTime" width="180"></el-table-column>
              <el-table-column label="投票截止时间" prop="lastLoginTime" width="180"></el-table-column>
              <el-table-column label="已参与 / 总票数" prop="ticket" width="180"></el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button type="text" @click="viewDetail(scope.row)">查看详情</el-button>
                  <el-button type="text" @click="edit(scope.row)">编辑</el-button>
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
        </section>
        <!-- 步骤条 -->
        <section v-else class="setup-top">
          <el-steps :active="setupCount" align-center>
            <el-step title="投票范围" description="选择可参与投票人范围确认投票人基础数据"></el-step>
            <el-step title="基本信息" description="设置此次议事的基本信息"></el-step>
            <el-step title="附件资源" description="上传此次投票议事中涉及合同文档等资源"></el-step>
            <el-step title="选项信息" description="设置投票选项可设置单选多选"></el-step>
            <el-step title="投票状态" description="显示当前投票状态及详细信息"></el-step>
          </el-steps>
        </section>

        <!-- 第一步 -->
        <div class="set-1">
          <el-form class="set-1-form">
            <section v-if="setupCount==0" class="setup-wrapper">
              <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </section>

            <section v-if="setupCount==1" class="setup-wrapper setup-wrapper-2">
              <el-form-item label="议事标题">
                <el-input v-model="form.name" style="width:400px"></el-input>
              </el-form-item>
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="value2"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="截止时间">
                <el-date-picker
                  v-model="value3"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                ></el-date-picker>
              </el-form-item>

              <el-form-item class="el-form-item_data setup-1-btn-wrap" label="议事详情" prop="region">
                <editor
                  :value="ruleForm.region"
                  style="height:515px;background:#fff"
                  @input="input"
                  @onEditorBlur="onEditorBlur"
                ></editor>
              </el-form-item>
            </section>

            <section v-if="setupCount==2" class="setup-wrapper setup-wrapper-3">
              <el-button @click="diaFileFlag = true">
                选择文件
                <i class="el-icon-tickets el-icon--right"></i>
              </el-button>
              <el-button @click="diaArticleFlag = true">
                选择文章
                <i class="el-icon-document-copy el-icon--right"></i>
              </el-button>
              <div class="list-data-wrap">
                <div v-for="(item,index) in chooseList" :key="index" class="choose-item-wrap">
                  <span class="list-item">{{item.title}}</span>
                  <span class="item-del">删除</span>
                </div>
              </div>
            </section>

            <el-form-item class="setup-1-btn-wrap">
              <el-button type="primary" @click="setNext">下一步</el-button>
              <el-button @click="setBack">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </section>

    <!-- 选择文件 -->
    <el-dialog title="选择文件" :visible.sync="diaFileFlag" class="file-dia">
      <el-card class="box-card">
        <div
          v-for="(item,index) in 20"
          :key="item"
          class="text item"
          @click="cFile(index)"
        >{{'列表内容 ' + item }}</div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaFileFlag = false">取 消</el-button>
        <el-button type="primary" @click="diaFileFlag = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择文章 -->
    <el-dialog title="选择文章" :visible.sync="diaArticleFlag" class="file-dia">
      <el-card class="box-card">
        <div
          v-for="(item,index) in 20"
          :key="item"
          class="text item"
          @click="cArticle(index)"
        >{{'列表内容 ' + item }}</div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaArticleFlag = false">取 消</el-button>
        <el-button type="primary" @click="diaArticleFlag = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Editor from "./Editor.vue";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      form: {
        isShow: false
      },
      table: {
        queryKey: ""
      },
      tableFlag: false,
      setupCount: 2,
      value2: "",
      value3: "",
      ruleForm: {
        region: ""
      },
      diaFileFlag: false,
      diaArticleFlag: false,
      chooseList: [
        {
          title: "标题1标题1标题1标题1标题1标题1标题1"
        },
        {
          title: "标题2标题2标题2标题2标题2标题2标题2"
        },
        {
          title: "标题3标题3标题3标题3标题3标题3标题3"
        }
      ]
    };
  },

  methods: {
    addAnn() {},
    goBack() {},
    cleanKey() {},
    viewDetail() {},
    edit() {},
    del() {},
    currentChangeHandle() {},
    setBack() {
      if (this.setupCount != 0) {
        this.setupCount--;
      }
    },
    setNext() {
      if (this.setupCount != 4) {
        this.setupCount++;
      }
    },
    input(value) {
      //富文本编辑器
      this.ruleForm.region = value;
    },
    onEditorBlur(value) {
      console.log(value);
    },

    cFile(_index) {
      this.diaFileFlag = false;
    },
    cArticle(_index) {
      this.diaArticleFlag = false;
    }
  },
  components: {
    editor: Editor
  }
};
</script>
<style scoped>
.setup-wrapper {
  margin-top: 20px;
}
.setup-wrapper >>> .el-form-item {
  display: flex;
  justify-content: center;
}
.set-1-form {
  /* border: 1px solid red; */
  /* height: 358px; */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-around;
}
.setup-1-btn-wrap {
  text-align: center;
  flex: 1 0 auto;
}
.vote {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.el-breadcrumb {
  flex: 0 0 auto;
}
.section-content {
  flex: 1 0 auto;
}
.content-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.setup-top {
  flex: 0 0 auto;
}
.set-1 {
  flex: 1 0 auto;
  margin-top: 30px;
}
.setup-1-btn-wrap >>> .el-form-item__content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.setup-wrapper-2 >>> .el-form-item__content {
  width: 750px;
  text-align: left;
}
.ql-snow {
  text-align: left !important;
}
.setup-wrapper-3 {
  text-align: center;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.item:hover {
  cursor: pointer;
  color: #409eff;
}
.box-card {
  width: 480px;
}
.file-dia >>> .el-dialog {
  min-width: 524px;
}
.list-data-wrap {
  margin-top: 30px;
}
.list-item {
  background-color: #ccc;
  margin-bottom: 15px;
  line-height: 30px;
  width: 400px;
  text-align: left;
  padding: 0 10px;
}
.choose-item-wrap {
  display: flex;
  justify-content: center;
}
.item-del {
  line-height: 30px;
  color: #0099ff;
  margin-left: 6px;
}
.item-del:hover{
  cursor: pointer;
}
</style>


