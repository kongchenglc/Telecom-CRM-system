import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {Button} from 'antd'
import styles from './Dashboard.module.less'

@observer
class Dashboard extends Component {
  render() {
    return (
      <div>
        <span className={`test-global ${styles.test}`}>Dashboard</span>
        <Button
          type='primary'
          onClick={() => {
            this.props.history.push(`/app/user?sort=${new Date().getTime()}`)
          }}>
          Link to profile
        </Button>
      </div>
    )
  }
}

export default Dashboard