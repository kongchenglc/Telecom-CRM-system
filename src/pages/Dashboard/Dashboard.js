import React, {Component} from 'react'

class dashboard extends Component {
  render() {
    const {location} = this.props
    return (
      <div>
        dashboard
        <p>query: <span style={{color: 'red'}}>{location.searchParams.sort}</span></p>
      </div>
    )
  }
}

export default dashboard