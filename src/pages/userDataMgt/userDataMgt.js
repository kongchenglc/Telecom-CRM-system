import React, {Component} from 'react'
import {observer} from 'mobx-react'
import { Table, Tag, Button, Divider} from 'antd'
import styles from './userDataMgt.module.less'


const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];


@observer
class userDataMgt extends Component {
  render() {
    return (
      // <div>
      //   <span className={`test-global ${styles.test}`}>userDataMgt</span>
      //   <Button
      //     type='primary'
      //     onClick={() => {
      //       this.props.history.push(`/app/activityMgt?sort=${new Date().getTime()}`)
      //     }}>
      //     Link to profile
      //   </Button>
      // </div>
      
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default userDataMgt