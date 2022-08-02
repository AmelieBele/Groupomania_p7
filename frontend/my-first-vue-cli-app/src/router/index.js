import { createRouter, createWebHistory } from 'vue-router'
import HomeAuthPage from '../views/HomeAuthPage.vue'
import FeedPage from '../views/FeedPage.vue'

const routes = [
  {
    path: '/',
    name: 'homeAuth',
    component: HomeAuthPage
  },
  {
    path: '/feed/:userId',
    name: 'feed',
    component: FeedPage,
    meta: { requireAuth: true }
    
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})




export default router