import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import routes from './config'
import {getToken} from '../utils/tools'
import NotFound from '../pages/Error/NotFound'
import qs from 'query-string'

class Routes extends Component {
  renderRoute = (r) => {
    return getToken() ?
      <Route
        key={r.key}
        exact
        path={r.key}
        render={props => {
          const {search} = props.location
          if (r.parentKey) {
            props.location.parentKey = r.parentKey
          }
          props.location.title = r.title
          props.location.searchParams = qs.parse(search)
          props.rootStore = this.props.rootStore
          return <r.component {...props}/>
        }}/>
      :
      <Redirect
        key={r.key}
        to={{
          pathname: '/login',
          state: {from: this.props.location}
        }}/>
  }

  /**
   * Recursive routing
   * 递归路由
   * @param routes
   * @returns {*}
   */
  mapRoutes = (routes) => {
    return routes.map(r => {
      if (r.component) {
        return this.renderRoute(r)
      } else if (r.subs) {
        return this.mapRoutes(r.subs)
      } else {
        return null
      }
    })
  }

  render() {
    return (
      <Switch location={this.props.location}>
        {this.mapRoutes(routes)}
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default Routes