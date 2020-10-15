import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/home/Index'
import StudentCreate from '../pages/students/Create'
import SubjectsIndex from '../pages/subjects/Index'
import SubjectCreate from '../pages/subjects/Create'

import FourOFourPage from '../pages/fourOfour/Index'


Vue.use(VueRouter)

const routes = [
    { path: '*', redirect: '/404' },
    { path: '/', component: Home },
    { path: '/student-create', component: StudentCreate },
    { path: '/subjects', component: SubjectsIndex },
    { path: '/subject-create', component: SubjectCreate },
    { path: '/404', name: '404', component: FourOFourPage },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router