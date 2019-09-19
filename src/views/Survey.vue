<!-- 学校概况 -->
<template>
  <div class="party">
    <ban-views :data="bannerData" title="学校概况"></ban-views>
    <div class="wrap">
      <div class="content">

        <types-list @title="changeTitle"></types-list>
        
        <div class="right">
          <div class="r-title-wrap">
            <p class="r-title">{{title}}</p>
          </div>
          <div class="r-content">
            
            <!-- <list-show v-if="isShowList"></list-show> -->
            <!-- <v-details v-if=" id==1 || id==4"></v-details> -->
            <!-- 学校简介和设置部门 -->
            <div  v-if=" id==1 || id==5">
              <h2 class="slot-title">{{schoolData.Name}}</h2>
              <div class="slot-content" v-html="schoolData.Content"></div>
            </div>

            <!-- 历任领导 -->
            <template  v-if="id == 2">
                <pic-show :data="leaderList" :showAll="true" :isDesc="true"></pic-show>
                <!-- 分页 -->
                <div class="page">
                  <pagination :total='total' :page="page" @currentPage="currentPage"></pagination>
                </div>
            </template>
            <!-- 现任领导 -->
            <pic-show v-if="id == 3" :data="leaderList" :showAll="true" :isDesc="true"></pic-show>
            
            <!-- 教师风采 -->
            <template v-if="!isShowDetails">
              <pic-show v-if="id == 6" :data="teacherData" :showAll="true"></pic-show>
            </template>
            <template v-if="isShowDetails">
                <pic-details></pic-details>
            </template>

            <!-- 荣誉史册 -->
            <template v-if="!isShowD">
              <pic-views v-if="id == 4"></pic-views>
            </template>
            <template v-if="isShowD">
                <pic-details></pic-details>
            </template>
            <!-- <pic-views v-if="id == 4"></pic-views> -->
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
import typesList from "../components/typesList";
import BanViews from "../components/BanViews";
import ListShow from "../components/Listshow";
import vDetails from "../components/Details";
import PicShow from '../components/PicShow';
import Pagination from '../components/Pagination'
import PicViews from '../components/PicViews' 
import PicDetails from "../components/PicDetails";
import { TYPETABLE, SHOWMAX, PAGESIZE } from "../globalSet/global.js";

export default {
  data() {
    return {
      typeTable: TYPETABLE,
      showMax: SHOWMAX,
      pageSize: PAGESIZE,
      bannerData: {},
      title: "",
      isShowList: true,
      id: 1, //存ID
      schoolData: {}, //学校简介和设置部门
      leaderList: [],  //领导
      LeaderState: 1,
      total:0,
      page: 0,
      teacherData: [], //教师
      isShowDetails: false,
      isShowD:false
    };
  },
  components: {
    typesList,
    BanViews,
    ListShow,
    vDetails,
    PicShow,
    PicViews,
    Pagination,
    PicDetails
  },
  watch: {
    $route() {
      this.listenRoute();
    }
  },
  methods: {
    changeTitle(title) {
      // console.log(title)
      this.title = title;
    },
    getBanner() {
      let data = {
        Action: "SearchBlurEnabled",
        Resource: "AD",
        DataJSONString: JSON.stringify({ AdClassID: 2 }),
        PageControl: {
          PageSize: 0,
          PageIndex: 1,
          OrderBy: "DisplayIndex DESC, ID DESC"
        }
      };
      this.$.post("/api/Table/TableAction", data)
        .then(res => {
          this.bannerData = JSON.parse(res.data).Rows[0];
          // console.log(this.bannerData)
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData(index) {
      let data = {
        Action: "SearchAllEnabled",
        Resource: "SchoolIntroduction",
        PageControl: {
          PageSize: 1,
          PageIndex: 1,
          OrderBy: "DisplayIndex DESC, ID DESC"
        }
      };
      if (index == 1) {
        //学校简介
        data.Action = "SearchAllEnabled";
        data.Resource = "SchoolIntroduction";
      }
      if (index == 5) {
        //部门设置
        data.Action = "SearchBlurEnabled";
        data.Resource = "DepartmentSet";
      }
      this.$.post("/api/Table/TableAction", data)
        .then(res => {
          this.schoolData = JSON.parse(res.data).Rows[0];
          // console.log(this.schoolData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    listenRoute() {
      this.page = 1;
      let id = this.$route.query.type;
      let path = this.$route.path;
      let detailsID = this.$route.query.id
      
      if (id) {
        this.id = id;
        
      }
      //学校简介和设置部门
      if (id == 1 || id == 5) {
        // console.log(id);
        this.getData(id);
      }
      //领导
      if(id == 2 || id == 3){
        this.LeaderState = id - 1
        this.getleaderList()
      }
      //荣誉史册
      if(id == 4){
        
        if(detailsID){
          // console.log(detailsID)
          this.isShowD = true
        }else{
          this.isShowD = false
        }
      }

      //教师
      if(id == 6){
        if(this.$route.query.id){ //详情页
          this.isShowDetails = true;
          return
        }else{
          this.getTeacherData()
           this.isShowDetails = false;
          return
        }
        
      }

    },
    //领导
    getleaderList() {
      let data = {
        Action: "SearchBlurEnabled",
        Resource: "LeaderIntroduction",
        DataJSONString: JSON.stringify({ LeaderState: this.LeaderState }),
        PageControl: {
          PageSize: this.picSize,
          PageIndex: this.page,
          OrderBy: "DisplayIndex DESC, ID DESC"
        }
      };
      this.$.post("/api/Table/TableAction", data)
        .then(res => {
          this.total = JSON.parse(res.data).PagingInfo.AllRecordCount
          this.leaderList = JSON.parse(res.data).Rows
          // console.log(this.leaderList)
        })
        .catch(err => {
          console.log(err);
        });
    },
    currentPage(index){
      // console.log(index)
      this.page = index;
      this.getleaderList()
    },
    //教师
    getTeacherData(){
      let data = {
        Action: "SearchBlurEnabled",
        Resource: "TeacherIntroduction",
        PageControl: {
          PageSize: 0,
          PageIndex: 1,
          OrderBy: "DisplayIndex DESC, ID DESC"
        }
      };
      this.$.post("/api/Table/TableAction", data)
        .then(res => {
          this.teacherData = JSON.parse(res.data).Rows
          // console.log(this.teacherData)
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getBanner();
    this.listenRoute();
  }
};
</script>
<style scoped>
.wrap {
  min-height: 1100px;
  margin-top: 40px;
}
.content {
  position: relative;
  width: 1200px;
  min-height: 1100px;
  margin: 30px auto 100px;
  background: rgba(247, 249, 248, 1);
  color: #333;
  padding-bottom: 20px;
}

.right {
  overflow: hidden;
  box-sizing: border-box;
  height: auto;
  width: 1010px;
  padding: 0 30px 20px;
}
.right .r-title-wrap {
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid #eee;
}
.right .r-title {
  position: relative;
  font-size: 24px;
  font-weight: 600;
  padding-left: 15px;
  color: rgba(41, 130, 84, 1);
}
.right .r-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 24px;
  display: inline-block;
  width: 4px;
  height: 24px;
  background: rgba(228, 228, 228, 1);
}
.r-content {
  position: relative;
  width: 940px;
  margin: 0 auto;
}

.crumbs {
  position: absolute;
  right: 15px;
  top: -25px;
  height: 24px;
}

.slot-title {
  padding: 15px 0;
  font-size: 18px;
  text-align: center;
}
.slot-content {
  line-height: 30px;
}
/deep/.slot-content p {
  padding: 3px 0;
}
</style>