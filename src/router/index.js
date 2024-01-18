import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ReviewView from '@/views/ReviewList.vue'
import ReviewPageAddView from '@/components/NewReview.vue'
import LoginView from '@/views/LoginView.vue'
import SingleReviewView from '@/views/SingleReviewView.vue'
import ReviewEditView from '@/views/ReviewEdit.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/review',
      name: 'review',
      component: ReviewView
    },
    {
      path: '/review/add',
      name: 'reviewAdd',
      component: ReviewPageAddView
    },
    {
      path: '/review/:id',
      name: 'singleReview',
      component: SingleReviewView
    },
    {
      path: '/review/update/:id',
      name: 'updateReview',
      component: ReviewEditView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
