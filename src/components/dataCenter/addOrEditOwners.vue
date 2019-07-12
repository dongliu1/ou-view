<template>
  <el-row class="addOrEdit">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

      <el-form-item label="选择房号" prop="house">
        <el-select v-model="ruleForm.house" placeholder="请选择房号">
          <el-option label="1栋1单元1001" value="1001"></el-option>
          <el-option label="1栋1单元1002" value="1002"></el-option>
          <el-option label="1栋1单元1003" value="1003"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号" prop="cardNum">
        <el-col :span="3">
          <el-input v-model="ruleForm.cardNum" placeholder="请输入证件号"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="业主姓名" prop="name">
        <el-col :span="6">
          <el-input v-model="ruleForm.name" placeholder="请输入业主姓名"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="联系方式" prop="telephone">
        <el-col :span="3">
          <el-input v-model="ruleForm.telephone" placeholder="请输入联系方式"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号码" prop="idNum">
        <el-col :span="3">
          <el-input v-model="ruleForm.idNum" placeholder="请输入身份证号码"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="身份证照片">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </el-form-item>
      <el-form-item label="使用情况" prop="useType">
        <el-select v-model="ruleForm.useType" placeholder="请选择房屋使用情况">
          <el-option label="自用" value="1"></el-option>
          <el-option label="租用" value="2"></el-option>
          <el-option label="空置" value="3"></el-option>
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
        imageUrl: '',
        houseTypes:["自用","租用","空置"],
        rules: {
          house: [
            { required: true, message: '请输入栋号', trigger: 'blur' }
          ],
          name:[
            { required: true, message: '请选择单元', trigger: 'change' },
          ],
          sex:[
            { required: true, message: '请选择单元', trigger: 'change' },
          ],
          telephone:[
            { required: true, message: '请选择单元', trigger: 'change' },
          ],
          cardNum:[
            { required: true, message: '请选择单元', trigger: 'change' },
          ],
          idNum:[
            { required: true, message: '请选择单元', trigger: 'change' },
          ],
          useType: [
            {  required: true, message: '请输入房号', trigger: 'change' }
          ]
        }
      }
    },
    props:{
      ruleForm:{
        type:Object,
        default:{
          house: '',
          name:'',
          sex:'',
          telephone:'',
          cardNum:'',
          idNum:'',
          useType: ''
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
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
