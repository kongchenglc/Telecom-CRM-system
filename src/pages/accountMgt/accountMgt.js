import React, { Component } from 'react'
import { Input, Icon, Button, Divider, notification } from 'antd'
import styles from './accountMgt.module.less'

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

class accountMgt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    }
  }

  changePassword = () => {
    if (this.state.oldPassword === window.localStorage['password']
      && this.state.newPassword
      && this.state.newPasswordAgain
      && this.state.newPassword === this.state.newPasswordAgain) {
      if (this.state.newPassword === this.state.newPasswordAgain) {
        window.localStorage['password'] = this.state.newPassword
        openNotificationWithIcon('success', '修改密码成功')
        this.setState({
          oldPassword: '',
          newPassword: '',
          newPasswordAgain: '',
        })
      }
    } else if (this.state.oldPassword !== window.localStorage['password']) {
      openNotificationWithIcon('error', '原始密码错误', '请重新输入')
    } else {
      openNotificationWithIcon('error', '新密码输入错误', '请正确输入')
    }
  }

  render() {
    // const { location } = this.props
    return (
      <div>
        <h1>账户管理</h1>
        <Divider type='horizontal'></Divider>

        <div className={styles.left}>
          <span className={styles.text}>用户名：</span>
          <Input className={styles.inputs} disabled value='李诚' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}></Input>
          <br />
          <span className={styles.text}>账号：</span>
          <Input className={styles.inputs} disabled value='guest' prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}></Input>
          <br />
          <span className={styles.text}>上次登录时间：</span>
          <Input className={styles.inputs} disabled value='2019-5-15 21:20' prefix={<Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}></Input>
          <br />
        </div>

        <div className={styles.right}>
          <span className={styles.text}>原始密码：</span>
          <Input.Password
            className={styles.inputs}
            placeholder="Enter old password"
            value={this.state.oldPassword}
            onChange={e => {
              this.setState({ oldPassword: e.target.value }
              )
            }}
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}>

          </Input.Password>
          <br />
          <span className={styles.text}>修改密码：</span>
          <Input.Password
            className={styles.inputs}
            placeholder="Enter new password"
            value={this.state.newPassword}
            onChange={e => this.setState({ newPassword: e.target.value })}
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}>

          </Input.Password>
          <br />
          <span className={styles.text}>再次确认密码：</span>
          <Input.Password
            className={styles.inputs}
            placeholder="Enter new password again"
            value={this.state.newPasswordAgain}
            onChange={e => this.setState({ newPasswordAgain: e.target.value })}
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}>

          </Input.Password>
          <br />
          <Button className={styles.btn} type="primary" onClick={this.changePassword}>确认修改</Button>
        </div>
      </div>
    )
  }
}

export default accountMgt