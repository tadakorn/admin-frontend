import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: () => {
        return { path: '/user' }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginModalView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserListView.vue')
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: () => import('../views/UserCreateView.vue')
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
      path: '/organization/create',
      name: 'organization-create',
      component: () => import('../views/OrganizationCreateView.vue')
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
router.beforeEach((to, from, next) => {
  const cookies = inject('$cookies')
  const isAuthenticated = cookies.get('accessToken')
  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
  else next()
})
export default router
