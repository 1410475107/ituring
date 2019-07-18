<template>
  <li class="block-item">
    <div class="book-img">
      <a :href="'/bookinfo?bid='+bs.bid" :title="bs.bookname">
        <img
          :src="bs.imgsrc"
          :alt="bs.bookname"
        />
      </a>
    </div>
    <div class="book-info">
      <h4 class="name">
        <a :href="'/bookinfo?bid='+bs.bid" :title="bs.bookname">{{bs.bookname}}</a>
      </h4>
      <div class="author">
        {{bs.writer}}
        
      </div>
      <p class="intro">{{bs.desc}}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: "Tag",
  props: ["bs"]
};
</script>

<style scoped>
.block-items>li {
  width: 230px;
    margin-top: 6px;
    display: inline-block;
    padding: 0 15px;
    text-align: center;
    vertical-align: top;
}
.block-items>li img{
  width: 116px;
  height: 170px;
}
.book-list .name, .block-books .name {
    display: block;
    margin-bottom: 1px;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.4;
}
.block-books li {
    font-size: 14px;
}
a {
    color: #3b5998;
    transition: all,.25s,ease;
}
.book-info .intro, .book-info .author {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 40px;
    line-height: 40px;
    text-align: left;
}
</style>
