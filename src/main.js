import './assets/main.css'

// Boostrap 5
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import './api/axios'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faTerminal,
  faBars,
  faCircleCheck,
  faCircleXmark,
  faPersonShelter,
  faArrowRightFromBracket,
  faKey
} from '@fortawesome/free-solid-svg-icons'
import {
  faUser,
  faHeart,
  faComments,
  faFolderClosed,
  faMessage,
  faBuilding,
  faComment,
  faCommentDots
} from '@fortawesome/free-regular-svg-icons'

library.add(
  faUser,
  faHeart,
  faTerminal,
  faComments,
  faFolderClosed,
  faMessage,
  faBars,
  faBuilding,
  faComment,
  faCircleCheck,
  faCircleXmark,
  faCommentDots,
  faPersonShelter,
  faArrowRightFromBracket,
  faKey
)

// Day.js
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCookies)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
