<template>
  <div class="account">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户中心</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="section-content">
      <el-main class="content-wrapper">
        <el-row>
          <el-col :span="24">
            <el-form
              :label-position="labelPosition"
              label-width="120px"
              :model="userInfo"
              style="width:486px;"
            >
              <el-form-item label="头像：">
                <div class="info-wrap">
                  <div class="ava-wrap">
                    <img class="ava" src="../../assets/img/user.jpg" alt>
                  </div>
                  <span class="edit" @click="editAva">编辑</span>
                </div>
              </el-form-item>
              <el-form-item label="姓名：">
                <div class="info-wrap" v-show="infoFlag.nameFlag==1">
                  <p class="userInfo-wrap">王明杰</p>
                  <span class="edit" @click="nameEdi">编辑</span>
                </div>
                <el-input
                  v-show="infoFlag.nameFlag==0"
                  v-model="userInfo.name"
                  style="width:250px;padding-left:14px;"
                ></el-input>
                <span class="save-btn" @click="saveInfo('name')" v-if="infoFlag.nameFlag==0">保存</span>
              </el-form-item>
              <el-form-item label="手机号：">
                <div class="info-wrap" v-show="infoFlag.telFlag==1">
                  <p class="userInfo-wrap">13585255566</p>
                  <span class="edit" @click="telEdi" v-if="infoFlag.telFlag==1">编辑</span>
                </div>
                <el-input
                  v-show="infoFlag.telFlag==0"
                  v-model="userInfo.tel"
                  style="width:250px;padding-left:14px;"
                ></el-input>
                <span class="save-btn" @click="saveInfo('tel')" v-if="infoFlag.telFlag==0">保存</span>
              </el-form-item>
              <el-form-item label="登录密码：">
                <div class="info-wrap">
                  <p class="userInfo-wrap">******</p>
                  <span class="edit" @click="dialog.passDialog = true">编辑</span>
                </div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
    </section>
    <!-- 修改头像对话框 -->
    <el-dialog title="修改头像" :visible.sync="dialog.avaDialog" width="440px">
      <div class="cut_pic">
        <div class="cut">
          <vue-cropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
          ></vue-cropper>
        </div>
        <div class="preview">
          <img :src="preview" alt>
        </div>
      </div>
      <div class="select_img">
        <div class="select_input">
          <el-button type="primary" size="mini">上传</el-button>
          <input class="select_input_input" type="file" @change="changeFile" accept="image/*">
          <el-button class="select_img_btn_yl" size="mini" @click="stop">预览</el-button>
        </div>
      </div>
      <div class="upload_pic">
        <p>(支持200KB以下JPG，PNG格式的图片)</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.avaDialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog.avaDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="dialog.passDialog"
      width="25%"
      :modal-append-to-body="false"
    >
      <el-form
        :model="form"
        label-position="right"
        label-width="80px"
        size="small"
        ref="form"
        :rules="rules"
      >
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="form.oldPass" placeholder="输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="form.newPass" placeholder="输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePass">
          <el-input type="password" v-model="form.rePass" placeholder="输入确认密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="dialog.passDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="changePass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VueCropper from "vue-cropper";
export default {
  data() {
    let validateOldPass = (rules, value, callback) => {
      if (value == "") {
        callback(new Error("请输入旧密码"));
      } else if (value.length < 6) {
        callback(new Error("密码最少6位数"));
      } else {
        callback();
      }
    };
    let validateNewPass = (rules, value, callback) => {
      if (value == "") {
        callback(new Error("请输入新密码"));
      } else if (value.length < 6) {
        callback(new Error("密码最少6位数"));
      } else {
        if (this.form.rePass != "") {
          this.$refs.form.validateField("rePass");
        }
        callback();
      }
    };
    let validateRepass = (rules, value, callback) => {
      if (value == "") {
        callback(new Error("请输入新密码"));
      } else if (value != this.form.newPass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        name: "王明杰",
        tel: "15235252525",
        possword: "123545"
      },
      labelPosition: "right",
      infoFlag: {
        nameFlag: 1,
        telFlag: 1
      },
      dialog: {
        avaDialog: false,
        passDialog: false
      },
      // 修改头像
      option: {
        img: "",
        size: 1,
        full: false,
        outputType: "png",
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: false
      },
      preview: "",
      form: {
        oldPass: "",
        newPass: "",
        rePass: ""
      },
      rules: {
        oldPass: [{ validator: validateOldPass, trigger: "blur" }],
        newPass: [{ validator: validateNewPass, trigger: "blur" }],
        rePass: [{ validator: validateRepass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 点击修改头像编辑
    editAva() {
      this.dialog.avaDialog = true;
    },
    // 头像上传
    changeFile(e) {
      let _this = this;
      let event = window.event || e;
      let file = event.target.files[0];
      if (file != undefined) {
        if (file.size > 200 * 1024) {
          alertMsg("上传的图片过大");
          return false;
        }
        let fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onloadend = function(e) {
          _this.option.img = e.target.result;
        };
        _this.preview = "";
        _this.start();
      } else {
        return false;
      }
    },
    start() {
      this.$refs.cropper.startCrop();
    },
    stop() {
      this.$refs.cropper.stopCrop();
      this.crop();
    },
    clear() {
      this.$refs.cropper.clearCrop();
    },
    crop() {
      let _this = this;
      _this.$refs.cropper.getCropData(data => {
        _this.preview = data;
      });
    },
    save() {
      let _this = this;
      let url = "/student/uploadImg";
      let p = {};

      if (_this.preview == "") {
        console.log("没预览");

        _this.stop();
      }
      setTimeout(function() {
        p.headImg = _this.preview;

        _this.$httpWeb.fetch(url, p).then(res => {
          console.log(res);
          // _this.uploadImg(res.data.url);
        });
      }, 100);
    },
    nameEdi() {
      this.infoFlag.nameFlag = 0;
    },
    telEdi() {
      this.infoFlag.telFlag = 0;
    },
    saveInfo(_type) {
      if (_type == "name") {
        this.infoFlag.nameFlag = 1;
      }
      if (_type == "tel") {
        this.infoFlag.telFlag = 1;
      }
    },
    changePass(){
      console.log('changePass');
    }
  },
  components: {
    VueCropper
  },
  mounted() {}
};
</script>

<style scoped>

.el-form-item__content p {
  margin-left: 28px;
}
.ava {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.ava-wrap {
  height: 40px;
  margin-left: 28px;
  width: 250px;
}
.userInfo-wrap {
  /* border: 1px solid red; */
  width: 250px;
}
.info-wrap {
  display: flex;
}
.edit {
  color: #1e88e5;
}
.edit:hover {
  cursor: pointer;
}
.cut {
  width: 250px;
  height: 250px;
}
.cut_pic {
  display: flex;
}
.cut_pic img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: 30px;
}
.select_img {
  margin-top: 16px;
}
.upload_pic {
  margin-top: 16px;
}
.select_input_input {
  position: absolute;
  width: 80px;
  left: -12px;
  top: 0px;
  z-index: 2;
  height: 42px;
  -webkit-transform: scale(0.7);
  transform: scale(0.7);
  opacity: 0;
  cursor: pointer;
}
.select_input {
  position: relative;
}
.save-btn:hover {
  cursor: pointer;
}
.save-btn {
  margin-left: 10px;
  color: #1e88e5;
}
</style>

