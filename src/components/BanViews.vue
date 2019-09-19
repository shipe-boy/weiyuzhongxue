<!--  -->
<template>
  <div class="ban">
      <img :src="data.ImagePath" alt="" width="100%" height="100%">
      <!-- <h2 class="title">{{title}}</h2> -->
  </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default(){
                return {}
            }
        },
        title: {
            type: String,
            default: ""
        }
    },
  data () {
    return {
    }
  }
}

</script>
<style scoped>
.ban {
  position: relative;
  height: 300px;
}
.ban img{
    display: block;
    min-width: 1200px;
    height: 100%;
}
.ban .title{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 30px;
}
</style>