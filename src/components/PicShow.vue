<!--  -->
<template>
    <div :class="['pic-show', {'show-all': showAll}]">
      <ul class="list">
        <li :class="['item', {'hei': isDesc}]" v-for="(item, index) in listData" :key="index" @click="picDetails(item)">
          <div class="pic">
            <img :src="item.ImagePath" alt="" width="100%">
          </div>
          <p v-if="item && item.Name">{{item.Name}}</p>
          <p v-if="isDesc" class="desc" v-html="item.Content"></p>
        </li>
      </ul>
    </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      default(){
        return []
      }
    },
    showAll: {
      type: Boolean,
      default: false
    },
    isDesc:{
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    listData(){  //处理后的列表
        let arr = []
        if(this.showAll){
            arr = this.data;
        }else{
            arr = this.data.slice(0,5)
        }
        return arr
    }
  },
  methods: {
    picDetails(item){
      this.$emit('picDetails')
      // this.$router.push({
      //   path:this.$route.path,
      //   query: {
      //     type: this.$route.query.type,
      //     id: item.ID
      //   }
      // })
      const {href} = this.$router.resolve({
            path: this.$route.path,
            query: {
              type: this.$route.query.type,
              id: item.ID
            }
        });
        // console.log('+++++',href)
        window.open(href, '_blank');
      
      
    }
  }
}

</script>
<style scoped>
.pic-show{
  color: #333;
}
.show-all{
  min-height: 940px;
}
.pic-show .list{
  display: flex;
  flex-wrap: wrap;
  justify-content:flex-start
}
.pic-show .list .item{
  box-sizing: border-box;
  width: 164px;
  height: 267px;
  margin: 12px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, .1);
  cursor: pointer; 
}
.pic-show .list .item.hei{
  height: auto;
}
.pic-show .list .item .pic{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 216px;
  width:100%;
}
.pic-show .list .item p{
  /* height: 30px; */
  /* line-height: 30px; */
  text-align: center;
  font-size: 12px;
}
</style>