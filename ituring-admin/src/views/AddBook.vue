<template>
  <div class="main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/center' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍添加</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="书名">
        <el-col :span="8">
          <el-input v-model="form.bookname"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="作者">
        <el-col :span="8">
          <el-input v-model="form.writer"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="封面">
        <el-col :span="8">
          <el-upload
            class="avatar-uploader"
            action="http://lulaoshi:81/uploads/"
            :show-file-list="false"
            name="images"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-form-item>

      <el-form-item label="类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="上市销售" name="type"></el-checkbox>
          <el-checkbox label="在线阅读" name="type"></el-checkbox>
          <el-checkbox label="免费" name="type"></el-checkbox>
          <el-checkbox label="续集" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="书籍简介">
        <el-col :span="16">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addbook",
  data() {
    return {
      form: {
        bookname: "",
        writer: "",
        type: [],
        imageUrl: "",
        imgsrc: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    //   把数据提交给服务器
        this.axios.post('/addbook', this.form)
        .then(res => {
            console.log(res)
            if(res.data.r == 'ok'){
                this.$router.push('/book/list');
            }
        })
        .catch(err => {
            console.error(err); 
        })
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.form.imageUrl = URL.createObjectURL(file.raw);
      this.form.imgsrc = res.imgsrc;
    },
    beforeAvatarUpload(file) {
      //   const isJPG = file.type === "image/jpeg";
      //   const isLt2M = file.size / 1024 / 1024 < 2;

      //   if (!isJPG) {
      //     this.$message.error("上传头像图片只能是 JPG 格式!");
      //   }
      //   if (!isLt2M) {
      //     this.$message.error("上传头像图片大小不能超过 2MB!");
      //   }
      //   return isJPG && isLt2M;
      return true;
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
<style scoped>
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff;
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

