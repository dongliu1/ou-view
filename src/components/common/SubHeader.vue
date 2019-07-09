<template>
  <div>
    <el-header height="70px" class="sub-header">
      <div class="sub-header-info">
        <div class="sub-title-info-img">
          <img src="../../assets/img/user.jpg" alt>
        </div>
        <div class="area-info">
          <p class="area-first-p">万科城市花园</p>
          <p class='area-sec-p'>湖北省武汉市洪山区关谷1路108号</p>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {

  }
};
</script>

<style scoped>
.el-menu {
  height: 100%;
}
.sub-header {
  padding: 0;
  display: flex;
  background-color: #fff;
}
.sub-header-info {
  margin-left: 30px;
  display: flex;
  align-items: center;
}
.el-header {
  padding: 0;
}
.sub-title-info-img img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.area-info {
  margin-left: 10px;
}
.area-first-p {
  font-size: 18px;
  margin-bottom: 8px;
}
.area-sec-p{
  font-size: 14px;
}
</style>


