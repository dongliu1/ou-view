<template>
<!-- 业委会信息 -->
    <div class="house-message">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/houseMessage?navIndex=3' }">数据中心</el-breadcrumb-item>
          <el-breadcrumb-item>小区设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="el-margin-v-30 el-padding-l-25 el-padding-r-40">
          <el-row class="el-padding-20 el-white-bgcolor">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="小区名称" prop="name">
                <el-col :span="6">
                  <el-input v-model="ruleForm.name" placeholder="万科城市花园第三届业主委员会"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="总户数" prop="totalHouse">
                <el-col :span="3">
                  <el-input v-model="ruleForm.totalHouse">
                    <template slot="append">人</template>
                  </el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="总建筑面积" prop="totalArea">
                <el-col :span="3">
                  <el-input v-model="ruleForm.totalArea">
                    <template slot="append">㎡</template>
                  </el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="专有部分面积" prop="personalArea">
                <el-col :span="3">
                  <el-input v-model="ruleForm.personalArea">
                    <template slot="append">㎡</template>
                  </el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="小区地址" prop="address">
                <el-col :span="6">
                  <el-input v-model="ruleForm.address" placeholder="湖北省武汉市洪山区光谷1路19号"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="submitForm('ruleForm')">保存</el-button>
                <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
          ruleForm: {
            name: '',
            totalHouse: '',
            totalArea: '',
            personalArea: '',
            address: ''
          },
          rules: {
            name: [
              { required: false, message: '请输入活动名称', trigger: 'blur' }
            ],
            totalHouse: [
              { required: true, message: '请输入委员会人数', trigger: 'blur' }
            ],
            totalArea: [
              { required: true, message: '请输入委员会人数', trigger: 'blur' }
            ],
            personalArea: [
              { required: true, message: '请输入委员会人数', trigger: 'blur' }
            ],
            address: [
              { required: false, message: '请填写活动形式', trigger: 'blur' }
            ]
          }
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped>

</style>
