<template>
<!-- 业委会信息 -->
    <div class="owners-message">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/ownersMessage?navIndex=2' }">业委会</el-breadcrumb-item>
          <el-breadcrumb-item>业委会信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="el-margin-v-30 el-padding-l-25 el-padding-r-40">
          <el-row class="el-padding-20 el-white-bgcolor">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="业委会名称" prop="name">
                <el-col :span="6">
                  <el-input v-model="ruleForm.name" placeholder="万科城市花园第三届业主委员会"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="委员人数" prop="ownerNum">
                <el-col :span="3">
                  <el-input v-model="ruleForm.ownerNum">
                    <template slot="append">人</template>
                  </el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="成立日期">
                <el-col :span="6">
                  <el-form-item prop="startDate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="到期日期">
                <el-col :span="6">
                  <el-form-item prop="endDate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="详情介绍" prop="desc">
                <el-col :span="12">
                  <el-input type="textarea" :rows="10" v-model="ruleForm.desc"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="submitForm('ruleForm')">保存</el-button>
                <el-button size="small" @click="resetForm('ruleForm')">返回</el-button>
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
            ownerNum: '',
            startDate: '',
            endDate: '',
            desc: ''
          },
          rules: {
            name: [
              { required: false, message: '请输入活动名称', trigger: 'blur' }
            ],
            ownerNum: [
              { required: true, message: '请输入委员会人数', trigger: 'blur' }
            ],
            startDate: [
              { type: 'date', required: false, message: '请选择成立日期', trigger: 'change' }
            ],
            endDate: [
              { type: 'date', required: false, message: '请选择到期日期', trigger: 'change' }
            ],
            desc: [
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
