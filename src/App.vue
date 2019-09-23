<template>
  <div id="app">
    <header-nav></header-nav>
    
    <!-- <keep-alive> -->
    <router-view/>
    <!-- </keep-alive> -->
    
    <footer-nav></footer-nav>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /*初始化  */
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
  body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
  h1, h2, h3, h4, h5, h6{ font-size:100%; }
  address, cite, dfn, em, var { font-style:normal; }
  code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
  small{ font-size:12px; }
  ul, ol { list-style:none; }
  a { text-decoration:none; }
  a:hover { text-decoration:underline; }
  sup { vertical-align:text-top; }
  sub{ vertical-align:text-bottom; }
  legend { color:#000; }
  fieldset, img { border:0; }
  button, input, select, textarea { font-size:100%; }
  table { border-collapse:collapse; border-spacing:0; }

  body{
    background: #fff;
  }

  /*省略号*/
  .el1{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  /* 轮播 */
  .swiper-pagination-bullet-active{
    background: #FFCE67 !important;
  }
  .swiper-pagination-bullet{
    background: transparent;
    border: 2px solid #FFCE67;
  }
  .swiper-slide{
    cursor: pointer !important;
  }

  /* 分页样式 */
  .page{
    padding: 20px 0;
    text-align: center;
  }
  .el-pagination{
    display: inline-block;
    text-align: center;
    color: #000;
  }
  .el-pagination.is-background .el-pager li{
    background: #fff !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #298254 !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover{
    color: #298254 !important;
  }

/* 面包屑 */
.el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover{
    color: #298254 !important;
    cursor: pointer !important;
}
.el-breadcrumb__inner.is-link:hover, .el-breadcrumb__inner a:hover{
  color: #298254 !important;
  cursor: pointer !important;
}

/* 弹框 */
.el-dialog__title{
  position: relative;
  font-weight: 600;
}
.el-dialog__title::after{
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width:100%;
  height: 4px;
  background-color: #298254 !important;
  
}
.el-dialog--center .el-dialog__body{
  padding-top: 0;
}
.el-dialog__headerbtn{
  top:10px !important;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgb(255, 206, 103) !important;
}
.el-dialog__headerbtn .el-dialog__close{
  color: #fff!important;
}

.el-form-item__content,
.el-form-item__label-wrap,
.el-form-item{
  margin: 0 !important;
  padding-top: 6px !important;
}
.el-input__inner{
  background-color: rgb(245, 245, 245);
}
.el-form-item__content{
  text-align: center;
}
.el-button{
  background-color: rgb(245, 245, 245);
}
.el-button:hover{
  background-color: rgb(245, 245, 245);
  color: #333;
}
.el-button--primary{
  background-color: #298254 !important;;
  border-color: #298254!important;;
}
.el-button--primary:hover{
    background-color: #298254 !important;;
  border-color: #298254!important;;
  color: #fff!important;;
}
</style>
