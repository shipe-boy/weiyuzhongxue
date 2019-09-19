<!-- 健康促进 -->
<template>
  <div class="party">
    <ban-views :data="bannerData" title="健康促进"></ban-views>
    <div class="wrap">
      <div class="content">

        <types-list @title="changeTitle"></types-list>
        <div class="right">
          <div class="r-title-wrap">
            <p class="r-title">{{title}}</p>
          </div>
          <div class="r-content">
            
            <list-show v-if="isShowList"></list-show>
            <v-details v-if="!isShowList"></v-details>
          </div>

          <div class="crumbs">
            <crumbs></crumbs>
          </div>
          
        </div>
        
       

      </div>
    </div>
      
  </div>
</template>

<script>
import typesList from '../components/typesList'
import BanViews from '../components/BanViews'
import ListShow from '../components/Listshow'
import vDetails from '../components/Details'




export default {
  data() {
    return {
      bannerData: {},
      title: '',
      isShowList: true
    };
  },
  components: {
    typesList,
    BanViews,
    ListShow,
    vDetails
  },
  watch: {
    $route(){
        let id = this.$route.query.type
        let detailsId = this.$route.query.id
        // console.log(detailsId)
        if(detailsId){
          // console.log(111)
          this.isShowList = false;
        }else{
          // console.log(222)
          this.isShowList = true
        }
    },
  },
  methods: {
    changeTitle(title){
      // console.log(title)
      this.title = title
    },
    getBanner(){  
        let data= {
          Action: "SearchBlurEnabled",   
          Resource: "AD",
          DataJSONString: JSON.stringify({ AdClassID: 9 }),
          PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC, ID DESC" }
        }
        this.$.post("/api/Table/TableAction",
          data
        ).then((res)=>{
            this.bannerData = JSON.parse(res.data).Rows[0]
            // console.log(this.bannerData)
        }).catch((err)=>{
          console.log(err)
        })
    },
    listenRoute(){
      let id = this.$route.query.type
        let detailsId = this.$route.query.id
        // console.log(detailsId)
        if(detailsId){
          // console.log(111)
          this.isShowList = false;
        }else{
          // console.log(222)
          this.isShowList = true
        }
    }
  },
  mounted(){
    this.getBanner()
    this.listenRoute()
  }
};

/* 
PartyBuildingClassID
3     学习资料
21    组织建设
22    队伍建设
24    党员教育
26    统战工作
27    党员风采
*/
</script>
<style scoped>
.wrap{
  min-height: 1100px;
  margin-top: 40px;
}
.content{
  position: relative;
  width:1200px;
  min-height: 1100px;
  margin: 30px auto 100px;
  background:rgba(247,249,248,1);
  color: #333;
  padding-bottom: 20px;
}


.right{
  overflow: hidden;
  box-sizing: border-box;
  height: auto;
  width: 1010px;
  padding: 0 30px 20px;
}
.right .r-title-wrap{
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid #eee;
}
.right .r-title{
  position: relative;
  font-size:24px;
  font-weight:600;
  padding-left: 15px;
  color:rgba(41,130,84,1);
}
.right .r-title::before{
  content: '';
  position: absolute;
  left: 0;
  top: 24px;
  display: inline-block;
  width:4px;
  height:24px;
  background:rgba(228,228,228,1);
}
.r-content{
  position: relative;
  width: 940px;
  margin: 0 auto;
}

.crumbs{
    position: absolute;
    right: 15px;
    top: -25px;
    height: 24px;

}
</style>