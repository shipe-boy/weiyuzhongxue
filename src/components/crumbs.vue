<!-- 面包屑 -->
<template>
<div>
    <span style="margin-right: 5px;font-size: 14px;">当前位置:</span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item 
            v-for="(item, index) in arr" 
            :key="index" 
            :to="item.path"
            >{{item.name}}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="crumbsArr.length > 0">{{crumbsArr[crumbsArr.length - 1].name}}</el-breadcrumb-item>
    </el-breadcrumb>
</div>
  
</template>

<script>
import {TYPETABLE} from '../globalSet/global.js'
export default {
  data() {
    return {
        typeTable: TYPETABLE,
        crumbsArr: [],
        typesList: []
    };
  },
  watch:{
      $route(){
          this.getCrumbs()
      }
  },
  computed:{
      arr(){
        //   if(this.crumbsArr.length > 0){
              let arr = this.crumbsArr.slice(0, this.crumbsArr.length - 1)
            // console.log(arr)
            return arr
        //   }
          
      }
  },
  methods: {
    getCrumbs(){
        let id = this.$route.query.type
        let detailsId = this.$route.query.id
        let show = this.$route.query.show
        let path = this.$route.path
        let i = this.typeTable.findIndex((item) => {
            return item.link === path
        })
        let type = this.typeTable[i].type
        // console.log(id, detailsId,type)
        let obj ={
            name: '首页',
            path: '/'
        }
        let obj1 ={
            name: type,
            path: path
        }
        if(path == '/schoolNews'){
            obj1 ={
                name: type,
                path: path+"?type=1"
            }
        }
        if(path === '/survey'){
            obj1 ={
                name: type,
                path: path+"?type=1"
            }
        }
        this.crumbsArr.splice(0,1,obj)
        this.crumbsArr.splice(1,1,obj1)
        // console.log(this.crumbsArr)
        if(id){
            this.getTypes()
        }
        if(show){
            if(path == '/schoolLife' && id == 5){
                this.getTwoTypes('WeiyuStarClass')
            }
            if(path === '/teaching' && id==7){
                this.getTwoTypes('TeachingResearchClass')
            }
            if(path === '/survey' && id==4){
                this.getTwoTypes('HonourClass')
            }
            // this.crumbsArr.splice(3,1,{name: '正文', path:''})
        }
        if(detailsId){
            if(show){
                this.crumbsArr.splice(4,1,{name: '正文', path:''})
            }else{
                this.crumbsArr.splice(3,1,{name: '正文', path:''})
            }
        }
    },
    getTypes() {
        let id = this.$route.query.type;
        let path = this.$route.path
        let show = this.$route.query.show
        let i = this.typeTable.findIndex((item) => {
            return item.link === path
        })

        let table = this.typeTable[i].typeTable
        let listTable = this.typeTable[i].listTable
        let data = {
            Action: "SearchAllEnabled",
            PageControl: {
            PageSize: 0,
            PageIndex: 1,
            OrderBy: "DisplayIndex DESC, ID DESC"
            }
        };
        data.Resource = table

        if(path === '/survey'){   //学校概况
            this.typesList = this.typeTable[i].types
            this.crumbsArr.splice(2,1,{name: this.typeTable[i].types[id-1].Name,path: path +"?type="+id})
            
            this.crumbsArr = this.crumbsArr.slice(0, 3)
            // return
        }else if(path === '/schoolNews'){
            this.typesList = this.typeTable[i].types
            this.crumbsArr.splice(2,1,{name: this.typeTable[i].types[id-1].Name,path: path +"?type="+id})
            // return
        }else{
        this.$.post("/api/Table/TableAction", data)
            .then(res => {
              this.typesList = JSON.parse(res.data).Rows;
              return this.typesList
            }).then((type)=>{
                let i = type.findIndex((item)=>{
                    return item.ID == id
                })
                // console.log(i)
                // 位育之星
                if(path === '/schoolLife' && id==5){
                    this.crumbsArr.splice(2,1,{name: '位育之星',path: path +"?type="+id})
                    if(!show){
                        this.crumbsArr = this.crumbsArr.slice(0, 3)
                    }
                    return
                }
                //教研组
                if(path === '/teaching' && id==7){
                    this.crumbsArr.splice(2,1,{name: '教研组建设',path: path +"?type="+id})
                    if(!show){
                        this.crumbsArr = this.crumbsArr.slice(0, 3)
                    }
                    return
                }
                //文明小博客
                if(path === '/party' && id==111){
                    this.crumbsArr.splice(2,1,{name: '做一个有道德的人',path: path +"?type="+id})
                    return
                }
                this.crumbsArr.splice(2,1,{name: type[i].Name, path: path +"?type="+id})
            })
            .catch(err => {
              console.log(err);
            });
      }
    },
    getTwoTypes(table) {
        let show = this.$route.query.show;
        let path = this.$route.path
        let id = this.$route.query.type
        // let i = this.typeTable.findIndex((item) => {
        //     return item.link === path
        // })

        // let table = this.typeTable[i].typeTable
        // let listTable = this.typeTable[i].listTable
        let data = {
            Action: "SearchAllEnabled",
            PageControl: {
            PageSize: 0,
            PageIndex: 1,
            OrderBy: "DisplayIndex DESC, ID DESC"
            }
        };
        data.Resource = table

        this.$.post("/api/Table/TableAction", data)
            .then(res => {
              this.typesList = JSON.parse(res.data).Rows;
              return this.typesList
            }).then((type)=>{
                // console.log(type)
                let i = type.findIndex((item)=>{
                    return item.ID == show
                })
                // console.log(i)
                // 位育之星
                // console.log(path, id, show)
                if(path === '/schoolLife' && id==5 && show){
                    // console.log(111)                    
                    this.crumbsArr.splice(3,1,{name: type[i].Name,path: path +"?type="+id + "&show=" +show})
                    return
                }
                if(path === '/teaching' && id==7 && show){
                    this.crumbsArr.splice(3,1,{name: type[i].Name,path: path +"?type="+id + "&show=" +show})
                    return
                }
                if(path === '/survey' && id==4 && show){
                    this.crumbsArr.splice(3,1,{name: type[i].Name,path: path +"?type="+id + "&show=" +show})
                    return
                }
                // this.crumbsArr.splice(3,1,{name: type[i].Name, path: path +"?type="+id})
            })
            .catch(err => {
              console.log(err);
            });
      
    }
  },
  mounted(){
      this.getCrumbs()
  }
};
</script>
<style scoped>
.el-breadcrumb{
    display: inline-block;
    vertical-align: middle;
}

</style>