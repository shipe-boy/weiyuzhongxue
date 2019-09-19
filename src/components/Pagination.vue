<!-- 分页 -->
<template>
  <div v-if="total > pageSize">
        <el-pagination
        background
        layout="slot"
        :total="total"
        :page-size="pageSize">
        <div class="slot first-pager" @click="jumpPage('1')">首页</div>
        </el-pagination>
        <el-pagination
        background
        layout="prev, pager, next, slot"
        :total="total"
        :page-size="pageSize"
        :current-page="page"
        @current-change="clickPage"
        >
        <div class="slot last-pager" @click="jumpPage('0')">末页</div>
        </el-pagination>
  </div>
</template>

<script>
import {PAGESIZE} from '../globalSet/global'
export default {
    props:{
        total: {
            type: Number,
            default: 1
        },
        page: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number, 
            default: PAGESIZE
        }
    },
  data () {
    return {
    }
  },
  watch:{
      page (newVal){
          return newVal
      }
  },
  methods:{
       jumpPage(val){
          switch(val){
              case "1"://跳转到首页
                    this.$emit('currentPage', 1)
                    break;
              case "0"://跳转到末页
                    this.$emit('currentPage', Math.ceil(this.total/this.pageSize));
                    break;
            }
      },
      clickPage(i){
            this.$emit('currentPage', i)
      },
      prevPage(){
          this.$emit('currentPage', i)
      },
      nextPage(){
          this.$emit('currentPage', i)
      }
  }
}

</script>
<style scoped>
.slot{
    vertical-align: top;
    margin: 0;
    display: inline-block;
    background: #FFF;
    padding: 0 4px;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
}
.slot:hover{
    /* background: #298254; */
    color: #298254;
}
.last-pager{
    margin-left: 13px;
}
</style>