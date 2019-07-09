<template>
  <div class="teacherHeader">
    <div class="header-right">
      <div class='sub-title'>
        <img src="../../assets/img/logo.jpg">
        <span>业主联盟社区运营管理平台</span>
      </div>
      <div class="title">
        <ul>
          <li
            class="nav-li"
            :class="{'active':item.act}"
            v-for="(item,index) in navData"
            :key="index"
            @click="navClick(index,item.path)"
          >{{item.title}}</li>
        </ul>
      </div>
      <div class="user">
        <div class="use-info">使用文档</div>
        <div class="user-info">
          <div class="header-img">
            <img src="../../assets/img/user.jpg" alt>
          </div>
          <div class="info">
            <p>刘德华</p>
            <p>万科城市花园第二届业务会</p>
          </div>
          <div>
            <p class='exit-p'>安全退出</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { bus } from "../../tools/bus";
import { setItem } from "../../tools/common";
export default {
  data() {
    return {
      navData: [
        {
          title: "首页",
          act: true,
          path:'/',

        },
        {
          title: "小区管理",
          act: false,
          path:'/houseAnn',
        },
        {
          title: "业委会",
          act: false,
          path:'/ownersMessage'
        },
        {
          title: "数据中心",
          act: false,
          path:'/houseMessage'
        }
      ]
    };
  },
  computed: {
    username() {
      return "管理员";
    },
    deptName() {}
  },
  methods: {
    handleCommand(command) {},
    changeSide() {},
    changePass() {},
    navClick(_index,_path) {
      for (var i = 0; i < this.navData.length; i++) {
        this.navData[i].act = false;
      }
      this.navData[_index].act = true;
      bus.$emit('actIndexFn', _index);
      this.$router.push({path:_path,query: { navIndex: _index }});
    }
  },
  mounted() {
    console.log(this.$route.path);
  },
  destroyed() {}
};
</script>
<style scoped>
.teacherHeader {
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 100;
  min-width: 1024px;
  padding-right: 40px;
  padding-left:40px;
}

.header-right {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  background-color: #1d89e4;
  height: 64px;
  color: #fff;
}

.title-span {
  font-size: 20px;
  color: #cccccc;
  margin-left: 20px;
  line-height: 64px;
}

.header-img img {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-right: 14px;
}

.tit-area {
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 32px;
  display: inline-block;
  padding: 0;
  line-height: 32px;
}
.title-sub-wrapper {
  padding-left: 28px;
  display: flex;
}
.title {
  height: 100%;
}
.title ul {
  margin-left: 20px;
  height: 100%;
}
.title li {
  float: left;
  padding: 0 20px;
  height: 100%;
  line-height: 62px;
}
/* .title li {
  float: left;
  padding: 0 20px;
  height: 100%;
  line-height: 62px;
} */
.title li.active {
  background-color: rgba(255, 255, 255, 0.3);
}
.title li:hover {
  cursor: pointer;
}
.user {
  display: flex;
  align-items: center;
  color: #fff;
}
.user-info {
  display: flex;
  align-items: center;
}
.use-info {
  height: 32px;
  line-height: 32px;
  padding-right: 14px;
  border-right: 1px solid #62aced;
  margin-right: 14px;
  font-size: 16px;
}
.info p {
  line-height: 1.2em;
  font-size: 12px;
  padding-right: 14px;
  border-right: 1px solid #62aced;
  margin-right: 14px;
}
.sub-title {
  display: flex;
  align-items: center;
}
.sub-title img{
  height: 64px;
}
.sub-title span{
  display: flex;
  font-size: 18px;
  padding-left: 20px;
  line-height: 62px;
}
.nav-li{
  margin-right: 10px;
  transition:all .3s;
}
.nav-li:last-of-type{
  margin-right: 0;
}
.exit-p{
  font-size: 16px;
}
</style>
