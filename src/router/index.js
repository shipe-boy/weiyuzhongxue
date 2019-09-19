import Vue from 'vue'
import Router from 'vue-router'

/* import Index from '@/views/index'
import Survey from '@/views/Survey'
import Party from '@/views/Party'
import SchoolLife from '@/views/SchoolLife'
import Teaching from '@/views/Teaching'
import Educational from '@/views/Educational'
import Teacher from '@/views/Teacher'
import Healthy from '@/views/Healthy'
import Feature from '@/views/Feature'
import SchoolNews from '@/views/SchoolNews' */

const Index = () => import('../views/index')
const Survey = () => import('../views/Survey')
const Party = () => import('../views/Party')
const SchoolLife = () => import('../views/SchoolLife')
const Teaching = () => import('../views/Teaching')
const Educational = () => import('../views/Educational')
const Teacher = () => import('../views/Teacher')
const Healthy = () => import('../views/Healthy')
const Feature = () => import('../views/Feature')
const SchoolNews = () => import('../views/SchoolNews')

Vue.use(Router)



export default new Router({
    routes: [{
        path: '/',
        name: 'Index',
        component: Index
    },{
        path: '/survey',
        name: 'Survey',
        component: Survey
    },{
        path: '/party',
        name: 'Party',
        component: Party
    },{
        path: '/schoolLife',
        name: 'SchoolLife',
        component: SchoolLife
    },
    {
        path: '/teaching',
        name: 'Teaching',
        component: Teaching
    },{
        path: '/educational',
        name: 'Educational',
        component: Educational
    },{
        path: '/teacher',
        name: 'Teacher',
        component: Teacher
    },{
        path: '/healthy',
        name: 'Healthy',
        component: Healthy
    },{
        path: '/feature',
        name: 'Feature',
        component: Feature
    },{
        path: '/schoolNews',
        name: 'schoolNews',
        component: SchoolNews
    },{
        path: '*',
        redirect: '/'
    }
]
})