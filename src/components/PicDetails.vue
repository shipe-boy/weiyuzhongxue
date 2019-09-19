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
import { TYPETABLE } from "../globalSet/global.js";
export default {
  data() {
    return {
      typeTable: TYPETABLE,
      listData: {}
    };
  },
  methods: {
    getTypes() {
      let id = this.$route.query.type; //类型id
      let detailsId = this.$route.query.id; //详情id
      let path = this.$route.path;
      // console.log(detailsId)
      if (path === "/schoolLife") {
        //位育之星
        this.getTypeData("WeiyuStar", detailsId, 1);
        return;
      }
      if (path === "/survey" && id == 6) {  //教师风采
        
        this.getTypeData("TeacherIntroduction", detailsId, 1);
        return;
      }
      if (path === "/party" && id == 27) {  //党员风采
        
        this.getTypeData("PartyBuilding", detailsId, 1);
        return;
      }
      if(path === "/survey" && id == 4) {  //荣誉史册
        this.getTypeData("HistoricHonour", detailsId, 1);
        return;
      }
      // this.getTypeData(listTable,table+'ID', id, 1)
    },
    getTypeData(resource, id, size) {
      // console.log(resource, id, size )
      let data = {
        Action: "SearchID",
        FieldNames: ["Name", "ID", "ImagePath", "Content"]
        // Resource: "PartyBuilding",
        // DataJSONString: { classId: id },
        // DataJSONString: JSON.stringify({ classId: id }),
      };
      data.Resource = resource;
      data.DataJSONString = {};
      data.DataJSONString.ID = id;
      (data.DataJSONString = JSON.stringify(data.DataJSONString)),
        this.$.post("/api/Table/TableAction", data)
          .then(res => {
            // console.log(JSON.parse(res.data).Rows)
            this.listData = JSON.parse(res.data)[0];
            // console.log(this.listData)
          })
          .catch(err => {
            console.log(err);
          });
    }
  },
  mounted() {
    this.getTypes();
  }
};
</script>
<style scoped>
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
.pic{
  display: block;
  margin: 0 auto;
}
</style>