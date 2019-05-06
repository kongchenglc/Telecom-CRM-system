import React, {Component, Fragment} from 'react'
import {Breadcrumb, Icon, Layout} from 'antd'
import {SiderCustom, HeaderCustom} from './components'
import Routes from './routes'
import routesConfig from './routes/config'
import {Link} from 'react-router-dom'
import {inject} from 'mobx-react'
import {signOut} from './utils/tools'

const {Content, Footer} = Layout

@inject('rootStore')
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      pathname: this.props.location.pathname
    }
    this._breadcrumbList = []
    this.updateTitle(this.props)
    this.renderBreadcrumbList(routesConfig, this.props)
  }


  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this._breadcrumbList = []
      this.updateTitle(nextProps)
      this.renderBreadcrumbList(routesConfig, nextProps)
    }
  }

  onCollapseChange = () => {
    this.setState(state => ({
      collapsed: !state.collapsed,
    }))
  }

  onSignOut = () => {
    signOut()
    this.props.history.push('/login')
  }

  updateTitle = (props) => {
    setTimeout(() => {
      if (props.location.title) {
        document.title = props.location.title
      }
    }, 0)
  }

  renderBreadcrumbList = (routes, props) => {
    for (let route of routes) {
      if (route.key === props.location.pathname) {
        if (route.parentKey) {
          const parentItem = routesConfig.find(r => r.key === route.parentKey)
          this._breadcrumbList.push({
            title: parentItem.title,
            icon: parentItem.icon
          })
        }
        this._breadcrumbList.push({
          title: route.title,
          key: route.key,
          icon: route.icon
        })
      } else if (route.subs) {
        this.renderBreadcrumbList(route.subs, props)
      }
    }
  }

  render() {
    const {collapsed} = this.state
    const {location} = this.props
    return (
      <Layout id='components-layout'>
        <SiderCustom collapsed={collapsed}/>
        <Layout>
          <HeaderCustom
            user={{
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              userName: '李诚'
            }}
            collapased={collapsed}
            onCollapseChange={this.onCollapseChange}
            onSignOut={this.onSignOut}/>
          <Breadcrumb style={{margin: '15px 16px'}}>
            {this._breadcrumbList.map((item, index) => {
              return (
                <Breadcrumb.Item key={index}>
                  {item.key ?
                    <Link to={item.key} className='breadcrumb-link'>
                      {item.icon && <Icon type={item.icon}/>}
                      <span>{item.title}</span>
                    </Link> :
                    <Fragment>
                      {item.icon && <Icon type={item.icon}/>}
                      <span>{item.title}</span>
                    </Fragment>
                  }
                </Breadcrumb.Item>)
            })}
          </Breadcrumb>
          <Content
            style={{
              position: 'relative', margin: '0 16px', padding: 24, background: '#fff', minHeight: 280
            }}>
            <Routes rootStore={this.props.rootStore}/>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            {Config.copyright}
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Main