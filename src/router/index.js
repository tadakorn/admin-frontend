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
      path: '/organization/:id',
      name: 'organization-detail',
      component: () => import('../views/OrganizationDetailView.vue')
    },
    {
      path: '/prompt',
      name: 'prompt',
      component: () => import('../views/PromptListView.vue')
    },
    {
      path: '/prompt/create',
      name: 'prompt-create',
      component: () => import('../views/PromptCreateView.vue')
    },
    {
      path: '/prompt/:id',
      name: 'prompt-detail',
      component: () => import('../views/PromptDetailView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatListView.vue')
    },
    {
      path: '/chat/:id',
      name: 'chat-detail',
      component: () => import('../views/ChatDetailView.vue')
    },
    {
      path: '/chat-folder',
      name: 'chat-folder',
      component: () => import('../views/ChatFolderListView.vue')
    },
    {
      path: '/chat-message',
      name: 'chat-message',
      component: () => import('../views/ChatMessageView.vue')
    },
    {
      path: '/chat-message/:id',
      name: 'chat-message-detail',
      component: () => import('../views/ChatMessageDetailView.vue')
    },
    {
      path: '/system-persona',
      name: 'system-persona',
      component: () => import('../views/SystemPersonaListView.vue')
    },
    {
      path: '/system-persona/create',
      name: 'system-persona-create',
      component: () => import('../views/SystemPersonaCreateView.vue')
    },
    {
      path: '/system-persona/:id',
      name: 'system-persona-detail',
      component: () => import('../views/SystemPersonaDetailView.vue')
    }
  ]
})

export default router
