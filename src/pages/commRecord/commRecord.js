import React, { Component } from 'react'
import { Table, Tag, Divider } from 'antd'


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
  render: createTime => (
    <span>
      {createTime.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.workOrderNum}</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={() => { console.log(record) }}>详情</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={() => { console.log('delete') }}>删除</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  workOrderNum: 'John Brown',
  workOrderTitle: 32,
  user: 'New York No. 1 Lake Park',
  createTime: ['nice', 'developer'],
}, {
  key: '2',
  workOrderNum: 'Jim Green',
  workOrderTitle: 42,
  user: 'London No. 1 Lake Park',
  createTime: ['loser'],
}, {
  key: '3',
  workOrderNum: 'Joe Black',
  workOrderTitle: 32,
  user: 'Sidney No. 1 Lake Park',
  createTime: ['cool', 'teacher'],
}];


class commRecord extends Component {
  render() {
    const { location } = this.props
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default commRecord