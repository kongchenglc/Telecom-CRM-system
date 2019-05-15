import React, { Component } from 'react'
import { Table, Card, List } from 'antd'
import styles from './dashboard.module.less'

const tabListNoTitle = [{
  key: 'userDataMgt',
  tab: '客户相关',
}, {
  key: 'activityMgt',
  tab: '营销相关',
}, {
  key: 'commRecord',
  tab: '投诉相关',
}];

const ListData = {
  userDataMgt: [
    {
      title: '添加新客户',
      description: '添加了一个新的客户：18829211951'
    },
    {
      title: '删除客户',
      description: '删除了客户：15399210783'
    },
    {
      title: '修改客户信息',
      description: '修改客户信息：18229000390'
    },
    {
      title: '添加新客户',
      description: '添加了一个新的客户：13759734318'
    },
  ],
  activityMgt: [
    {
      title: '创建营销活动',
      description: '创建了一个新的营销活动：流量套餐推广'
    },
    {
      title: '删除营销活动',
      description: '删除营销活动：大王卡促销'
    },
  ],
  commRecord: [
    {
      title: '添加新的投诉工单',
      description: '添加了一个新的投诉工单，客户18829211951'
    },
    {
      title: '处理投诉工单',
      description: '处理了客户15399210783的投诉工单'
    },
    {
      title: '删除投诉工单',
      description: '删除客户18229000390的投诉工单'
    },
  ],
}

  ;



class dashboard extends Component {
  state = {
    key: 'userDataMgt',
  }

  onTabChange = (key) => {
    this.setState({ key });
  }

  render() {
    const columns = [
      {
        title: '简报',
        dataIndex: 'head',
        key: 'head',
        align: 'center',
        render: text => (<b>{text}</b>)
      },
      {
        title: '新增客户',
        dataIndex: 'newUser',
        key: 'newUser',
        align: 'center',
      },
      {
        title: '新增业务活动',
        dataIndex: 'newActive',
        key: 'newActive',
        align: 'center',
      },
      {
        title: '新增投诉',
        dataIndex: 'newComplaint',
        key: 'newComplaint',
        align: 'center',
      },
      {
        title: '操作日志',
        dataIndex: 'newLog',
        key: 'newLog',
        align: 'center',
      },
    ]

    const dataSource = [
      {
        head: '本周更新',
        key: '1',
        newUser: '1 条',
        newActive: '0 条',
        newComplaint: '1 条',
        newLog: '2 条'
      },
      {
        head: '本月更新',
        key: '2',
        newUser: '2 条',
        newActive: '2 条',
        newComplaint: '2 条',
        newLog: '7 条'
      },
      {
        head: '本年更新',
        key: '3',
        newUser: '3 条',
        newActive: '2 条',
        newComplaint: '2 条',
        newLog: '8 条'
      },
    ]



    return (
      <div className={styles.mainTable}>
        <Table columns={columns} dataSource={dataSource}
          pagination={false}
        ></Table>
        <br /><br /><br />


        <Card
          style={{ width: '100%' }}
          title="操作日志"
          tabList={tabListNoTitle}
          activeTabKey={this.state.key}
          onTabChange={(key) => { this.onTabChange(key); }}
        >
          <List
            itemLayout="horizontal"
            dataSource={ListData[this.state.key]}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a href="javascript:;" onClick={() => this.props.history.push(`./${this.state.key}`)}>{item.title}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    )
  }
}

export default dashboard