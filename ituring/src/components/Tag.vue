<template>
  <div class="tag">
    <ul>
      <li>
        <a href="1">标签1</a>
      </li>
      <li>
        <a href="1">标签2</a>
      </li>
      <li>
        <a href="1">标签3</a>
      </li>
      <li>
        <a href="1">标签4</a>
      </li>
      <li>
        <a href="1">标签5</a>
      </li>
      <li>
        <a href="1">标签6</a>
      </li>
      <li>
        <a href="1">标签7</a>
      </li>
      <li>
        <a href="1">标签8</a>
      </li>
      <li>
        <a href="1">标签9</a>
      </li>
      <li>
        <a href="1">标签10</a>
      </li>
      <li>
        <a href="1">标签11</a>
      </li>
      <li>
        <a href="1">标签12</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {}
};
</script>

<style scoped>
.tag {
  width: 1140px;
  margin: 90px auto 30px;
  min-height: 60px;
}
.tag li {
  font-size: 16px;
  line-height: 22px;
  padding: 5px 28px 4px 14px;
  margin: 8px 14px 8px 0;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #fcf8e3;
  color: #a07023;
  border: 1px solid #fbcc66;
  border-bottom-width: 2px;
  border-right-width: 2px;
  position: relative;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  display: inline-block;
}
.tag li::after {
  content: " ";
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  right: 10px;
  top: 12px;
  border: 1px solid #fbcc66;
  border-top-width: 2px;
  border-left-width: 2px;
}

.tag li a {
  color: #3e6d8e;
  transition: all, 0.25s, ease;
}
.tag li a:hover {
  color: #e71;
  text-decoration: none;
}
</style>
