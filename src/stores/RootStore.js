import {observable, action} from 'mobx'
import config from '../utils/config'

const LOCALE = 'ROOTSTORE_LOCALE'

class RootStore {
  @observable locale = 'en'

  @action loadLocale() {
    const dataStr = localStorage.getItem(LOCALE)
    const {languages} = config.i18n
    const langMap = languages.map(_ => _.key)
    if (langMap.includes(dataStr)) {
      this.locale = dataStr
    }
  }

  @action changeLocale(locale) {
    this.locale = locale
    localStorage.setItem(LOCALE, locale)
  }
}

export default new RootStore()
