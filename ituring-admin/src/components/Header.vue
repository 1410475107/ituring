<template>
  <header>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">欢迎你，{{name}}</el-menu-item>
    </el-menu>
  </header>

  
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      name: "游客"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    this.axios
      .get("/check")
      .then(res => {
        console.log(res);
        // 如果没有登录信息，应该回到登录页面
        if (!res.data.aid) {
          this.$router.push("/login");
          return;
        }
        this.name = res.data.name;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style scoped>
  
</style>
<style>
@import '../assets/css/common.css';
.el-menu.el-menu--horizontal {
    border-bottom: 0;
}
</style>
