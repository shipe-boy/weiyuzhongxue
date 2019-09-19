<!--  -->
<template>
  <div>
      
       <!--轮播  -->
       <div class="banner">
         <banner :data="bannerData" ></banner>
       </div>
      
       <!--内容 -->
       <div class="main">
          <div class="session">
           <div class="title-wrap">
             <span class="title">校园动态</span>
             <span class="more" @click="newsDetails(1)">更多>></span>
           </div>
           <div class="content">
             <ul>
                <li :class="{'item': index == newsIndex}" v-for="(item, index) in schoolNews" :key="index" @mouseenter="over(index)" @click="newsDetails(1, item)">
                  <p class="desc el1"><span class="dot"></span>{{item.Name}}</p>
                  <p class="desc-more" v-html="repalceHtml(item.Content)"></p>
                  <!-- <p class="desc-more" v-html="item.Content"></p> -->
                  <span class="time" v-if="item.PubDate">{{item.PubDate.slice(0, 10)}}</span>
                </li>
             </ul>
           </div>
          </div>
          <div class="session session2">
           <div class="title-wrap">
             <span class="title">重要新闻</span>
             <span class="more" @click="newsDetails(2)">更多>></span>
           </div>
           <div class="content">
             <div class="banner">
                <swiper :options="swiperOption2"  ref="mySwiper2">
                  <swiper-slide v-for="(item, index) in impNews" :key="index" @click.native="banSmallClick(item)">
                    <img :src="item.ImagePath" :alt="item.Name" width="585px" height="320px"/>
                  </swiper-slide>
                  
                  <div class="swiper-button-prev swp2" slot="button-prev"></div>
                  <div class="swiper-button-next swp2" slot="button-next"></div>
                </swiper>
             </div>
             <div class="desc" @click="newsDetails(2, newsMsg)">
               <h3 class="desc-title">{{newsMsg.Name}}</h3>
               <p class="desc-content" v-html="repalceHtml(newsMsg.Content)"></p>
               <!-- <p class="desc-content" v-html="newsMsg.Content"></p> -->
             </div>
           </div>
          </div>
          <div class="session session3">
           <div class="title-wrap">
             <span class="title">公示公告</span>
             <span class="more"  @click="newsDetails(3)">更多>></span>
           </div>
           <div class="content">
             <div class="items" v-for="(item, index) in noticeList" :key="index" v-if="noticeList.length"  @click="newsDetails(3,item)">
               <div class="left">
                 <div class="day">{{item.PubDate.slice(6,10)}}</div>
                 <div class="year">{{item.PubDate.slice(0,4)}}</div>
               </div>
               <div class="right">
                 <p class="title el1">{{item.Name}}</p>
                 <p class="content" v-html="repalceHtml(item.Content)"></p>
                 <!-- <p class="content" v-html="item.Content"></p> -->
               </div>
             </div>
           </div>
          </div>
          <div class="session  session4">
           <div class="title-wrap">
             <span class="title">一周安排</span>
             <span class="more" @click="newsDetails(0)">更多>></span>
           </div>
           <div class="content">
             <ul>
               <li v-for="(item, index) in week" :key="index" @click="newsDetails(0, item)">
                  <p class="desc el1">{{item.Name}}</p>
                  <span class="time">{{item.PubDate.slice(0, 10)}}</span>
                </li>
             </ul>
           </div>
         </div>
       </div>
       <!-- 热门 -->
        <div class="hot">
          <div class="show">
              <div class="left" @click="schoolLife">
                  <div class="pic">
                    <img :src="speaking.ImagePath" alt="国旗下讲话" width="100%" height="100%">
                  </div>
                  <div class="content">
                      <p class="title">国旗下讲话</p>
                      <p class="desc">{{speaking.Name}}</p>
                      <span class="more">查看详细 >></span>
                  </div>
              </div>
              <div class="center">
                  <p class="title">热点专区</p>
                  <ul class="center-show">
                      <li v-for="(item, index) in hotEmail" :key="index" @click="showEmails(item)">
                          <div class="pic-show">
                            <img :src="item.ImagePath" :alt="item.name" width="100%" height="100%">
                          </div>
                          <p class="pic-desc">{{item.name}}</p>
                      </li>
                  </ul>

                  
              </div>
              <div class="right">
                  <div class="pic" @click="partyClick">
                    <img :src="blog.ImagePath" :alt="blog.Name" width="100%" height="100%">
                  </div>
                  <div class="content">
                      <p class="title">做一个有道理的人</p>
                      <!-- <div class="link" v-html="blog.Content"></div> -->
                      <ul class="link">
                          <li> <a href="Http://wycz2013.blog.163.com" target="_blank">位育初级中学“文明小博客”</a> </li>
                          <li class="el1" @click="partyClick">位育初级中学 “班级小博客” 2020</li>
                      </ul>
                  </div>
              </div>
          </div>
        </div>
        <!-- 专栏 -->
        <div class="hot-pic">
            <ul>
              <li class="items" v-for="(item, index) in partyPic" :key="index" @click="handleClick(item)">
                <a :href="item.path" target="_blank">
                  <img :src="item.imgsrc" :alt="item.title" width="100%" height="100%">
                  <p class="desc">{{item.title}}</p>
                </a>
                  
              </li>
            </ul>
        </div>
        <!-- 轮播 -->
        <paly-show :data="star"></paly-show>
      <!-- 弹框 -->
      <e-mails ref='emailsModal' :title="title"></e-mails>
  </div>
</template>

<script>
import Banner from "../components/Banner";
import PalyShow from "../components/PalyShow";
import EMails from '../components/EMails'
import { PAGESIZE } from '../globalSet/global';
export default {
  name: "index",
  data() {
    return {
      bannerData: [],
      // swiper ,区域二
      swiperOption2: {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        observer:true,//修改swiper自己或子元素时，自动初始化swiper 
        observeParents:true,//修改swiper的父元素时，自动初始化swiper 
        navigation: {
          nextEl: ".swiper-button-next.swp2",
          prevEl: ".swiper-button-prev.swp2"
        }
      },
      //专栏
      partyPic: [
        {
          title: '党务公开专栏',
          imgsrc: '../../static/images/party1.png',
          path: 'http://zt.wycz.sh.cn/dwgk/'
        },
        {
          title: '行为规范风采展示',
          imgsrc: '../../static/images/party2.png',
          path: 'http://zt.wycz.sh.cn/xwgf/'
        },
        {
          title: '文明校园在线创建',
          imgsrc: '../../static/images/party3.png',
          path: 'http://zt.wycz.sh.cn/wmcj/'
        },
        {
          title: '信息公开',
          imgsrc: '../../static/images/party4.png',
          path: ''
        },
      ],
      hotEmail: [
        {
          id: 1,
          name: '校长信箱',
          ImagePath: '../../static/images/email1.png'
        },
        {
          id: 2,
          name: '支部信箱',
          ImagePath: '../../static/images/email2.png'
        },
        {
          id: 3,
          name: '信息公开意见箱',
          ImagePath: '../../static/images/msg.png'
        },
        {
          id: 4,
          name: '上海市位育实验学校',
          ImagePath: '../../static/images/school.png'
        }
      ],
      title: '',
      typesList: [],
      list:[],
      //动态栏目
      schoolNews: [],
      newsIndex: 0,
      impNews: [],
      newsMsg: {},
      newsTitle: "",
      newsCon: '',
      noticeList: [],
      blog: {},  //文明小博客
      speaking: {},  //国旗下讲话
      star: [],  //位育之星
      week: []  //一周安排
    };
  },
  computed: {
      swiper2() {
          return this.$refs.mySwiper2.swiper
      }
  },
  components: {
    Banner,
    PalyShow,
    EMails
  },
  methods: {
    partyClick(){   //文明小博客
      // console.log('????')
      this.$router.push({
        path: '/party',
        query: {
          type: '111'
        }
      })
      //const {href} = this.$router.resolve({
        //             path: path,
        //             query: {
        //               type: this.$route.query.type,
        //               show: this.$route.query.show, 
        //               id: item.ID
        //             }
        //   });
        // window.open(href, '_blank');
    },
    showEmails(item){
      if(item.id === 4){
          window.open('http://www.wycz.sh.cn/wysyxx.asp', '_blank');
        return
      }
      this.title = item.name;
      this.$refs.emailsModal.show();
    },
    handleClick(item){  //专栏
      // this.$store.commit('changeRoute',{
      //       index: 1,
      //       name: item.title,
      //       path: item.path
      //   })

      // this.$router.push({path: item.path})
    },
    //导航栏
    getBanner(id){  
        let data= {
          Action: "SearchBlurEnabled",   
          Resource: "AD",
          DataJSONString: JSON.stringify({ AdClassID: 1 }),
          PageControl: { PageSize: 0, PageIndex: 1, OrderBy: "DisplayIndex DESC, ID DESC" }
        }
        this.$.post("/api/Table/TableAction",
          data
        ).then((res)=>{
            this.bannerData = JSON.parse(res.data).Rows
        }).catch((err)=>{
          console.log(err)
        })
    },
    getSchoolNews(id, size){  
        let data= {
          Action: "SearchBlurEnabled",   
          Resource: "HomePage",
          DataJSONString: JSON.stringify({ HomePageType: id }),
          PageControl: { PageSize: size, PageIndex: 1, OrderBy: "DisplayIndex DESC, ID DESC" }
        }
        this.$.post("/api/Table/TableAction",
          data
        ).then((res)=>{
            // console.log(JSON.parse(res.data).Rows)
            if(id == 1){
              this.schoolNews = JSON.parse(res.data).Rows
              // console.log(this.schoolNews)
            }else if(id == 2){
              this.impNews = JSON.parse(res.data).Rows
              // console.log(this.impNews)
            }else if(id == 3){
              this.noticeList = JSON.parse(res.data).Rows
              // console.log(this.noticeList)
            }else if(id == 5){    //文明小博客
              this.blog = JSON.parse(res.data).Rows[0]
              // console.log(JSON.parse(res.data).Rows)
            }
        }).catch((err)=>{
          console.log(err)
        })
    },
    _getSchoolNews(){
      for(let i = 1; i < 8; i++){
        // 热点是[]  专题  党员
        if(i === 6 || i=== 7 || i === 4){
          continue
        }
        if(i === 3){  //公示公告
          this.getSchoolNews(i, 2)
          continue
        }
        this.getSchoolNews(i, 6)
      }
    },
    over(index){
      // console.log(index)
      this.newsIndex = index
    },
    newsDetails(index, item){
       //跳转路由
      //  console.log(index, item)

        if(!item){
          if(index == 0){
            this.$router.push({path: '/teacher', query: {type:14}})
            return
          }
          this.$router.push({path: '/schoolNews', query: {type:index}})
        }else{
          if(index == 0){
            // this.$router.push({path: '/teacher', query: {type:14, id: item.ID}})
            const {href} = this.$router.resolve({
                    path: '/teacher',
                    query: {
                      type: 14,
                      id: item.ID
                    }
                });
                // console.log(href)
            window.open(href, '_blank')
            return
          }
          //  this.$router.push({path: '/schoolNews', query: {type:index, id: item.ID}})
          const {href} = this.$router.resolve({
                    path: '/schoolNews',
                    query: {
                      type: index,
                      id: item.ID
                    }
                });
                // console.log(href)
           window.open(href, '_blank')
        }
      // console.log(item, type)  
    },
    changeContent(){  //区域二swiper
      // console.log(this.swiper2)
      let self = this;
      this.swiper2.on('slideChangeTransitionStart', function() {
        if(!self.impNews.length) return
        if(self.swiper2.isEnd){
          setTimeout(()=> {
            self.swiper2.slideTo(0, 1, true)
          }, 3000)
        }
        self.newsMsg = self.impNews[this.activeIndex]
      })
      //点击事件
      // this.swiper2.on('click', function() {
      //   console.log(self.impNews[this.activeIndex])
      // })
    },
    banSmallClick(item){    //banner点击事件
      // console.log(item)
      const {href} = this.$router.resolve({
              path: '/schoolNews',
              query: {
                type: '2',
                id: item.ID
              }
          });
        window.open(href, '_blank');
    },
    //国旗下讲话
    getSpeak(){
      let data= {
        Action: "SearchBlurEnabled",   
        Resource: "SchoolLife",
        DataJSONString: JSON.stringify({ SchoolLifeClassID: 4 }),
        PageControl: { PageSize: 1, PageIndex: 1, OrderBy: "DisplayIndex DESC, ID DESC" }
      }
      this.$.post("/api/Table/TableAction",
        data
      ).then((res)=>{
          this.speaking = JSON.parse(res.data).Rows[0]
          // console.log(this.speaking)
      }).catch((err)=>{
        console.log(err)
      })
    },
    schoolLife(){
      const {href} = this.$router.resolve({
                    path: '/schoolLife',
                    query: {
                      type: this.speaking.SchoolLifeClassID,
                      id:this.speaking.ID
                    }
                });
      window.open(href, '_blank')
    },
    // 位育之星
    getStarData(){
      let data= {
        Action: "SearchBlurEnabled",   
        Resource: "WeiyuStar",
        DataJSONString: JSON.stringify({ WeiyuStarClassID: 18 }),
        PageControl: { PageSize: 15, PageIndex: 1, OrderBy: "DisplayIndex DESC, ID DESC" }
      }
      this.$.post("/api/Table/TableAction",
        data
      ).then((res)=>{
        this.star = JSON.parse(res.data).Rows
       
        // console.log(this.star)
      }).catch((err)=>{
        console.log(err)
      })
    },
    getWeek(){    //一周速递
        // console.log(resource,classId, id, size, page)
      let data= {
        Action: "SearchBlurEnabled",   
        Resource: "TeachersHome",
        DataJSONString: JSON.stringify({ TeachersHomeClassID: 14 }),
        PageControl: { PageSize: 3, PageIndex: 1, OrderBy: "DisplayIndex DESC, ID DESC" }
      }
      this.$.post("/api/Table/TableAction",
        data
      ).then((res)=>{
        // console.log(JSON.parse(res.data).Rows)
        this.week = JSON.parse(res.data).Rows
      }).catch((err)=>{
        console.log(err)
      })
    },
    repalceHtml(str){     //去标签
    // console.log(str)
    if(!str) return
      var dd=str.replace(/<\/?.+?>/g,"");
      var dds=dd.replace(/ /g,"");//dds为得到后的内容
      return dds;
    },
    // getSwiper(){   //定时器
    //   this.swiper2 = this.$refs.mySwiper2.swiper
    //   if(this.swiper2){

    //   }
    // }
  },
  mounted(){
    this.getBanner()  //首页banner
    this._getSchoolNews() //学校新闻
    this.getSpeak() //  国旗下讲话
    this.getStarData()  //  位育之星
    this.getWeek()  //一周速递

    this.changeContent() 
    // this.$nextTick(()=>{
      // this.swiper2.init(this.swiperOption2)
    // })
    
    
  }
};
</script>
<style scoped>
.main {
  overflow: hidden;
  width: 1200px;
  margin: 50px auto 0;
}
/* 轮播 */
.banner{
    overflow: hidden;
    height:450px;
    min-width: 1200px;
    margin: 10px 0 0;
}
/*区域内容一*/
.main .session {
  float: left;
  width: 585px;
  margin-bottom: 40px;
  background-color: #fff;
}
.main .session:nth-child(2n-1) {
  margin-right: 30px;
}
.title-wrap {
  position: relative;
  height: 40px;
}
.session .title {
  width: 95px;
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.session .title-wrap::after {
  position: absolute;
  left: 0;
  bottom: 0;
  content: "";
  display: inline-block;
  width: 96px;
  height: 4px;
  background: rgba(41, 130, 84, 1);
}
.session .more {
  float: right;
  width: 50px;
  /* height: 14px; */
  font-size: 14px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 40px;
  cursor: pointer;
}
.session .more:hover{
  color: #298254;
  text-decoration: underline;
}
.session .content li {
  overflow: hidden;
  position: relative;
  padding: 15px 0;
  border-bottom: 1px dashed rgb(228, 228, 228);
  cursor: pointer;
}

.session .content li p.desc {
  width: 440px;
  color: #333;
}
.content li p.desc .dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  margin-right: 10px;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #000;
}
.session .content li span.time {
  position: absolute;
  right: 10px;
  top: 20px;
  color: #666;
  font-size: 14px;
}
.session .content li.item p.desc-more {
  overflow: hidden;
  width: 560px;
  height: 80px;
  padding: 0 10px 20px;
  margin: 10px auto;
  line-height: 24px;
  border: 1px solid rgb(228, 228, 228);
  color: #333;
  font-size: 14px;
  transition: height .5s;
}
.session .content li p.desc-more{
  height: 0;
  overflow: hidden;
  transition: height .5s;
}

.session .content li:hover p.desc-more{
  color: #298254;
  text-decoration: underline;
}
.session .content li:hover p.desc{
  color: #298254;
  text-decoration: underline;
}
/* .content li p.desc-more p{
  font-size: 14px;
} */
/*区域二*/
.session2 .content .banner {
  width: 585px;
  height: 320px;
  margin-top: 20px;
}
.session2 .content .desc {
  cursor: pointer;
  padding: 20px;
  background: #F7F9F8;
}
.session2 .content .desc .desc-title {
  color: #298254;
}
.session2 .content .desc .desc-content {
  height: 40px;
  overflow: hidden;
  margin-top: 17px;
  font-size: 14px;
}
.session2 .content .desc .desc-content:hover{
  color: #298254;
  text-decoration: underline;
}
/*区域三*/
.session3 .items{
  height: 65px;
  overflow: hidden;
  color: #333;
}
.session3 .content{
  overflow: hidden;
}
.session3 .content .items {
  overflow: hidden;
  padding: 15px 0;
}
.session3 .content .left {
  float: left;
  width: 70px;
  height: 70px;
  border: 2px solid #298254;
  text-align: center;
}
.session3 .content .left .day {
  height: 40px;
  line-height: 40px;
}
.session3 .content .left .year {
  height: 30px;
  line-height: 30px;
  background-color: #298254;
  color: #fff;
}
.session3 .content .right {
  float: left;
  width: 490px;
  margin-left: 20px;
  cursor: pointer;
}
.session3 .content .right .title {
  width: 100%;
  color: rgba(51, 51, 51, 1);
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}
.session3 .content .right .content {
  overflow: hidden;
  width:490px;
  height: auto;
  color: rgba(102, 102, 102, 1);
  line-height: 24px;
  font-size: 14px;
}
.session3 .content .right .title:hover, 
.session3 .content .right .content:hover{
  color: #298254;
  text-decoration: underline;
}
/*区域四*/
.session4 .content li {
  padding: 20px 0;
}
.session4 .content li:hover p.desc{
  color: #298254;
  text-decoration: underline;
}
/* 热门 */
.hot{
    display: flex;
  justify-content: center;
  align-items: center;
    height: 288px;
    background-color: #F7F9F8;
}
.show {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 1200px;
  height: 200px;
  margin: auto;
  padding: 30px;
  border: 1px solid #ffce67;
  line-height: 24px;
  color: #333333;
}
/* 左 */
.show .left,
.show .right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 470px;
  height: 120px;
}
.show .left .pic {
  width: 160px;
  height: 100px;
  padding:10px;
  cursor: pointer;
}
.left .content,
.right .content {
  position: relative;
  width: 270px;
  height: 120px;
}
.left .content .title,
.right .content .title {
  font-size: 20px;
  color: #e91c0c;
  font-weight: 600;
  margin-bottom: 8px;
}
.left .content .desc {
  color: #333333;
  font-size: 14px;
  cursor: pointer;
}
.left .content .desc:hover{
  color: #298254;
  text-decoration: underline;
}
.left .content .more {
  position: absolute;
  bottom: 0;
  right: 5px;
  font-size: 12px;
  color: #298254;
  cursor: pointer;
}
/* 中 */
.center {
  width: 290px;
}
.center .title {
  font-size: 20px;
}
.center .center-show {
  display: flex;
  justify-content: space-between;
  align-items: top;
  width: 270px;
  height: 95px;
}
.center .center-show li{
  width: 70px;
  cursor: pointer;
}
.center .center-show li:hover{
  color: #298254;
  text-decoration: underline;
}
.center .center-show .pic-show {
  height: 50px;
  width: 50px;
  margin: 5px auto;
}
.center .center-show .pic-desc {
  width: 70px;
  text-align: center;
  margin: 0 auto;
  line-height: 18px;
  font-size: 12px;
  vertical-align: top;
}
/* 右 */
.show .right {
  width: 340px;
  height: 120px;
}
.show .right .pic {
  width: 150px;
  height: 120px;
  cursor: pointer;
}
.show .right .content {
  width: 160px;
}
.right .content .link {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 90px;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    cursor: pointer;
}
.right .content .link li{
  width: 160px;
}
.right .content .link li a{
  color: #333;
  text-decoration: none;
}

.right .content .link li:hover a,
.right .content .link li:hover{
  text-decoration: underline;
  color: rgba(41, 130, 84, 1);
}
.hot-pic{
  width: 1200px;
  height: 180px;
  margin: 15px auto;
}
.hot-pic ul{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.hot-pic .items{
  position: relative;
  box-sizing: border-box;
  width: 270px;
  height: 180px;
  padding: 10px;
  border: 1px solid #E4E4E4;
  cursor: pointer;
}
.hot-pic .items .desc{
  position: absolute;
  top: 50%;
  left: 50%;
  width:100%;
  transform: translate(-50%, -50%);
  color: #FF6F35;
  font-size: 22px;
  text-shadow:3px 5px 6px rgba(0,0,0,0.5);
  font-weight:600;
  text-align: center;
}
/* 区域二swiper样式 */
.swiper-button-prev.swp2{
  left: 521px;
  background: url('../../static/images/ico-left.png') no-repeat center;
}
.swiper-button-next.swp2{
  left: 554px;
  background: url('../../static/images/ico-right.png') no-repeat center;
}
.swiper-button-next.swp2,
.swiper-button-prev.swp2{
  top: 302px;
  width: 32px;
  height: 40px;
}
.swiper-container{
  height: 100%;
}

</style>