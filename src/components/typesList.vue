<!-- 分类列表 -->
<template>
    <div class="left">
        <div class="title">
        <h3>{{title}}</h3>
        </div>
        <ul class="list">
        <li 
            v-show="typesList.length > 0"
            :class="{'active': currentIndex === index}" 
            v-for="(item, index) in typesList" 
            :key="index"
            @click="currentTypes(item)"
            >
              {{item.Name}}
            </li>
        </ul>
    </div>
</template>

<script>
import {TYPETABLE} from '../globalSet/global.js'

export default {
  data () {
    return {
        typeTable: TYPETABLE,
        typesList: [], 
        index : -1
    }
  },
  computed: {
    title(){
      let path = this.$route.path
      let i = this.typeTable.findIndex((item) => {
        return item.link === path
      })
      
      return this.typeTable[i].type
    },
    currentIndex(){
      let id = this.$route.query.type
      let index = this.typesList.findIndex((item) => {
        return item.ID == id
      })
      // console.log(this.typesList[index])
      let title = index == -1 ? this.title : this.typesList[index].Name
      this.$emit('title', title)

      return index
    }
  },
  methods:{
    currentTypes(item){
      this.$emit('handleClick', item)
      let path = this.$route.path
      // if(path == '/teaching')
      // console.log(this.$route.path, item.ID)
      this.$router.push({
        path: path,
        query: {
          type: item.ID
        }
      })
    },
    getTypes() {
      let type = this.$route.query.type;
      let path = this.$route.path
      // console.log(this.$route.path.split('/'), type)
      let i = this.typeTable.findIndex((item) => {
        return item.link === path
      })
      // console.log(this.typeTable[i].typeTable)
      let table = this.typeTable[i].typeTable
      if(!type){  //无选中类型
        this.index = -1;
      }
      let data = {
        Action: "SearchAllEnabled",
        // Resource: "PartyBuildingClass",
        PageControl: {
          PageSize: 0,
          PageIndex: 1,
          OrderBy: "DisplayIndex DESC, ID DESC"
        }
      };
      data.Resource = table
      if(path === '/survey'){   //学校概况
          this.typesList = this.typeTable[i].types
      }else if(path === '/schoolNews'){
        // console.log(this.typeTable[i].types)
          this.typesList = this.typeTable[i].types
      }else{
        this.$.post("/api/Table/TableAction", data)
            .then(res => {
              this.typesList = JSON.parse(res.data).Rows;
              if(path === '/schoolLife'){
                this.typesList.push({Name: '位育之星', ID: 5})
              }
              if(path === '/teaching'){
                this.typesList.push({Name: '教研组建设', ID: 7})
              }
            })
            .catch(err => {
              console.log(err);
            });
      }
    }
  },
  mounted(){
    this.getTypes()
  }
}

</script>
<style scoped>
.left{
  float: left;
  position: relative;
  width: 190px;
  height: 1090px;
  
}
.left .title{
  position: absolute;
  top: -20px;
  width: 200px;
  height: 130px;
  background-color: #298254;
  background-image: url('../../static/images/survey-logo.png');
  background-position: 10px 10px;
  background-repeat: no-repeat;
}
.title::before,
.title::after{
  content: '';
  display: inline-block;
  position: absolute;
  border: 15px solid transparent;
  transform: rotate(-135deg);
}
.title::before{
  bottom: -15px;
  left: -15px;
  border-bottom-color: #fff;
}
.title::after{
  top: 6px;
  right: -15px;
  border-bottom-color: #298254;
}
.title h3{
  position: absolute;
  bottom: 35px;
  right: 25px;
  color: #fff;
  font-weight:600;
  font-size: 30px;
  line-height:24px;
}
/* 列表 */
.left .list{
  box-sizing: border-box;
  height: 100%;
  padding: 100px 30px 0 20px;
  background-color: #fff;
  margin: 30px 0 10px 10px;
  text-align: right;
}
.left .list li{
  position: relative;
  padding: 10px 0;
  margin: 5px 0;
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;
}
.left .list li a{
    color: #333;
}
.left .list li a:hover{
    text-decoration: none;
}
.left .list li.active::after{
  content: '';
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  width:70px;
  height:2px;
  background:rgba(41,130,84,1);
}
.left .list li.active{
  color: rgba(41,130,84,1);
}
</style>