<template>
  <div class="content">
    <el-row :gutter="20" class="mat-30">
      <el-col :span="18">
        <div class="data-overview">
          <div class="data-view-wrap">
            <p class="view-title">数据概览</p>
          </div>
          <div class="data-content">
            <el-row :gutter="20">
              <el-col :span="6" v-for="(item,index) in boxData" :key="index">
                <div class="box" :style="{backgroundColor:item.boxBgc}">
                  <div class="box-top-wrapper">
                    <div class="box-bgi" :style="{backgroundImage:`url(${item.bgi})`}"></div>
                    <div class="box-top">
                      <div class="box-count">
                        <span class="box-first">{{item.title}}</span>
                        <span class="box-sec">
                          {{item.count}}
                          <span class="small-span">个</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="box-bottom" :style="{backgroundColor:item.subBgc}">
                    <span>管理</span>
                    <span>></span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="after-sales-service">
          <div class="data-view-wrap">
            <p class="view-title">售后服务</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="mat-30 opera-daily-wrapper" :gutter="20">
      <el-col :span="18" class="opera-daily">
        <div class="operation data-view-wrap">
          <p class="view-title">操作日志</p>
          <p>查看更多 ></p>
        </div>
        <div class="table-daily">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="操作时间" width="180"></el-table-column>
            <el-table-column prop="name" label="操作人" width="180"></el-table-column>
            <el-table-column width="200" prop="tel" label="手机号"></el-table-column>
            <el-table-column prop="address" label="操作内容"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boxData: [
        {
          title: "房屋",
          count: "900",
          boxBgc: "#5d9cec",
          subBgc: "#4a89dc",
          bgi: require("../../assets/img/fangwu.png")
        },
        {
          title: "业主",
          count: "900",
          boxBgc: "#4fc1e9",
          subBgc: "#3bafda",
          bgi: require("../../assets/img/yezhudanwei.png")
        },
        {
          title: "住户",
          count: "900",
          boxBgc: "#48cfad",
          subBgc: "#37bc9b",
          bgi: require("../../assets/img/zhuhu.png")
        },
        {
          title: "文档",
          count: "900",
          boxBgc: "#a0d468",
          subBgc: "#8cc152",
          bgi: require("../../assets/img/wendang.png")
        },
        {
          title: "小区公告",
          count: "900",
          boxBgc: "#ed5565",
          subBgc: "#da4453",
          bgi: require("../../assets/img/gonggao.png")
        },
        {
          title: "报事报修",
          count: "900",
          boxBgc: "#ac92ec",
          subBgc: "#967adc",
          bgi: require("../../assets/img/weixiu.png")
        },
        {
          title: "投票议事",
          count: "900",
          boxBgc: "#ec87c0",
          subBgc: "#d770ad",
          bgi: require("../../assets/img/toupiao.png")
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄",
          tel: "13585452325"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄",
          tel: "13585452325"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄",
          tel: "13585452325"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄",
          tel: "13585452325"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄",
          tel: "13585452325"
        }
      ]
    };
  },
  methods: {},

  mounted() {}
};
</script>
<style scoped>
.data-overview {
  background-color: #fff;
}
.after-sales-service {
  height: 425px;
  background: #fff;
  /* color:#fff; */
}
.data-view-wrap {
  padding-left: 24px;
  padding-right: 24px;
  border-bottom: 1px solid #f4f4f5;
}
.data-content {
  padding: 34px 24px;
}
.box {
  color: #fff;
  margin-bottom: 24px;
}

.box-top {
  padding: 16px 0;
  padding-right: 15%;
  display: flex;
  justify-content: space-between;
  white-space:nowrap;
}
.box-count {
  min-width: 60px;
  text-align: center;
}
.box-first {
  font-size: 18px;
  display: block;
}
.box-sec {
  font-size: 30px;
  display: block;
  line-height: 1.6em;
}
.small-span {
  font-size: 14px;
}
.box-bottom {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  background-color: #4a89dc;
}
.operation {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
.table-daily {
  padding: 0 24px;
  background-color: #fff;
}
.opera-daily-wrapper {
  margin-bottom: 30px;
}
.box-bgi {
  height:105px;
  width: 40%;
  margin-left: -10%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.box-top-wrapper {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.content{
    padding: 0 40px 0 24px;
}
@media screen and (max-width: 1650px) {
  .box-bgi {
    width:50%;
  }
}
.el-form.demo-ruleForm{
  margin-top: 20px;
}
</style>
