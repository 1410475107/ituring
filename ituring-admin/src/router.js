import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Center from './views/Center.vue'
import BookIndex from './views/BookIndex.vue'
import AddBook from './views/AddBook.vue'
import BookList from './views/BookList.vue'
import EditBook from './views/EditBook.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: function () {
                return import(/* webpackChunkName: "about" */ './views/About.vue')
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/center',
            name: 'center',
            component: Center
        },
        {
            path: '/book',
            name: 'book',
            component: BookIndex,
            children: [
                {
                    path: 'add',
                    component: AddBook
                },
                {
                    path: 'list',
                    component: BookList
                },
                {
                    path: 'edit',
                    component: EditBook
                }
            ]
        }
    ]
})
