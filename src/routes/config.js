import React from 'react'
import Loadable from 'react-loadable'
import { Loader } from '../components'

const loading = (props) => {
  if (props.pastDelay) {
    return <Loader />
  }
  return null
}

const Dashboard = Loadable({
  loading,
  loader: () => import('../pages/Dashboard/Dashboard')
})
const Users = Loadable({
  loading,
  loader: () => import('../pages/Users/Users')
})

export default [
  {
    key: '/app/dashboard',
    title: 'Dashboard',
    zhTitle: '用户数据管理',
    icon: 'dashboard',
    component: Dashboard
  },
  {
    key: '/app/user',
    title: 'Users',
    zhTitle: '业务活动管理',
    icon: 'user',
    component: Users
  },
  {
    key: '/app/message',
    title: 'Message',
    zhTitle: '客户沟通记录',
    icon: 'message',
    subs: [
      { key: '/app/message/option1', parentKey: '/app/message', title: 'Option1', component: () => <div>Option1</div> },
      { key: '/app/message/option2', parentKey: '/app/message', title: 'Option2', component: () => <div>Option2</div> },
      { key: '/app/message/option3', parentKey: '/app/message', title: 'Option3', component: () => <div>Option3</div> }
    ]
  },
  {
    key: '/app/user',
    title: 'Users',
    zhTitle: '企业数据分析',
    icon: 'user',
    component: Users
  },
  {
    key: '/app/user',
    title: 'Users',
    zhTitle: '账户管理',
    icon: 'user',
    component: Users
  }
]
