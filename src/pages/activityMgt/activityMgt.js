import React, {Component} from 'react'
import { Table, Tag, Divider } from 'antd'



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
  render: endTime => (
    <span>
      {endTime.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.activityName}</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={() => { console.log(record) }}>详情</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={() => { console.log('delete') }}>删除</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  activityName: 'John Brown',
  activityNum: 32,
  startTime: 'New York No. 1 Lake Park',
  endTime: ['nice', 'developer'],
}, {
  key: '2',
  activityName: 'Jim Green',
  activityNum: 42,
  startTime: 'London No. 1 Lake Park',
  endTime: ['loser'],
}, {
  key: '3',
  activityName: 'Joe Black',
  activityNum: 32,
  startTime: 'Sidney No. 1 Lake Park',
  endTime: ['cool', 'teacher'],
}];

class activityMgt extends Component {
  render() {
    const {location} = this.props
    return (
      <div>
        <Table columns={columns} dataSource={data}/>        
      </div>
    )
  }
}

export default activityMgt