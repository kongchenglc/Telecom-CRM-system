import React from 'react'
import ReactDom from 'react-dom'
import {Loader} from '../components'

let elem = null

export default {
  show() {
    if (!elem) {
      elem = document.createElement('div')
      document.body.appendChild(elem)
      ReactDom.render(<Loader/>, elem)
    }
  },
  hide() {
    if (elem) {
      document.body.removeChild(elem)
      elem = null
    }
  }
}
