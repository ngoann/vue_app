import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ChatworkHome from '@/components/chatwork/Home'
import ReportHome from '@/components/chatwork/Report'
import UniposHome from '@/components/unipos/Home'
import UniposSendPoint from '@/components/unipos/SendPoint'
import UniposSetting from '@/components/unipos/Setting'
import UniposMessageManagement from '@/components/unipos/MessageManagement'
import Login from '../views/Login'
import Components from '../views/Components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/components',
      name: 'Components',
      component: Components
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/unipos',
      component: UniposHome,
      children: [
        {path: 'send_point', component: UniposSendPoint},
        {path: 'settings', component: UniposSetting},
        {path: 'message_management', component: UniposMessageManagement},
      ]
    },
    {
      path: '/chatwork',
      component: ChatworkHome,
      children: [
        {path: 'report', component: ReportHome}
      ]
    }
  ]
})
