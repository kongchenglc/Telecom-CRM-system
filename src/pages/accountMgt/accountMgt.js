import React, {Component} from 'react'

class accountMgt extends Component {
  render() {
    const {location} = this.props
    return (
      <div>
        accountMgt
        <p>query: <span style={{color: 'red'}}>{location.searchParams.sort}</span></p>
      </div>
    )
  }
}

export default accountMgt