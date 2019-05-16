import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Table, Tag, Divider, Modal, Input, Button } from 'antd'
import styles from './userDataMgt.module.less'
import axios from 'axios'

const confirm = Modal.confirm;
const Search = Input.Search;


function showDeleteConfirm() {
  confirm({
    title: '确定删除这条客户信息?',
    content: '李诚 18829211951',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}


const data = [{
  key: '1',
  name: '李诚',
  phoneNum: '18829211951',
  address: '陕西省宝鸡市',
  payPackage: ['全球通', '流量不限量'],
  createTime: '2018-3-17',
}, {
  key: '2',
  name: '圆圆',
  phoneNum: '18229000390',
  address: '陕西省西安市',
  payPackage: ['50GB高速流量'],
  createTime: '2011-9-04',
}, {
  key: '3',
  name: '王伟',
  phoneNum: '18288384833',
  address: '北京市',
  payPackage: ['大王卡', '校园用户'],
  createTime: '2010-3-29',
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


@observer
class userDataMgt extends Component {

  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;


    //data

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
      title: '套餐类型',
      key: 'payPackage',
      dataIndex: 'payPackage',
      render: payPackage => (
        <span>
          {payPackage.map(tag => {
            let color = Math.random() > 0.3 ? 'geekblue' : 'green';
            if (Math.random() > 0.6) {
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
          {/* <a href="javascript:;">Invite {record.name}</a>
          <Divider type="vertical" /> */}
          <a href="javascript:;" onClick={this.showModal}>详情&修改</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={showDeleteConfirm}>删除</a>
        </span>
      ),
    }];




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
        <Button className='buttons' type="primary">新建</Button>
        <Button className='buttons' type="danger">删除</Button>
        <Search
          placeholder="input search text"
          enterButton="查找"
          onSearch={value => console.log(value)}
          className='searchInput'
        />

        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
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

        <Modal
          title="用户数据"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          bodyStyle={{ top: 10 + 'px' }}
        >
          <span className={styles.dataName}> 姓名：</span><Input value={'licheng'}></Input>
          <span className={styles.dataName}> 电话：</span><Input value={'18829211951'}></Input>
          <span className={styles.dataName}> 套餐类型(已购业务)：</span><Input value={'18829211951'}></Input>
          <span className={styles.dataName}> 入网时间：</span><Input value={'2010-3-18'}></Input>
          <span className={styles.dataName}> 已通话时间：</span><Input value={'50min'}></Input>
          <span className={styles.dataName}> 已用流量：</span><Input value={'7168MB'}></Input>
          <span className={styles.dataName}> 剩余通话时间：</span><Input value={'560min'}></Input>
          <span className={styles.dataName}> 剩余流量：</span><Input value={'13312MB'}></Input>
          <span className={styles.dataName}> 话费余额：</span><Input value={'¥52.3'}></Input>
          <span className={styles.dataName}> 客户地址：</span><Input value={'陕西省宝鸡市千阳县'}></Input>
          <p>{ModalText}</p>
        </Modal>
      </div>
    )
  }
}

export default userDataMgt