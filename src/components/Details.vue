<!--  -->
<template>
  <div>
    <h2 class="slot-title">{{listData.Name}}</h2>
    <div v-if="listData.ImagePath">
      <img class="pic" :src="listData.ImagePath" :alt="listData.Name">
    </div>
    <div class="slot-content" v-html="listData.Content"></div>
  </div>
</template>

<script>
import {TYPETABLE} from '../globalSet/global.js'
export default {
  data () {
    return {
      typeTable: TYPETABLE,
      listData: {}
    }
  },
  methods: {
    getTypes() {
        let id = this.$route.query.type   //类型id
        let detailsId = this.$route.query.id  //详情id
        let show = this.$route.query.show
        let path = this.$route.path
        let i = this.typeTable.findIndex((item) => {
            return item.link === path
        })

        let table = this.typeTable[i].typeTable   //类型表
        let listTable = this.typeTable[i].listTable //个体表
        if(path === '/schoolNews'){  //校园新闻
            // console.log(this.typeTable[i].types[id-1])         
          this.getTypeData('HomePage', detailsId, 1)
            return
        }
        if(path === '/teaching' && id == 7 && show){
          this.getTypeData('TeachingResearch', detailsId, 1)
          return
        }
        if(path === '/party' && id == 111){ //文明小博客
          this.getBlogs()
          return
        }
        // console.log(detailsId)
        this.getTypeData(listTable, detailsId, 1)
        
      
    },
    getTypeData(resource, id, size ){
        // console.log(resource,classId, id, size )
        let data= {
          Action: "SearchID",
          FieldNames: ['Name', 'ID', "Content", 'ImagePath'],    
          // Resource: "PartyBuilding",
          // DataJSONString: JSON.stringify({ classId: id })
        }
        data.Resource = resource
        data.DataJSONString = {}
        data.DataJSONString.ID = id
        data.DataJSONString = JSON.stringify(data.DataJSONString),
        // console.log(data)
        this.$.post("/api/Table/TableAction",
          data
        ).then((res)=>{
              // console.log('数据', JSON.parse(res.data))
              this.listData = JSON.parse(res.data)[0]
              // console.log(this.listData)
        }).catch((err)=>{
          console.log(err)
        })
      },
      getBlogs(){  
        let data= {
          Action: "SearchBlurEnabled",   
          Resource: "HomePage",
          DataJSONString: JSON.stringify({ HomePageType: 5 }),
          PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC, ID DESC" }
        }
        this.$.post("/api/Table/TableAction",
          data
        ).then((res)=>{
              this.listData = JSON.parse(res.data).Rows[0]
              // console.log(this.listData)
        }).catch((err)=>{
          console.log(err)
        })
      }
  },
  mounted(){
    this.getTypes()
  }
}

</script>
<style scoped>
.slot-title{
  padding: 15px 0;
  font-size: 18px;
  text-align: center;
}
.slot-content{
    line-height: 30px;
}
/deep/.slot-content p{
  padding: 3px 0;
}
.pic{
  display: block;
  margin: 0 auto;
}
/deep/.slot-content a{
  color: #333;
  text-decoration: none;
}
/deep/.slot-content a:hover{
  color: #298254;
  text-decoration: underline;
}
</style>