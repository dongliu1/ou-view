<template>
  <div id="main">
    <el-container class="main-container">
      <header>
        <el-header height="64px" class="top-header">
          <my-header :actIndex="actIndex"/>
        </el-header>
      </header>
      <section>
        <el-main>
          <el-container>
            <el-aside
              class="teacherSide"
              style="background-color:#fff !important;"
              :width="barWidth"
            >
              <my-side/>
            </el-aside>
            <el-main>
              <!-- index  subHeader -->
              <sub-header v-if="this.$route.path == '/'"></sub-header>
              <el-container>
                <el-main class="content-main">
                  <transition name="move" mode="out-in">
                    <router-view ></router-view>
                  </transition>
                </el-main>
              </el-container>
            </el-main>
          </el-container>
        </el-main>
      </section>
      <footer>
        <el-footer>
          <div>
            <p>武汉仓晟科技有限公司</p>
            <p>COPYRIGHT © 2014 - 2019 CANG SHENG.ALL RIGHTS RESERVED.仓晟科技 版权所有</p>
          </div>
        </el-footer>
      </footer>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import SubHeader from "@/components/common/SubHeader";
import { bus } from "../../tools/bus";
export default {
  data() {
    return {
      barWidth: "200px",
      actIndex: "1",

    };
  },
  methods: {},
  mounted() {

  },
  components: {
    "myHeader": Header,
    "my-side": SideBar,
    "sub-header": SubHeader
  },
  watch:{
  $route(to,from){
    console.log(to.path);
  }
},
};
</script>

<style scoped>
.top-header {
  background-color: #1d89e4;
  padding: 0;
}
.el-footer {
  background-color: #1d89e4;
  text-align: center;
  color: #fff;
  line-height: 24px;
  height: 60px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  /* padding: 10px 0; */
}

.el-container {
  height: 100%;
}
#main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.el-main {
  overflow: hidden;
  padding: 0;
  height: 100%;
}

.content-main {
  background-color: #f1f5f7;
}
header {
  flex: 0 0 auto;
}

section {
  flex: 1 0 auto;
}

footer {
  flex: 0 0 auto;
}
.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
section{
  background-color: #f1f5f7;
}
</style>
