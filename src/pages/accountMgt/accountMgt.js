import React, { Component } from 'react'
import { Input, Icon, Button, Divider } from 'antd'
import styles from './accountMgt.module.less'


class accountMgt extends Component {
  render() {
    const { location } = this.props
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
          <Input.Password className={styles.inputs} placeholder="Enter old password" prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}></Input.Password>
          <br />
          <span className={styles.text}>修改密码：</span>
          <Input.Password className={styles.inputs} placeholder="Enter new password" prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}></Input.Password>
          <br />
          <span className={styles.text}>再次确认密码：</span>
          <Input.Password className={styles.inputs} placeholder="Enter new password again" prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}></Input.Password>
          <br />
          <Button className={styles.btn} type="primary">确认修改</Button>
        </div>
      </div>
    )
  }
}

export default accountMgt