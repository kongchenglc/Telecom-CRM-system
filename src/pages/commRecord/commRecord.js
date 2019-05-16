import React, { Component } from 'react'
import { Table, Tag, Divider, Button, Input } from 'antd'
import styles from './commRecord.module.less'

const Search = Input.Search


const columns = [{
  title: '工单编号',
  dataIndex: 'workOrderNum',
  key: 'workOrderNum',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '工单标题',
  dataIndex: 'workOrderTitle',
  key: 'workOrderTitle',
}, {
  title: '客户',
  dataIndex: 'user',
  key: 'user',
}, {
  title: '工单创建时间',
  key: 'createTime',
  dataIndex: 'createTime',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: status => {
    console.log(status)
    let color = status ? 'geekblue' : 'volcano';
    return (<span>
      <Tag color={color} key={status}>{status ? '已查看' : '未查看'}</Tag>
    </span>)
  },
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
  workOrderNum: '12138',
  workOrderTitle: '话费余额异常',
  user: '李诚 18829211951',
  createTime: '2019-5-10',
  status: true,
}, {
  key: '2',
  workOrderNum: '95270',
  workOrderTitle: '移动数据速度缓慢',
  user: '圈圈 18229000390',
  createTime: '2019-9-04',
  status: false,
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

class commRecord extends Component {
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

export default commRecord