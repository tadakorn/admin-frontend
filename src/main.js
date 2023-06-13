import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTerminal, faBars, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
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

/* add icons to the library */
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
  faCommentDots
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
