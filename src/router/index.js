import { createRouter, createWebHashHistory } from 'vue-router'
import StartPage from '@/pages/StartPage.vue'
import QuestionPage from '@/pages/QuestionPage.vue'
import AnswerPage from '@/pages/AnswerPage.vue'
import ResultPage from '@/pages/ResultPage.vue'

const routes = [
  {
    path: '/',
    name: 'start',
    component: StartPage
  },
  {
    path: '/question',
    name: 'question',
    component: QuestionPage
  },
  {
    path: '/answer',
    name: 'answer',
    component: AnswerPage
  },
  {
    path: '/result',
    name: 'result',
    component: ResultPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 強制重新載入相同路由
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
