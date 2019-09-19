
//一页显示条数
export const PAGESIZE = 15;
//每个分类默认显示
export const SHOWMAX = 5;

//一页显示图片数
export const PICSIZE = 15;
//每个分类默认显示图片数
export const SHOWMAXPIC = 5;

//请求路径前缀
export const BASEURL = 'http://47.100.163.199:8011'

//对应分类表
export const TYPETABLE = [
    {
        type: '学校概况',
        link: '/survey',
        types: [{
            ID: 1,
            Name: "学校简介"
          },
          {
            ID: 2,
            Name: "历任领导"
          },
          {
            ID: 3,
            Name: "现任领导"
          },
          {
            ID: 4,
            Name: "荣誉史册"
          },
          {
            ID: 5,
            Name: "部门设置"
          },
          {
            ID: 6,
            Name: "教师风采"
          }],
        typeTable: ''
    },
    {
        type: '党建工作',
        link: '/party',
        typeTable: 'PartyBuildingClass',
        listTable: 'PartyBuilding'
    },
    {
        type: '创全园地',
        link: '/schoolLife',
        typeTable: 'SchoolLifeClass',
        listTable: 'SchoolLife'
    },
    {
        type: '教学管理',
        link: '/teaching',
        typeTable: 'TeachingClass',
        listTable: 'Teaching'
    },
    {
        type: '教育科研',
        link: '/educational',
        typeTable: 'EducationalResearchClass',
        listTable: 'EducationalResearch'
    },
    {
        type: '教工之家',
        link: '/teacher',
        typeTable: 'TeachersHomeClass',
        listTable: 'TeachersHome'
    },
    {
        type: '健康促进',
        link: '/healthy',
        typeTable: 'HealthyGardenClass',
        listTable: 'HealthyGarden'
    },
    {
        type: '学校特色',
        link: '/feature',
        typeTable: 'SchoolCharacteristicsClass',
        listTable: 'SchoolCharacteristics'
    },
    {
        type: '学校新闻',
        link: '/schoolNews',
        typeTable: '',
        listTable: '',
        types:[{ID: 1, Name: '校园动态'},{ID: 2, Name: '重要新闻'},{ID: 3, Name: '公示栏'}]
    }
]

//路由跳转列表
export const  LINK = ['/', '/survey', '/party', '/schoolLife', '/teaching', '/educational', '/teacher', '/healthy', '/feature'] 