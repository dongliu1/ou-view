<template>
  <div>
     <div class="sub-header-bgcImg"></div>
    <el-menu
      :default-active="defaultAct"
      class="el-menu-vertical-demo"
    >
        <el-menu-item
        v-show="actIndex == 0"
         @click='routeNav(subItem.path,subItem.navIndex)'  v-for="subItem in subNavIndex" :key="subItem.path" :index="subItem.path"
        >{{ subItem.tit }}</el-menu-item>
        <el-menu-item
        v-show="actIndex == 1"
          v-for="subItem in subManage"
          :key="subItem.path"
          :index="subItem.path"
          @click='routeNav(subItem.path,subItem.navIndex)'
        >{{ subItem.tit }}</el-menu-item>

        <el-menu-item
        v-show="actIndex == 2"
          v-for="subItem in subCommittee"
          :key="subItem.path"
          :index="subItem.path"
          @click='routeNav(subItem.path,subItem.navIndex)'
        >{{ subItem.tit }}</el-menu-item>
        <el-menu-item
        v-show="actIndex == 3"
          v-for="subItem in subDataCenter"
          :key="subItem.path"
          :index="subItem.path"
          @click='routeNav(subItem.path,subItem.navIndex)'
        >{{ subItem.tit }}</el-menu-item>
     
    </el-menu>
  </div>
</template>

<script>
import { bus } from "../../tools/bus";
export default {
  data() {
    return {
      actIndex: 0,
      subNavIndex: [
        {
          tit: "主界面",
          path:'/',
          navIndex:0
        },
        {
          tit: "账户中心",
          path:'/account',
          navIndex:0
        },
        {
          tit: "操作日志",
          path:'/operationLog',
          navIndex:0
        }
      ],
      subManage: [
        {
          tit: "小区公告",
          path:'/houseAnn',
          navIndex:1
        },
        {
          tit: "投票议事",
          path:'/vote',
          navIndex:1
        }
      ],
      subCommittee: [
        {
          tit: "业委会信息",
          path:"/ownersMessage",
          navIndex:2
        },
        {
          tit: "业委会成员",
          path:"/ownersGroup",
          navIndex:2
        },
        {
          tit: "管理员",
          path:"/management",
          navIndex:2
        }
      ],
      subDataCenter: [
        {
          tit: "小区信息",
          path:'/houseMessage',
          navIndex:3
        },
        {
          tit: "房屋管理",
          navIndex:3
        },
        {
          tit: "业主管理",
          navIndex:3
        },
        {
          tit: "住户管理",
          navIndex:3
        },
        {
          tit: "文档管理",
          navIndex:3
        }
      ]
    };
  },
  methods: {
    routeNav(_path,_navIndex){
      this.$router.push({path:_path,query: { navIndex: _navIndex }}); 
    }
  },
  mounted() {
    var _this = this;
    bus.$on("actIndexFn", function(_index) {
      _this.actIndex = _index;
      console.log( `_this.actIndex=${ _this.actIndex}`);
    });
  },
  computed:{
    defaultAct(){
       return this.$route.path
    }
  }
};
</script>

<style scoped>
.sub-header-bgcImg {
  height: 70px;
  width: 200px;
  background: url("../../assets/img/sub_bgc_02.jpg") no-repeat;
  background-size: cover;
}
.el-menu-item.is-active{
  background-color: #f8f9fa;
  border-right: 2px solid #1e88e5;
}
</style>




