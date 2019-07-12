<template>
  <el-row class="addOrEdit">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="栋" prop="building">
        <el-col :span="3">
          <el-input v-model="ruleForm.building" placeholder="请输入栋号">
            <template slot="append">栋</template>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="单元" prop="unit">
        <el-select v-model="ruleForm.unit" placeholder="请选择单元">
          <el-option label="1001" value="1001"></el-option>
          <el-option label="1002" value="1002"></el-option>
          <el-option label="1003" value="1003"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房号" prop="houseNum">
        <el-col :span="6">
          <el-input v-model="ruleForm.houseNum" placeholder="请输入房号"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="销售面积" prop="salesArea">
        <el-col :span="3">
          <el-input v-model="ruleForm.salesArea" placeholder="请输入销售面积">
            <template slot="append">㎡</template>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="实际面积" prop="actArea">
        <el-col :span="3">
          <el-input v-model="ruleForm.actArea" placeholder="请输入实际面积">
            <template slot="append">㎡</template>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="房屋类型" prop="houseType">
        <el-select v-model="ruleForm.houseType" placeholder="请选择房屋类型">
          <el-option label="商品房" value="1"></el-option>
          <el-option label="还建房" value="2"></el-option>
          <el-option label="经济适用房" value="3"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">添加</el-button>
        <el-button size="small" @click="rePrev">返回</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
  export default{
    data(){
      return {
        houseTypes:["商品房","还建房","经济适用房"],
        rules: {
          building: [
            { required: true, message: '请输入栋号', trigger: 'blur' }
          ],
          unit: [
            { required: true, message: '请选择单元', trigger: 'change' }
          ],
          houseNum: [
            {  required: true, message: '请输入房号', trigger: 'change' }
          ],
          salesArea: [
            { required: false, message: '请输入销售面积', trigger: 'change' }
          ],
          actArea: [
            { required: false, message: '请输入实际面积', trigger: 'change' }
          ],
          houseType: [
            { required: false, message: '请选择房屋类型', trigger: 'change' }
          ]
        }
      }
    },
    props:{
      ruleForm:{
        type:Object,
        default:{
          building: '',
          unit: '',
          houseNum: '',
          salesArea: '',
          actArea: '',
          houseType: ''
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
