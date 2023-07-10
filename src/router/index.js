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
      component: () => import('../views/user/UserListView.vue')
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: () => import('../views/user/UserCreateView.vue')
    },
    {
      path: '/user/:id',
      name: 'user-detail',
      component: () => import('../views/user/UserDetailView.vue')
    },
    {
      path: '/organization',
      name: 'organization',
      component: () => import('../views/organization/OrganizationListView.vue')
    },
    {
      path: '/organization/create',
      name: 'organization-create',
      component: () => import('../views/organization/OrganizationCreateView.vue')
    },
    {
      path: '/organization/:id',
      name: 'organization-detail',
      component: () => import('../views/organization/OrganizationDetailView.vue')
    },
    {
      path: '/prompt',
      name: 'prompt',
      component: () => import('../views/prompt/PromptListView.vue')
    },
    {
      path: '/prompt/create',
      name: 'prompt-create',
      component: () => import('../views/prompt/PromptCreateView.vue')
    },
    {
      path: '/prompt/:id',
      name: 'prompt-detail',
      component: () => import('../views/prompt/PromptDetailView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/chat/ChatListView.vue')
    },
    {
      path: '/chat/:id',
      name: 'chat-detail',
      component: () => import('../views/chat/ChatDetailView.vue')
    },
    {
      path: '/chat-folder',
      name: 'chat-folder',
      component: () => import('../views/chat/ChatFolderListView.vue')
    },

    {
      path: '/system-persona',
      name: 'system-persona',
      component: () => import('../views/system_persona/SystemPersonaListView.vue')
    },
    {
      path: '/system-persona/create',
      name: 'system-persona-create',
      component: () => import('../views/system_persona/SystemPersonaCreateView.vue')
    },
    {
      path: '/system-persona/:id',
      name: 'system-persona-detail',
      component: () => import('../views/system_persona/SystemPersonaDetailView.vue')
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
