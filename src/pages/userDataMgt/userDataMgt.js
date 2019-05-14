import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Table, Tag, Divider } from 'antd'
import styles from './userDataMgt.module.less'
import axios from 'axios'


const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '电话号码',
  dataIndex: 'phoneNum',
  key: 'phoneNum',
}, {
  title: '地址',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '身份证号',
  key: 'personId',
  dataIndex: 'personId',
  render: personId => (
    <span>
      {personId.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
}, {
  title: '创建时间',
  dataIndex: 'createTime',
  key: 'createTime',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={() => { console.log(record) }}>详情</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={() => { console.log('delete') }}>删除</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  phoneNum: 32,
  address: 'New York No. 1 Lake Park',
  personId: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  phoneNum: 42,
  address: 'London No. 1 Lake Park',
  personId: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  phoneNum: 32,
  address: 'Sidney No. 1 Lake Park',
  personId: ['cool', 'teacher'],
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
        <a href="javascript:;" onClick={() => {
          axios({
            method: 'post',
            url: 'http://127.0.0.1:8888/test/test',
            data: {
              sNumber: '11111',
              sPassword: '2222',
              checkcode: '33333',
            }
          }).then((result) => {

          }).catch(err => {
            console.log(err);
          })
        }}>testButton</a>
      </div>
    )
  }
}

export default userDataMgt