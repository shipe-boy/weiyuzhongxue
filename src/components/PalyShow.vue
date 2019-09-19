<!-- 首页图片展示 -->
<template>
    <div class="banner-wrap">
        <div class="title-wrap">
            <span class="title">位育之星</span>
            <span class="desc"> —— 第二十一届大队委员</span>
        </div>
        <!-- 轮播 -->
        <div class="banner">
          <swiper :options="swiperOption3" ref="mySwiper3" v-if="data.length">
            <swiper-slide v-for="(item, index) in data" :key="index" @click.native="handleClick(item)">
                <img class="pic" :src="item.ImagePath" :alt="item.Name">
                <p class="name">{{item.Name}}</p>
            </swiper-slide>
            <div class="swiper-button-prev swp3" slot="button-prev"></div>
            <div class="swiper-button-next swp3" slot="button-next"></div>
          </swiper>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: []
        }
    },
  data() {
    return {
      swiperOption3: {
        slidesPerView: 4,
        spaceBetween: 40,
        // autoplay: {
        //   delay: 4000,
        //   disableOnInteraction: false
        // },
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next.swp3",
          prevEl: ".swiper-button-prev.swp3"
        },
        preventClicksPropagation : true,
        on: {
          click: function(){
            // console.log(this.realIndex)
            // this.handleClick()
          }
        }
      }
    };
  },
  computed:{
    swiper3() {
      return this.$refs.mySwiper3.swiper
    }
  },
  methods: {
    handleClick(item){
        // console.log(item) 
        const {href} = this.$router.resolve({
              path: '/schoolLife',
              query: {
                type: '5',
                id: item.ID
              }
          });
        window.open(href, '_blank');
                
    }
  },
  mounted(){
    // console.log(this.swiper3)
  }
};
</script>
<style scoped>
.banner-wrap {
  width: 1200px;
  height: 300px;
  margin: 15px auto;
}
.title-wrap {
  height: 35px;
  margin-bottom: 15px;
}
.title-wrap .title {
  position: relative;
  display: inline-block;
  height: 100%;
  color: #333;
  font-size: 24px;
  line-height: 24px;
  font-weight: 600;
}
.title::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  display: inline-block;
  width: 96px;
  height: 4px;
  background-color: #298254;
}
.title-wrap .desc {
  color: #298254;
  font-size: 12px;
}
.banner{
    width:1200px;
    height:242px;
}
.banner .pic{
  display: block;
  width:100%;
  height:200px !important;
}
.banner .name{
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}

.swiper-container{
  height: 100%;
}
.swiper-slide{
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #298254;
  cursor: pointer;
}
.swiper-button-prev.swp3{
  background: url('../../static/images/ban-star-l.png') no-repeat center;
}
.swiper-button-next.swp3{
  background: url('../../static/images/ban-star-r.png') no-repeat center;
}
.swiper-button-next.swp3,
.swiper-button-prev.swp3{
  width: 40px;
  height: 40px;
}

</style>