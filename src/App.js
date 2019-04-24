import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable'
import {IntlProvider, addLocaleData} from 'react-intl'
import {LocaleProvider} from 'antd'
import zh from 'react-intl/locale-data/zh'
import en from 'react-intl/locale-data/en'
import enUS from './locales/en-US.js'
import zhCN from './locales/zh-CN.js'
import antdEnUS from 'antd/lib/locale-provider/en_US'
import antdZhCN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import {observer, Provider} from 'mobx-react'
import {configure} from 'mobx'
import rootStore from './stores/RootStore'
import {Loader} from './components'
import api from './service/api'
import './App.less'
import config from './utils/config'

global.Api = api
global.Config = config

configure({enforceActions: 'always'})

const loading = () => <Loader/>

const Login = Loadable({
  loading,
  loader: () => import('./pages/Login/Login')
})

const Main = Loadable({
  loading,
  loader: () => import('./Main')
})

const NotFound = Loadable({
  loading,
  loader: () => import('./pages/Error/NotFound')
})


addLocaleData([...en, ...zh])

const langMap = {
  en: enUS,
  zh: zhCN
}

const antdLangMap = {
  en: antdEnUS,
  zh: antdZhCN
}

@observer
class App extends React.Component {
  constructor(props) {
    super(props)
    rootStore.loadLocale()
  }

  render() {
    return (
      <IntlProvider
        locale={rootStore.locale}
        messages={langMap[rootStore.locale]}>
        <LocaleProvider locale={antdLangMap[rootStore.locale]}>
          <Provider rootStore={rootStore}>
            <Router>
              <Switch>
                <Route exact path='/' render={() => <Redirect to={`${config.adminBasePath}/dashboard`} push/>}/>
                <Route path='/login' component={Login}/>
                <Route path={config.adminBasePath} component={Main}/>
                <Route component={NotFound}/>
              </Switch>
            </Router>
          </Provider>
        </LocaleProvider>
      </IntlProvider>
    )
  }
}

export default App