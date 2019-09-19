<!--  -->
<template>
  <div class="hidden" v-show="item.types">
        <div class="left">
            <div class="content">
            <p class="title">{{item.name}}</p>
            <p class="desc">上海市位育初级中学即原位育中学（曾名五十一中学）系联合国教科文俱乐部学校之一（全市仅两所中学），是地
            处市中心的历史名校，1943年创办...
            </p>
            </div>
            <div class="type">
            <ul>
                <li v-for="(item1, index) in item.types" :key="index" @click.stop="linkType(item, item1)">
                <span class="dot"></span>
                {{item1.Name}}
                </li>
            </ul>
            </div>
        </div>
        <div class="right">
            <img :src="item.ImagePath" :alt="item.name" width="100%" height="100%">
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}

</script>
<style scoped>
.hidden{
  box-sizing: border-box;
  position: absolute;
  z-index: 10;
  left: 0;
  width: 1200px;
  height: 270px;
  padding: 20px 30px;
  background-color: #fff;
  color: #333;
  text-align: left;
}
.hidden .left{
  float: left;
  width: 700px;
  height: 100%;
}
.hidden .left .title{
  padding: 5px 0 25px;
  font-size:24px;
  font-weight:600;
  color:rgba(73,149,111,1);
  line-height:24px;
}
.hidden .left .desc{
  height: 50px;
  padding-bottom: 20px;
  border-bottom: 1px solid #FFCE67;
  font-size:14px;
  color:rgba(51,51,51,1);
  line-height:24px;
}
.hidden .left .type ul{
  display: block;
  height: 120px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0;
}
.hidden .left .type ul li{
  float: left;
  width: 170px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  text-align: left;
}
.hidden .left .type ul li .dot{
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 5px;
  background-color: #298254;
  vertical-align: middle;
}
.hidden .left .type ul li:hover{
  color: #298254;
  text-decoration: underline;
}
.hidden .right{
  float: left;
  width: 440px;
  height: 100%;
}
.hidden{
  display: none;
}
.nav ul li.item:hover>.hidden{
  display: block;
}
</style>