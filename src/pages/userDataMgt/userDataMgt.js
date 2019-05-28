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
    content: '李一 18829211951',
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
  constructor(props) {
    super(props)
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      usersData: [],
      userData: {
        name: '李诚',
        phoneNum: '18829211951',
        packageType: ['全球通','流量不限量'],
        signUpTime: '2018-7-13',
        talkedTime: '50min',
        usedData: '7168MB',
        lastTalkTime: '560min',
        lastData: '13312MB',
        balance: '¥52.3',
        address: '陕西省宝鸡市千阳县',
      }
    }
  }

  getUserData() {
    const self = this
    // console.log(this.state.testdata)
    // this.setState({
    //   usersData: this.state.testdata
    // }, ()=> {
    //   console.log(this.state.usersData)
    // })
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8888/test/test',
      data: {
        operate: 'query'
      }
    }).then((result) => {
      console.log(result)
      const data = JSON.parse(result.data)
      data.value.map((item, index) => {
        item.key = index
      })
      self.setState({
        usersData: data.value
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getUserData()
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
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;


    //表格列
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
        <Button className='buttons' type="primary" onClick={this.showModal}>新建</Button>
        <Button className='buttons' type="danger">删除</Button>
        <Search
          placeholder="input search text"
          enterButton="查找"
          onSearch={value => console.log(value)}
          className='searchInput'
        />

        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.usersData} />
        {/* <a href="javascript:;" onClick={() => {
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
        }}>testButton</a> */}

        <Modal
          title="用户数据"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          bodyStyle={{ top: 10 + 'px' }}
        >
          <span className={styles.dataName}> 姓名：</span><Input value={this.state.userData.name}></Input>
          <span className={styles.dataName}> 电话：</span><Input value={this.state.userData.phoneNum}></Input>
          <span className={styles.dataName}> 套餐类型(已购业务)：</span><Input value={this.state.userData.packageType.join(';')}></Input>
          <span className={styles.dataName}> 入网时间：</span><Input value={this.state.userData.signUpTime}></Input>
          <span className={styles.dataName}> 已通话时间：</span><Input value={this.state.userData.talkedTime}></Input>
          <span className={styles.dataName}> 已用流量：</span><Input value={this.state.userData.usedData}></Input>
          <span className={styles.dataName}> 剩余通话时间：</span><Input value={this.state.userData.lastTalkTime}></Input>
          <span className={styles.dataName}> 剩余流量：</span><Input value={this.state.userData.lastData}></Input>
          <span className={styles.dataName}> 话费余额：</span><Input value={this.state.userData.balance}></Input>
          <span className={styles.dataName}> 客户地址：</span><Input value={this.state.userData.address}></Input>
          {/* <p>{ModalText}</p> */}
        </Modal>
      </div>
    )
  }
}

export default userDataMgt