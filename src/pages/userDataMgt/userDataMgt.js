import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Table, Tag, Divider, Modal, Input, Button } from 'antd'
import styles from './userDataMgt.module.less'
import axios from 'axios'


const confirm = Modal.confirm;
const Search = Input.Search;


@observer
class userDataMgt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      confirmLoading: false,
      modalStatus: 'add',
      selectedRowKeys: [],
      selectdRows: [],
      usersData: [],
      userData: {
        name: '李诚',
        phoneNum: '18829211951',
        packageType: ['全球通', '流量不限量'],
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

  // react
  componentDidMount() {
    this.getUserData()
  }

  // antd
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  showDeleteConfirm = (row) => {
    const self = this;
    confirm({
      title: '确定删除这条客户信息?',
      content: `${row.name}  ${row.phoneNum}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        self.deleteUserData(row._id);
      },
    });
  }
  deleteSelectsConfirm = () => {
    let selectdIds = this.state.selectdRows.map(item => {
      return item._id
    })
    const self = this;
    confirm({
      title: '确定删除这些客户信息?',
      content: ``,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        self.setState({
          selectedRowKeys: []
        })
        self.deleteUserData(...selectdIds);
      },
    });
  }

  handleOk = () => {
    console.log(this.state.modalStatus)
    this.state.modalStatus === 'add'
      ? this.addUserData()
      : this.updateUserData()

    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 1000);
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  // backend
  getUserData = (searchText = '') => {
    const self = this
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8888/user/userData',
      data: {
        operate: 'query',
        searchText: searchText
      }
    }).then((result) => {
      const data = JSON.parse(result.data)
      console.log(data)
      data.map((item, index) => {
        item.key = index
      })
      self.setState({
        usersData: data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  addUserData = () => {
    const self = this
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8888/user/userData',
      data: {
        operate: 'add',
        value: this.state.userData
      }
    }).then((result) => {
      console.log(result)
      self.getUserData()
    }).catch(err => {
      console.log(err);
    })
  }

  updateUserData = () => {
    const self = this
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8888/user/userData',
      data: {
        operate: 'update',
        value: this.state.userData
      }
    }).then((result) => {
      console.log(result)
      self.getUserData()
    }).catch(err => {
      console.log(err);
    })
  }

  deleteUserData = (...deleteIds) => {
    const self = this
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8888/user/userData',
      data: {
        operate: 'delete',
        deleteIds
      }
    }).then((result) => {
      console.log(result)
      self.getUserData()
    }).catch(err => {
      console.log(err);
    })
  }

  // event
  addUser = () => {
    this.setState({
      userData: {
        name: '',
        phoneNum: '',
        packageType: [],
        signUpTime: '',
        talkedTime: '',
        usedData: '',
        lastTalkTime: '',
        lastData: '',
        balance: '',
        address: '',
      },
      modalStatus: 'add',
    })
    this.showModal()
  }

  editUser = (row) => {
    console.log(row)
    this.setState({
      userData: row,
      modalStatus: 'update',
    })
    this.showModal()
  }


  render() {
    const { visible, confirmLoading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys
        })
        this.setState({
          selectdRows: selectedRows
        })
      },
    };

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
      key: 'packageType',
      dataIndex: 'packageType',
      render: packageType => (
        <span>
          {packageType.map(tag => {
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
      dataIndex: 'signUpTime',
      key: 'signUpTime',
    }, {
      title: '操作',
      key: 'action',
      render: (row, record) => (
        <span>
          <a href="javascript:;" onClick={() => this.editUser(row)}>详情&修改</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={() => this.showDeleteConfirm(row)}>删除</a>
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
        <Button className='buttons' type="primary" onClick={() => this.addUser()}>新建</Button>
        <Button className='buttons' type="danger" onClick={() => this.deleteSelectsConfirm()}>删除</Button>
        <Search
          placeholder="input search text"
          enterButton="查找"
          onSearch={value => this.getUserData(value)}
          className='searchInput'
        />

        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.usersData} />

        <Modal
          title="用户数据"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          bodyStyle={{ top: 10 + 'px' }}
        >
          <span className={styles.dataName}> 姓名：</span>
          <Input value={this.state.userData.name}
            onChange={e => {
              let value = e.target.value
              let oldData = this.state.userData
              oldData['name'] = value
              this.setState({ userData: oldData })
            }}></Input>

          <span className={styles.dataName}> 电话：</span>
          <Input value={this.state.userData.phoneNum}
            onChange={e => {
              let value = e.target.value
              let oldData = this.state.userData
              oldData['phoneNum'] = value
              this.setState({ userData: oldData })
            }}></Input>

          <span className={styles.dataName}> 套餐类型(已购业务)：</span>
          <Input value={this.state.userData.packageType.join(';')}
            onChange={e => {
              let value = e.target.value
              let oldData = this.state.userData
              oldData['packageType'] = value.split(';')
              this.setState({ userData: oldData })
            }}></Input>

          <span className={styles.dataName}> 入网时间：</span>
          <Input value={this.state.userData.signUpTime}
            onChange={e => {
              let value = e.target.value
              let oldData = this.state.userData
              oldData['signUpTime'] = value
              this.setState({ userData: oldData })
            }}></Input>

          <span className={styles.dataName}> 已通话时间：</span>
          <Input value={this.state.userData.talkedTime}
            onChange={e => {
              let value = e.target.value
              let oldData = this.state.userData
              oldData['talkedTime'] = value
              this.setState({ userData: oldData })
            }}></Input>

          <span className={styles.dataName}> 已用流量：</span>
          <Input value={this.state.userData.usedData}
            onChange={e => {
              let value = e.target.value
              let oldData = this.state.userData
              oldData['usedData'] = value
              this.setState({ userData: oldData })
            }}></Input>

          <span className={styles.dataName}> 剩余通话时间：</span>
          <Input value={this.state.userData.lastTalkTime}
            onChange={e => {
              let value = e.target.value
              let oldData = this.state.userData
              oldData['lastTalkTime'] = value
              this.setState({ userData: oldData })
            }}></Input>

          <span className={styles.dataName}> 剩余流量：</span>
          <Input value={this.state.userData.lastData}
            onChange={e => {
              let value = e.target.value
              let oldData = this.state.userData
              oldData['lastData'] = value
              this.setState({ userData: oldData })
            }}></Input>

          <span className={styles.dataName}> 话费余额：</span>
          <Input value={this.state.userData.balance}
            onChange={e => {
              let value = e.target.value
              let oldData = this.state.userData
              oldData['balance'] = value
              this.setState({ userData: oldData })
            }}></Input>

          <span className={styles.dataName}> 客户地址：</span>
          <Input value={this.state.userData.address}
            onChange={e => {
              let value = e.target.value
              let oldData = this.state.userData
              oldData['address'] = value
              this.setState({ userData: oldData })
            }}></Input>

        </Modal>
      </div>
    )
  }
}

export default userDataMgt