<template>
  <div class="container">
    <my-header />
    <tag />

    <div class="bookinfo">
      <h1>{{b.bookname}}</h1>
      <img :src="b.imgsrc" >
      <hr>
      <div class="desc">
          {{b.desc}}
      </div>
      <hr>
      <div class="typ" v-html="formatType(b.type)">
      </div>
      <hr>
      <div class="desc" v-html="b.info">
      </div>
    </div>
  </div>
</template>

<script>
import BookList from '@/components/BookList'
export default {
    data() {
        return {
            b:{}
        }
    },
  name: "home",
  components: {BookList},
  created() {
      this.axios.get('/bookinfo', {params:{
          bid:this.$route.query.bid
      }})
      .then(res => {
          console.log(res);
          this.b = res.data;
      })
      .catch(err => {
          console.error(err); 
      })
  },
//   filters:{
//       formatType(str){
//           return str.map((item, index) => `<span>${item}</span>`).join(' ');
//       }
//   }
    methods:{
      formatType(str){
          return str.map((item, index) => `<span>${item}</span>`).join(' ');
      }
  }

};
</script>

<style scoped>
.bookinfo {
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
.bookinfo  img{
    width: 127px;
    height: 138px;
}
</style>

