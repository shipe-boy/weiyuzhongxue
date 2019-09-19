<!-- 列表展示 -->
<template>
<div>
    <!-- 不全部显示 -->
    <div v-if="!showAll" class="list-wrap" v-for="(item, index) in typesList" :key="index">
      <div class="title">
          <p>{{item.Name}}</p>
          <span  class="more" @click="more(item)">查看更多>></span>
      </div>
      <div class="list">
          <ul>
              <li 
                v-for="(item1, index) in titleList[item.ID]"
                :key="index"
                @click="handleClick(item1, item.ID)"
                >
                    <span class="dot"></span>
                    <span class="desc el1">{{item1.Name}}</span>
                    <span class="time">{{item1.PubDate.slice(0,10)}}</span>
                </li>
                
          </ul>
      </div>
  </div>
    <!-- 全部显示 -->
    <template>
        <div v-if="showAll" :class="['list-wrap', {'showAll': showAll}]" >
            <div class="list">
                <ul>
                    <li 
                        v-for="(item, index) in oneTypeList"
                        :key="index"
                        @click="handleClick(item)"
                        >
                            <span class="dot"></span>
                            <span class="desc el1">{{item.Name}}</span>
                            <span class="time">{{item.PubDate.slice(0,10)}}</span>
                        </li>
                </ul>
            </div>
        </div>
        <div v-show="showAll" class="page">
            <pagination :total='totalPage' :page="page" @currentPage="currentPage"></pagination>
        </div>
    </template>
</div>
  
</template>

<script>
import { TYPETABLE, SHOWMAX, PAGESIZE, BASEURL } from "../globalSet/global.js";
import Pagination from "../components/Pagination";
export default {
  data() {
    return {
      baseUrl: BASEURL,
      typeTable: TYPETABLE,
      showMax: SHOWMAX,
      pageSize: PAGESIZE,
      showAll: false,
      typesList: [],
      titleList: [], //初始列表
      oneTypeList: [], //单个列表
      totalPage: 0,
      page: 1,
      arr: []
    };
  },
  components: {
    Pagination
  },
  watch: {
    $route() {
      this.listenRoute();
    },
    titleList(newVal) {
      return newVal;
    }
  },
  methods: {
    currentPage(index) {
      //   console.log(index)
      this.page = index;
      let id = this.$route.query.type;
      let show = this.$route.query.show;
      let path = this.$route.path;
      let i = this.typeTable.findIndex(item => {
        return item.link === path;
      });

      //处理校园新闻分页
      if (path == "/schoolNews") {
        // console.log(111)
        this.getTypeData(
          "HomePage",
          "HomePageType",
          this.typesList[id - 1].ID,
          this.pageSize,
          this.page
        );
        return;
      }
      if (path == "/teaching" && id == 7) {
        //教研组更多

        this.getTypeData(
          "TeachingResearch",
          "TeachingResearchClassID",
          show,
          this.pageSize,
          this.page
        );

        return;
      }

      let table = this.typeTable[i].typeTable;
      let listTable = this.typeTable[i].listTable;
      // console.log(listTable,table+'ID', id, this.pageSize , this.page)
      this.getTypeData(listTable, table + "ID", id, this.pageSize, this.page);
    },
    more(item) {
      //   console.log(item)

      let path = this.$route.path;
      let id = this.$route.query.type;
      if (path == "/teaching" && id == 7) {
        //教研组更多

        this.$router.push({
          path: this.$route.path,
          query: {
            type: id,
            show: item.ID
          }
        });
        this.showAll = true;
        this.getTypeData(
          "TeachingResearch",
          "TeachingResearchClassID",
          item.ID,
          this.pageSize
        );

        return;
      }
      this.$router.push({
        path: this.$route.path,
        query: {
          type: item.ID
        }
      });
      //   this.$emit('moreList', item)
    },
    handleClick(item, show) {
      // 进入详情页
      let path = this.$route.path;

      const {href} = this.$router.resolve({
                    path: path,
                    query: {
                      type: this.$route.query.type,
                      id: item.ID
                    }
                });
                // console.log(href)
      if (path == "/teaching" && this.$route.query.type == 7) {
        if(show){
          const {href} = this.$router.resolve({
                    path: path,
                    query: {
                      type: this.$route.query.type,
                      show: show,
                      id: item.ID
                    }
                });
                window.open(href, '_blank');
                return;
        }else{
          const {href} = this.$router.resolve({
                    path: path,
                    query: {
                      type: this.$route.query.type,
                      show: this.$route.query.show, 
                      id: item.ID
                    }
                });
            window.open(href, '_blank');
            return
        }
        
        // window.open(href, '_blank');
        
      }

      window.open(href, '_blank');
      // if (path == "/schoolNews") {
        
      //   window.open(href, '_blank');
      //   return;
      // } else {
      //   window.open(href, '_blank');
      // }
    },
    getTypes() {
      let id = this.$route.query.type;
      let path = this.$route.path;
      let i = this.typeTable.findIndex(item => {
        return item.link === path;
      });

      let table = this.typeTable[i].typeTable;
      let listTable = this.typeTable[i].listTable;
      let data = {
        Action: "SearchAllEnabled",
        FieldNames: ["Name", "ID"],
        PageControl: {
          PageSize: 0,
          PageIndex: 1,
          OrderBy: "DisplayIndex DESC, ID DESC"
        }
      };
      if (path === "/teaching" && id == 7) {
        //教研组建设
        data.Resource = "TeachingResearchClass";
      } else {
        data.Resource = table;
      }

      if (path === "/survey") {
        //学校概况
        this.typesList = this.typeTable[i].types;
      } else if (path === "/schoolNews") {
        //校园新闻
        this.typesList = this.typeTable[i].types;
        this.getTypeData(
          "HomePage",
          "HomePageType",
          this.typesList[id - 1].ID,
          this.pageSize
        );
      } else {
        this.$.post("/api/Table/TableAction", data)
          .then(res => {
            this.typesList = JSON.parse(res.data).Rows;
            // console.log(this.typesList)
            return this.typesList;
          })
          .then(type => {
            // 获取不同类别下的数据
            //   console.log(id)
            if (path == "/teaching" && id == 7) {
              //教研组建设
              // console.log(type)
              for (let i = 0, len = type.length; i < len; i++) {
                this.getTypeData(
                  "TeachingResearch",
                  "TeachingResearchClassID",
                  type[i].ID,
                  this.showMax
                );
              }
              return;
            }

            if (!id) {
              //无选中类型全部展示
              for (let i = 0, len = type.length; i < len; i++) {
                this.getTypeData(
                  listTable,
                  table + "ID",
                  type[i].ID,
                  this.showMax
                );
              }
            } else {
              let index = type.findIndex(item => {
                return item.ID == id;
              });
              //   console.log(type, index)
              if (type[index]) {
                this.getTypeData(
                  listTable,
                  table + "ID",
                  type[index].ID,
                  this.pageSize
                );
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getTypeData(resource, classId, id, size, page = 1) {
      this.totalPage = 0;
      let data = {
        Action: "SearchBlurEnabled",
        FieldNames: ["Name", "ID", "PubDate"],
        PageControl: {
          PageSize: size,
          PageIndex: page,
          OrderBy: "DisplayIndex DESC, PubDate DESC, ID DESC"
        }
      };
      data.Resource = resource;
      data.DataJSONString = {};
      data.DataJSONString[classId] = id;
      (data.DataJSONString = JSON.stringify(data.DataJSONString)),
        //   console.log(data)
        this.$.post("/api/Table/TableAction", data)
          .then(res => {
            this.totalPage = JSON.parse(res.data).PagingInfo.AllRecordCount;
            if (this.showMax == size) {
              this.arr[id] = JSON.parse(res.data).Rows;
              this.titleList = this.arr;
              // console.log(this.titleList)
            }
            if (this.showMax < size) {
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
      let show = this.$route.query.show; //教研组
      let path = this.$route.path;
      let i = this.typeTable.findIndex(item => {
        return item.link === path;
      });
      let table = this.typeTable[i].typeTable;
      let listTable = this.typeTable[i].listTable;
      if (path == "/schoolNews" && id) {
        //学校新闻分类全部
        
        this.showAll = true
        this.getTypes()
        return;
      }
      if (path == "/teaching" && id == 7 && show) {
        //show存在
        // console.log(111)
        this.showAll = true;
        this.getTypeData(
          "TeachingResearch",
          "TeachingResearchClassID",
          show,
          this.pageSize
        );
        return;
      }
      if (path == "/teaching" && id == 7) {
        //   console.log(2222)
        this.showAll = false;
        this.getTypes();
        return;
      }
      if (!id) {
        this.showAll = false;
        if (path == "/schoolNews") {
          //学校新闻一类五个没有
          return;
        }
        this.getTypes();
      } else {
        this.showAll = true;
        this.getTypeData(listTable, table + "ID", id, this.pageSize);
      }
    }
  },
  mounted() {
    //   this.getTypes()
    this.listenRoute();
  }
};
</script>
<style scoped>
.list-wrap {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  line-height: 24px;
  color: #333;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
}
.showAll {
  min-height: 900px;
}
.list-wrap .title {
  position: relative;
  height: 24px;
  font-size: 18px;
  font-weight: 600;
  color: #298254;
}
.list-wrap .title .more {
  position: absolute;
  right: 10px;
  bottom: 0;
  font-size: 14px;
  color: #999;
  font-weight: 400;
  cursor: pointer;
}
/* 列表 */
.list-wrap .list li {
  padding: 15px 0;
  font-size: 14px;
  border-bottom: 1px dashed #e4e4e4;
  cursor: pointer;
}
.list-wrap .list li:hover {
  color: #298254;
}
.list-wrap .list li:hover .desc {
  text-decoration: underline;
}
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 5px;
  background-color: #298254;
  vertical-align: middle;
}
.desc {
  display: inline-block;
  height: 100%;
  width: 750px;
  vertical-align: middle;
}
.time {
  float: right;
}
</style>