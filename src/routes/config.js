import React from 'react'
import Loadable from 'react-loadable'
import { Loader } from '../components'

const loading = (props) => {
  if (props.pastDelay) {
    return <Loader />
  }
  return null
}

const dashboard = Loadable({
  loading,
  loader: () => import('../pages/dashboard/dashboard')
})
const userDataMgt = Loadable({
  loading,
  loader: () => import('../pages/userDataMgt/userDataMgt')
})
const activityMgt = Loadable({
  loading,
  loader: () => import('../pages/activityMgt/activityMgt')
})
const commRecord = Loadable({
  loading,
  loader: () => import('../pages/commRecord/commRecord')
})
const enterpriseData = Loadable({
  loading,
  loader: () => import('../pages/enterpriseData/enterpriseData')
})
const accountMgt = Loadable({
  loading,
  loader: () => import('../pages/accountMgt/accountMgt')
})

export default [
  {
    key: '/app/dashboard',
    title: 'dashboard',
    zhTitle: '统计汇总模块',
    icon: 'dashboard',
    component: dashboard
  },
  {
    key: '/app/userDataMgt',
    title: 'userDataMgt',
    zhTitle: '用户数据管理',
    icon: 'file-text',
    component: userDataMgt
  },
  {
    key: '/app/activityMgt',
    title: 'activityMgt',
    zhTitle: '业务活动管理',
    icon: 'shopping',
    component: activityMgt
  },
  {
    key: '/app/commRecord',
    title: 'commRecord',
    zhTitle: '客户沟通记录',
    icon: 'message',
    component: commRecord
  },
  {
    key: '/app/enterpriseData',
    title: 'enterpriseData',
    zhTitle: '企业数据分析',
    icon: 'area-chart',
    component: enterpriseData
  },
  {
    key: '/app/accountMgt',
    title: 'accountMgt',
    zhTitle: '账户管理',
    icon: 'user',
    component: accountMgt
  },
  // {
  //   key: '/app/message',
  //   title: 'Message',
  //   zhTitle: '客户沟通记录',
  //   icon: 'message',
  //   subs: [
  //     { key: '/app/message/option1', parentKey: '/app/message', title: 'Option1', component: () => <div>Option1</div> },
  //     { key: '/app/message/option2', parentKey: '/app/message', title: 'Option2', component: () => <div>Option2</div> },
  //     { key: '/app/message/option3', parentKey: '/app/message', title: 'Option3', component: () => <div>Option3</div> }
  //   ]
  // },
  // {
  //   key: '/app/user',
  //   title: 'Users',
  //   zhTitle: '企业数据分析',
  //   icon: 'user',
  //   component: Users
  // },
  // {
  //   key: '/app/user',
  //   title: 'Users',
  //   zhTitle: '账户管理',
  //   icon: 'user',
  //   component: Users
  // }
]
