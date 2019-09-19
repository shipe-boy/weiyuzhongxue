<!--  -->
<template>
  <swiper :options="swiperOption" ref="mySwiper" v-if="data.length">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in data" :key="index">
      <img :src="item.ImagePath" width="100%" height="100%"/>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination swp1"  slot="pagination"></div>
    
    <div class="swiper-button-prev swp1" slot="button-prev"></div>
    <div class="swiper-button-next swp1" slot="button-next"></div>
    
    
  </swiper>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination.swp1",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next.swp1",
          prevEl: ".swiper-button-prev.swp1"
        },
        observer:true,//修改swiper自己或子元素时，自动初始化swiper 
        observeParents:false,//修改swiper的父元素时，自动初始化swiper 
        onSlideChangeEnd: function(swiper){ 
        　　　swiper.update();  
        　　　swiper.startAutoplay();
        　　  swiper.reLoop();  
        }
      }
    }
  }
};
</script>
<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-pagination {
  width: 80% !important;
  margin: 0 auto;
  text-align: right;
}
.swiper-button-next.swp1,
.swiper-button-prev.swp1{
  width: 47px;
  height: 57px;
}
.swiper-button-prev.swp1{
  left: 10%;
  background: url('../../static/images/ban-ico-l.png') no-repeat center;
}
.swiper-button-next.swp1{
  left: 85%;
  background: url('../../static/images/ban-ico-r.png') no-repeat center;
}
.swiper-slide{
    cursor: default !important;
  }
</style>