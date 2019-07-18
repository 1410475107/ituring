<template>
 <ul class="block-items">
     <BookSum v-for="bs in booklist" :bs="bs" :key="bs.bid" />
    </ul>
</template>

<script>
import BookSum from '@/components/BookSum'
export default {
    data() {
        return {
           booklist:[] 
        }
    },
  name: "Tag",
  components:{
      BookSum
  },
  props: {},
  created() {
      this.axios.get('/booklist')
      .then(res => {
          console.log(res);
          this.booklist = res.data;
      })
      .catch(err => {
          console.error(err); 
      })
  },
};
</script>

<style scoped>
.block-items{
  width: 1140px;
  margin: 0 auto;
  /* background-color: #f08; */
}

</style>
