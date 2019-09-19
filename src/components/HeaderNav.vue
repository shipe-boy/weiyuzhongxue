<template>
  <div class="header">
    <div class="top"></div>
    <div class="center">
      <div class="logo"></div>
      <div class="pic"></div>
    </div>
    <!--导航  -->
    <div class="nav">
      <ul>
        <li 
          class="item" 
          v-for="(item,index) in navTitle" 
          :key="index"
          @click="handelClick(index)"
          >{{item.name}}
          <!-- 隐藏层 -->
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
          
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {TYPETABLE} from '../globalSet/global.js'
export default {
  data() {
    return {
      typeTable: TYPETABLE,
      navTitle: [
        {id: 1, name: "首页" },
        {id: 2, name: '学校概况', types: []},
        {id: 3, name: '党建工作', types: []},
        {id: 4, name: '创全园地', types: [{Name: '位育之星', ID: 5}]},
        {id: 5, name: '教学管理', types: [{Name: '教研组建设', ID: 7}]},
        {id: 7, name: '教育科研', types: []},
        {id: 8, name: '教工之家', types: []},
        {id: 9, name: '健康促进', types: []},
        {id: 10, name: '学校特色', types: []}
      ],
      link: ['/', '/survey', '/party', '/schoolLife', '/teaching', '/educational', '/teacher', '/healthy', '/feature'] //路由跳转列表
    };
  },
  computed: {
    currentIndex(){
      return this.link.indexOf(this.$route.path) !== -1 ? this.link.indexOf(this.$route.path) : 0
    }
  },
  methods: {
    handelClick(index) {
      if(index == 0){
        this.$router.push('/')
      }
      if(this.currentIndex == index) return
      if(index == 1){   //学校概况
        // console.log(111)
        this.$router.push({path: this.link[index], query:{type:1}})
        return
      }
      // console.log(111)
      this.$router.push({path: this.link[index]})
    },
    linkType(type, item){
      // console.log(type, item)
      let i = this.navTitle.findIndex((i) => {
        return type.name == i.name
      })
      
      
      // console.log(i,this.link[i], item.ID)
      this.$router.push({path: this.link[i], query: {type: item.ID}})
      
    },
    getData(){  
        let data= {
          Action: "SearchBlurEnabled",   
          Resource: "AD",
          PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC, ID DESC" }
        }
        this.$.post("/api/Table/TableAction",
          data
        ).then((res)=>{
          let arr = JSON.parse(res.data).Rows
          // console.log(arr)
            for(let i = 0, len = arr.length; i < len; i++){
              let index = this.navTitle.findIndex((item) => {
                return arr[i].AdClassID == item.id
              })
              if(index > -1){
                this.navTitle[index].ImagePath = arr[i].Image2Path
                this.$set(this.navTitle, this.navTitle[index], this.navTitle[index])
              }
            }
          // console.log(this.navTitle)
        }).catch((err)=>{
          console.log(err)
        })
    },
    getTypes(i, table){ //请求分类
        let data = {
            Action: "SearchAllEnabled",
            PageControl: {
                PageSize: 0,
                PageIndex: 1,
                OrderBy: "DisplayIndex DESC, ID DESC"
            }
        };
        data.Resource = table
        // console.log(data)
        // console.log(i)
        this.$.post("/api/Table/TableAction", data)
            .then(res => {
                // console.log(JSON.parse(res.data).Rows)
              
                // this.navTitle[i].types.push(JSON.parse(res.data))
                this.navTitle[i].types = [...JSON.parse(res.data).Rows, ...this.navTitle[i].types]
                
                // console.log(this.navTitle)
            })
            .catch(err => {
                console.log(err);
            });
    },
    _getTypes(){
      for(let i = 0; i < this.typeTable.length; i++){
        if(i == 0){
          // this.navTitle[i+1].types.push(this.typeTable[i].types)
          this.navTitle[i+1].types = [...this.typeTable[i].types]
          continue
        }else{
          if(this.typeTable[i].typeTable){
            this.getTypes(i+1,this.typeTable[i].typeTable)
          }
          
        }
      }
    }
  },
  mounted(){
    this.getData()
    this._getTypes()
  }
};
/* 
2,学校概况banner
3,党建工作banner
4,创全园地banner
5,教学管理banner
7,教育科研banner
8,教工之家banner
9,健康促进banner
10,学校特色banner
 */
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  height: 12px;
  background: rgb(41, 130, 84);
}
.center {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  height: 120px;
  margin: 0 auto;
}
.center .logo {
  width: 364px;
  height: 78px;
  background: url("../../static/images/logo.png") no-repeat;
}
.center .pic {
  width: 483px;
  height: 120px;
  background: url("../../static/images/pic.png") no-repeat;
}
/*导航条  */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: rgb(41, 130, 84);
}
.nav ul {
  position: relative;
  display: flex;
  height: 60px;
  width: 1200px;
  margin: 0 auto;
  line-height: 60px;
  text-align: center;
}
.nav ul li.item {
  flex: 1;
  width: 150px;
  color: #fff;
  cursor: pointer;
}
.nav ul li.item:hover {
  background: rgb(73, 149, 111);
}
/* 二级导航 */
.nav ul li .hidden{
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
