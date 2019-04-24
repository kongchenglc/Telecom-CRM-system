import React, {Component, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Icon, Menu, Layout} from 'antd'
import PropTypes from 'prop-types'
import routes from '../../routes/config'
import {inject} from 'mobx-react'

class SiderCustom extends Component {
  static propTypes = {
    collapsed: PropTypes.bool
  }

  static getDerivedStateFromProps(props, state) {
    if (props.collapsed !== state.collapsed || props.location.pathname !== SiderCustom.pathname) {
      SiderCustom.pathname = props.location.pathname
      return {
        collapsed: props.collapsed,
        ...SiderCustom.setMenuOpen(props),
      }
    }
    return null
  }

  static setMenuOpen = (props) => {
    const {pathname} = props.location
    return {
      openKey: props.collapsed ? [] : SiderCustom.openKey,
      selectedKey: pathname
    }
  }

  static openKey = []
  static pathname = ''

  state = {
    openKey: [],
    selectedKey: '',
    collapsed: false
  }

  componentDidMount() {
    SiderCustom.openKey = [this.props.location.parentKey] || []
    SiderCustom.pathname = this.props.location.pathname
    const state = SiderCustom.setMenuOpen(this.props)
    this.setState(state)
  }

  menuClick = e => {
    this.setState({
      selectedKey: e.key
    })
  }

  openMenu = v => {
    SiderCustom.openKey = v
    this.setState({
      openKey: v
    })
  }

  renderMenuItem = item => {
    const {rootStore} = this.props
    const title = rootStore.locale !== 'en' ? item[rootStore.locale + 'Title'] || item.title : item.title
    return (
      <Menu.Item
        key={item.key}
      >
        <Link to={(item.path || item.key) + (item.query || '')}>
          {item.icon && <Icon type={item.icon}/>}
          <span className='nav-item'>{title}</span>
        </Link>
      </Menu.Item>
    )
  }

  renderSubMenu = item => {
    const {rootStore} = this.props
    const title = rootStore.locale !== 'en' ? item[rootStore.locale + 'Title'] || item.title : item.title
    return (
      <Menu.SubMenu
        key={item.key}
        title={
          <Fragment>
            {item.icon && <Icon type={item.icon}/>}
            <span className='nav-item'>{title}</span>
          </Fragment>
        }>
        {item.subs.map(item => this.renderMenuItem(item))}
      </Menu.SubMenu>
    )
  }

  render() {
    return (
      <Layout.Sider
        width={240}
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className='logo'/>
        <Menu theme='dark'
              mode='inline'
              inlineCollapsed={this.props.collapsed}
              selectedKeys={[this.state.selectedKey]}
              openKeys={this.state.openKey}
              onClick={this.menuClick}
              onOpenChange={this.openMenu}>
          {routes.map(r => r.component ? this.renderMenuItem(r) : this.renderSubMenu(r))}
        </Menu>
      </Layout.Sider>
    )
  }
}

export default withRouter(inject('rootStore')(SiderCustom))
