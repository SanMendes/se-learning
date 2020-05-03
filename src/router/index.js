import Vue from 'vue'
import VueRouter from 'vue-router'
import AddTheme from '../views/AddTheme.vue'
import Themes from '../views/Themes.vue'
import AddContent from '../views/AddContent.vue'
import Contents from '../views/Contents.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Themes',
    component: Themes
  },

  {
    path: '/addtheme',
    name: 'AddTheme',
    component: AddTheme
  },

  {
    path: '/theme/:themeId/contents',
    name: 'Contents',
    component: Contents
  },

  {
    path: '/theme/:themeId/addcontent',
    name: 'AddContent',
    component: AddContent
  }
]

const router = new VueRouter({
  routes
})

export default router
