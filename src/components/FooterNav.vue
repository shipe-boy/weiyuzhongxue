<!--  -->
<template>
  <div class="footer">
      <div class="top">
            <div class="logo-msg">
                <div class="logo"></div>
                <p class="content">地址：上海市复兴中路1261号&nbsp;&nbsp;|&nbsp;&nbsp;电话：021-64312973&nbsp;&nbsp;|&nbsp;&nbsp;邮编：200031</p> 
            </div>
            <div class="more">
              <div class="we-chat"></div>
              <div class="cause"></div>
            </div>
        </div>
      <p class="bottom">
          版权所有：上海市位育初级中学&nbsp;&nbsp;|&nbsp;&nbsp;<i class="icon"></i> <a href="http://www.miibeian.gov.cn/"  target="_blank">备案序号：沪ICP备05031770号</a> &nbsp;&nbsp;|&nbsp;&nbsp; <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402000565"  target="_blank">沪公网安备 31010402000565号</a> 
      </p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.footer {
  background: #F7F9F8;
  border-top: 1px solid #FFCE67;
}
.top {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  height: 177px;
  padding: 20px 0;
  margin: 0 auto;
  color: #333;
}
.top .logo-msg {
  width: 450px;
  height: 100%;
}
.top .logo-msg .logo {
  height: 85px;
  background: url("../../static/images/logo-ft.png") no-repeat;
}
.top .logo-msg .content{
    font-size: 12px;
    text-align: right;
}
.top .more{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 100%;
}
.top .more .we-chat{
  width: 180px;
  height: 80px;
  background: url("../../static/images/wechat.png") no-repeat;
}
.top .more .cause{
  width: 90px;
  height: 95px;
  background: url("../../static/images/img.png") no-repeat;
}
.bottom {
  height: 60px;
  background: rgb(41, 130, 84);
  text-align: center;
  line-height: 60px;
  color: #fff;
  font-size: 14px;
}
.bottom .icon{
  display: inline-block;
  width: 18px;
  height: 20px;
  background: url("../../static/images/img-ft.png") no-repeat;
  vertical-align: middle;
}
.bottom a{
  color: #fff;
}
</style>