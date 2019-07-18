<template>
  <header>
    <div class="center">
      <ul>
        <li class="first"></li>
        <li>
          <a href="/book">图书</a>
        </li>
        <li>
          <a href="1">文章</a>
        </li>
        <li>
          <input type="search" name="q" placeholder="技术改变世界 阅读塑造人生" class="key" />
        </li>
      </ul>
      <ul>
          <li><a href="1">新用户注册</a></li>
          <li><a href="1">登录</a></li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "MyHeader",
  props: {}
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 60px;
  background: #3b5998;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  border-bottom: 0.5px solid #344e86;
}
.center {
  width: 1140px;
  height: 100%;
  margin: 0 auto;
  line-height: 60px;
}
/* //  0,0,1,2 */
.center li {
  display: inline-block;
}
.center .first {
  background: url(../assets/itr-logo.png) no-repeat 0 0;
  background-size: 160px 40px;
  width: 160px;
  height: 40px;
  vertical-align: middle;
  margin-right: 15px;
}

.center li a {
  display: inline-block;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #fff;
}
.center li a:hover {
  background-color: #344e86;
  text-decoration: none;
}

.center .key {
  width: 250px;
  height: 34px;
  padding: 1px 34px 0 12px;
  border: none;
  background: #cbd9f5;
  border-radius: 4px;
  font-size: 16px;
  padding-top: 0;
  outline: none ;
}
.center .key:focus {
    background: #fff;
}

.center ul:first-child{
    float: left;
}
.center ul:last-child{
    float: right;
}
.center ul:last-child li{
    margin-left: 20px;
}
.center ul:last-child a{
    background: #4469b5;
    height: 34px;
    line-height: 34px;
    box-shadow: 0 0 1px 0 rgba(0,0,0,.5), inset 0 1px 1px 0 rgba(255,255,255,.2);
    border-radius: 4px;
}
</style>
