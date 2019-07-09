<template>
  <el-row class="addOrEditM">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-col :span="6">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号码" prop="telephone">
        <el-col :span="6">
          <el-input v-model="ruleForm.telephone" placeholder="请输入手机号码"></el-input>
        </el-col>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">添加</el-button>
        <el-button size="small" @click="rePrev()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
  export default{
    data(){
      return {
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ]
        }
      }
    },
    props:{
      ruleForm:{
        type:Object,
        default:{
          name: '',
          telephone: ''
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
      rePrev() {
        this.$emit("rePrev");
      }
    }
  }
</script>

<style>
</style>
