import React, { Component } from 'react'
import { Table, Button, Divider, Input } from 'antd'
import styles from './activityMgt.module.less'

const Search = Input.Search

const columns = [{
  title: '营销活动内容',
  dataIndex: 'activityName',
  key: 'activityName',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '营销活动编号',
  dataIndex: 'activityNum',
  key: 'activityNum',
}, {
  title: '开始时间',
  dataIndex: 'startTime',
  key: 'startTime',
}, {
  title: '结束时间',
  key: 'endTime',
  dataIndex: 'endTime',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;" onClick={() => { console.log(record) }}>详情</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={() => { console.log('delete') }}>删除</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  activityName: '校园网充100送100',
  activityNum: '12138',
  startTime: '2019-5-10',
  endTime: '2020-10-10',
}, {
  key: '2',
  activityName: '20元10GB高速流量',
  activityNum: '09527',
  startTime: '2019-3-17',
  endTime: '2020-3-8',
}, {
  key: '3',
  activityName: '4G飞享8元套餐',
  activityNum: '14160',
  startTime: '2018-5-4',
  endTime: '2020-8-5',
}];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

class activityMgt extends Component {
  render() {
    const { location } = this.props
    return (
      <div>
        <Button className='buttons' type="primary">新建</Button>
        <Button className='buttons' type="danger">删除</Button>
        <Search
          placeholder="input search text"
          enterButton="查找"
          onSearch={value => console.log(value)}
          className='searchInput'
        />

        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default activityMgt