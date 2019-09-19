<!--  -->
<template>
  <div class="honour">
    <template v-if="!isShowDetails">
      <template>
          <ul v-if="!showAll">
            <li v-for="(item, index) in typesList" :key="index">
                    <div class="title">
                        <p>{{item.Name}}</p>
                        <span v-show="!showAll" class="more" @click="more(item)">查看更多>></span>
                    </div>
                    <pic-show :showAll="false" :data="picList[item.ID]"></pic-show>
            </li>
        </ul>
      </template>
      <!-- 展示全部 -->
      <template v-if="showAll">
        <pic-show :showAll="true" :data="oneTypeList"></pic-show>
        <div v-show="showAll" class="page">
            <pagination :total='totalPage' :page="page" @currentPage="currentPage"></pagination>
        </div>
      </template>
    </template>
    <template v-if="isShowDetails">
        <pic-details></pic-details>
    </template>
      
      
  </div>
</template>

<script>
import { TYPETABLE, SHOWMAX, PAGESIZE } from "../globalSet/global.js";
import PicShow from "../components/PicShow";
import Pagination from "../components/Pagination";
import PicDetails from "../components/PicDetails";
export default {
  data() {
    return {
      typeTable: TYPETABLE,
      showMax: SHOWMAX,
      pageSize: PAGESIZE,
      showAll: false,
      totalPage: 0,
      page: 1,
      typesList: [], //分类列表
      picList: [], //图片数组列表
      arr: [],
      oneTypeList: [],
      totalPage: 0,
      page: 1,
      id: 0,
      isShowDetails: false,
      lock: false //解决荣誉史册
    };
  },
  components: {
    PicShow,
    Pagination,
    PicDetails
  },
  computed: {},
  watch: {
    $route() {
      this.listenRoute();
    }
    // picList(newVal){
    //   console.log(newVal)
    //   return newVal
    // }
  },
  methods: {
    currentPage(index) {
      // console.log(index)
      this.page = index;
      let path = this.$route.path;
      let id = this.$route.query.type;
      let show = this.$route.query.show;
      if (path == "/schoolLife" && id == 5) {
        //位育之星

        this.getStarData(
          show,
          "WeiyuStar",
          "WeiyuStarClass",
          this.pageSize,
          this.page
        );
        return
      }
      if (path == "/survey" && id == 4) {
        //荣誉史册
        // this.showAll = false;
        // console.log(this.id, 'HonourClass', 'HistoricHonour', this.pageSize, this.page)
        this.getStarData(
          this.id,
          "HistoricHonour",
          "HonourClass",
          this.pageSize,
          this.page
        );
        return
      }
    },
    more(item) {
      this.showAll = true;
      // console.log(item)
      this.id = item.ID;
      //发送请求
      // console.log(id)
      let path = this.$route.path;
      let id = this.$route.query.type;
      if (path == "/schoolLife" && id == 5) {
        //位育之星
        this.$router.push({
          path: this.$route.path,
          query: {
            type: id,
            show: item.ID
          }
        });
        // this.getStarData(item.ID, "WeiyuStar", "WeiyuStarClass", this.pageSize);
        // console.log('------------')
        return
      }
      if (path == "/survey" && id == 4) {
        //荣誉史册
        // console.log(item.ID, 'HonourClass', 'HistoricHonour', this.pageSize)
        this.$router.push({
          path: this.$route.path,
          query: {
            type: id,
            show: item.ID
          }
        });
        // this.getStarData(
        //   item.ID,
        //   "HistoricHonour",
        //   "HonourClass",
        //   this.pageSize
        // );
        // console.log('........')
        return
      }
    },
    getStar(table, resource) {
      let data = {
        Action: "SearchAllEnabled",
        FieldNames: ["Name", "ID"],
        Resource: table,
        PageControl: {
          PageSize: 0,
          PageIndex: 1,
          OrderBy: "DisplayIndex DESC, ID DESC"
        }
      };
      this.$.post("/api/Table/TableAction", data)
        .then(res => {
          this.typesList = JSON.parse(res.data).Rows;
          // console.log(this.starTypes)
          return this.typesList;
        })
        .then(type => {
          // 获取不同类别下的数据
          for (let i = 0, len = type.length; i < len; i++) {
            this.getStarData(type[i].ID, resource, table, 5);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getStarData(id, resource, classId, size, page = 1) {
      this.totalPage = 0;
      // console.log(id, resource,classId, size)
      let data = {
        Action: "SearchBlurEnabled",
        FieldNames: ["Name", "ID", "ImagePath", "Content"],
        // Resource: "WeiyuStar",
        // DataJSONString: JSON.stringify({ WeiyuStarClassID: id }),
        PageControl: {
          PageSize: size,
          PageIndex: page,
          OrderBy: "DisplayIndex DESC, ID DESC"
        }
      };
      data.Resource = resource;
      data.DataJSONString = {};
      data.DataJSONString[classId + "ID"] = id;
      data.DataJSONString = JSON.stringify(data.DataJSONString);
      // console.log(data)
      this.$.post("/api/Table/TableAction", data)
        .then(res => {
          if (this.showMax == size) {
            // console.log(JSON.parse(res.data).Rows)

            // this.arr[id] = JSON.parse(res.data).Rows
            // this.picList = this.arr;

            this.picList[id] = JSON.parse(res.data).Rows;
            if (this.picList[id]) {
              // console.log(this.picList[id])
              this.$set(
                this.picList,
                this.picList[id],
                JSON.parse(res.data).Rows
              );
            }
            if (this.lock) {
              this.lock = false;
              this.$nextTick(() => {
                this.getStar("HonourClass", "HistoricHonour");
              });
            }

            // console.log(this.picList)
          }
          if (this.showMax < size) {
            this.totalPage = JSON.parse(res.data).PagingInfo.AllRecordCount;
            // console.log(JSON.parse(res.data))
            this.oneTypeList = JSON.parse(res.data).Rows;
            // console.log(this.oneTypeList)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    listenRoute() {
      this.page = 1;
      let id = this.$route.query.type;
      let detailsID = this.$route.query.id;
      let show = this.$route.query.show;
      let path = this.$route.path;
      let i = this.typeTable.findIndex(item => {
        return item.link === path;
      });
      let table = this.typeTable[i].typeTable;
      let listTable = this.typeTable[i].listTable;

      if (detailsID) {
        this.isShowDetails = true;
      } else {
        this.isShowDetails = false;
      }

      if (path === "/schoolLife" && id == 5) {
        if (show) {
          this.showAll = true;
          this.getStarData(
            show,
            "WeiyuStar",
            "WeiyuStarClass",
            this.pageSize
          );
          return;
        } else {
          this.showAll = false;
          this.getStar("WeiyuStarClass", "WeiyuStar");
          return;
        }
      }
      if (path === "/survey" && id == 4) {
        //荣誉史册
        if (show) {
          // console.log(this.isShowDetails, this.showAll);
          this.showAll = true;
          this.getStarData(
            show,
            "HistoricHonour",
            "HonourClass",
            this.pageSize
          );
          return;
        } else {
          this.showAll = false;
          this.getStar("HonourClass", "HistoricHonour");
          this.lock = true;
          return;
        }
      }
    }
  },
  mounted() {
    this.listenRoute();
  }
};
</script>
<style scoped>
.honour .title {
  position: relative;
  height: 24px;
  font-size: 18px;
  font-weight: 600;
  color: #298254;
}
.honour .title .more {
  position: absolute;
  right: 10px;
  bottom: 0;
  font-size: 14px;
  color: #999;
  font-weight: 400;
  cursor: pointer;
}
</style>