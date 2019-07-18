<template>
  <div class="container">
    <my-header />
    <tag />

    <div class="title">
      <h1>图书列表</h1>
    </div>
    <BookList />
  </div>
</template>

<script>
import BookList from '@/components/BookList'
export default {
  name: "home",
  components: {BookList}
};
</script>

<style scoped>
.title {
  width: 1140px;
  margin: 0 auto;
  border-bottom: 1px solid #a5a5a5;
}
h1 {
  font-size: 22px;
  line-height: 1.4;
  margin: 0;
  padding: 0;
  font-weight: 700;
  min-height: 40px;
  color: #333;
}

</style>

