import React, { Component } from 'react'
import { Table, Card, List } from 'antd'
import styles from './dashboard.module.less'
import axios from 'axios'

class dashboard extends Component {
  state = {
    key: 'userDataMgt',
    ListData: {
      userDataMgt: [],
      activityMgt: [
        {
          type: 'add',
          description: '流量套餐推广'
        },
        {
          type: 'delete',
          description: '大王卡促销'
        },
      ],
      commRecord: [
        {
          type: 'add',
          description: '18829211951'
        },
        {
          type: 'update',
          description: '15399210783'
        },
        {
          type: 'delete',
          description: '18229000390'
        },
      ],
    },
    dataSource: [
      {
        head: '本周更新',
        key: '1',
        newUser: `${window.localStorage['num']} 条`,
        newActive: '0 条',
        newComplaint: '1 条',
        newLog: '2 条'
      },
      {
        head: '本月更新',
        key: '2',
        newUser: `${window.localStorage['num']} 条`,
        newActive: '2 条',
        newComplaint: '2 条',
        newLog: '7 条'
      },
      {
        head: '本年更新',
        key: '3',
        newUser: `${window.localStorage['num']} 条`,
        newActive: '2 条',
        newComplaint: '2 条',
        newLog: '8 条'
      },
    ]
  }

  // react
  componentDidMount() {
    this.getUserdata()
  }

  // backend
  getUserdata = () => {
    const self = this
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8888/dashboard/userData',
      data: {
        operate: 'query',
      }
    }).then((result) => {
      const data = JSON.parse(result.data)
      const ListData = this.state.ListData
      ListData.userDataMgt = data.value.reverse()
      self.setState({
        ListData
      })
    }).catch(err => {
      console.log(err);
    })
  }

  // event
  onTabChange = (key) => {
    this.setState({ key });
  }

  render() {
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

    const listTypeMessage = {
      userDataMgt: {
        add: ['添加新客户', '添加了一个新的客户：'],
        delete: ['删除客户', '删除了客户：'],
        update: ['修改客户信息', '修改客户信息：'],
      },
      activityMgt: {
        add: ['创建营销活动', '创建了一个新的营销活动：'],
        delete: ['删除营销活动', '删除营销活动：'],
        update: ['更新营销活动', '修改了营销活动：'],
      },
      commRecord: {
        add: ['添加新的投诉工单', '添加了一个新的投诉工单，客户'],
        delete: ['删除投诉工单', '删除投诉工单，客户'],
        update: ['处理投诉工单', '处理投诉工单，客户'],
      },
    }


    return (
      <div className={styles.mainTable}>
        <Table columns={columns} dataSource={this.state.dataSource}
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
            dataSource={this.state.ListData[this.state.key]}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a href="javascript:;"
                      onClick={() => this.props.history.push(`./${this.state.key}`)}>
                      {
                        listTypeMessage[this.state.key][item.type][0]
                      }
                    </a>
                  }
                  description={
                    listTypeMessage[this.state.key][item.type][1] + item.description
                  }
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