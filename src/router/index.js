import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserListView.vue')
    },
    {
      path: '/user/:id',
      name: 'user-detail',
      component: () => import('../views/UserDetailView.vue')
    },
    {
      path: '/organization',
      name: 'organization',
      component: () => import('../views/OrganizationListView.vue')
    },
    {
      path: '/prompt',
      name: 'prompt',
      component: () => import('../views/PromptListView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatListView.vue')
    },
    {
      path: '/chat-folder',
      name: 'chat-folder',
      component: () => import('../views/ChatFolderView.vue')
    },
    {
      path: '/chat-messages',
      name: 'chat-messages',
      component: () => import('../views/ChatMessagesView.vue')
    }
  ]
})

export default router
