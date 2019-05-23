import React, { PureComponent, Fragment } from 'react'
import { Button, Row, Form, Input, Icon } from 'antd'
import styles from './Login.module.less'
import { setToken } from '../../utils/tools'
import { FormattedMessage } from 'react-intl'
import { inject } from 'mobx-react'

const FormItem = Form.Item

@inject('rootStore')
@Form.create()
class Login extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault()
    const { form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll(async (errors, values) => {
      if (errors) {
        return
      }
      const result = await Api.login(values, { mock: true })
      setToken(result.token)
      this.props.history.replace('/app/dashboard')
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            {/*<img alt='logo' src={config.logoPath}/>*/}
            <span>{Config.siteName}</span>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [{
                  required: true,
                  message: '用户名不能为空'
                }],
              })(
                <Input
                  placeholder={`请输入用户名`}
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: '密码不能为空'
                }],
              })(
                <Input
                  type='password'
                  placeholder={`请输入密码`}
                />
              )}
            </FormItem>
            <Row>
              <Button
                type='primary'
                htmlType={'submit'}>
                <FormattedMessage id='intl.signIn' />
              </Button>
              {/* <p>
                <span>Username：guest</span>
                <span>Password：guest</span>
              </p> */}
            </Row>
          </Form>
        </div>
        <div className={styles.footer}>
          <footer className={styles['footer-view']}>
            <div className={styles['footer-view-links']}>
              <span>
                <a
                  title='github'
                  rel="noopener noreferrer"
                  target='_blank'
                  href='https://github.com/kongchenglc/Telecom-CRM-system'>
                  <Icon type="github" />
                </a>
              </span>
              {/* <span
                onClick={() => {
                  this.props.rootStore.changeLocale('en')
                }}>English</span>
              <span
                onClick={() => {
                  this.props.rootStore.changeLocale('zh')
                }}>中文</span> */}
            </div>
            <div className={styles['footer-copyright']}>{Config.copyright}</div>
          </footer>
        </div>
      </Fragment>
    )
  }
}

export default Login
