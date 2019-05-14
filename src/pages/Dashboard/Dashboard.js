import React, { Component } from 'react'
import { Table, Card, List } from 'antd'
import styles from './dashboard.module.less'

const tabListNoTitle = [{
  key: 'aboutUser',
  tab: '客户相关',
}, {
  key: 'aboutActive',
  tab: '营销相关',
}, {
  key: 'aboutComplaint',
  tab: '投诉相关',
}];

const contentListNoTitle = {
  aboutUser: <p>aboutUser</p>,
  aboutActive: <p>aboutActive</p>,
  aboutComplaint: <p>aboutComplaint</p>,
};


const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];



class dashboard extends Component {
  state = {
    key: 'aboutUser',
  }

  onTabChange = (key) => {
    this.setState({ key });
  }

  render() {
    return (
      <div className={styles.mainTable}>
        <Table columns={[
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
        ]} dataSource={[
          {
            head: '本周更新',
            key: '1',
          },
          {
            head: '本月更新',
            key: '2',
          },
          {
            head: '本年更新',
            key: '3',
          },
        ]}
          pagination={false}
        ></Table>
        <br /><br /><br /><br />
        <Card
          style={{ width: '100%' }}
          title="操作日志"
          tabList={tabListNoTitle}
          activeTabKey={this.state.key}
          onTabChange={(key) => { this.onTabChange(key); }}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
          {contentListNoTitle[this.state.key]}
        </Card>
      </div>
    )
  }
}

export default dashboard