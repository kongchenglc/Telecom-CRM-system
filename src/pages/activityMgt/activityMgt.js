import React, {Component} from 'react'

class activityMgt extends Component {
  render() {
    const {location} = this.props
    return (
      <div>
        activityMgt
        <p>query: <span style={{color: 'red'}}>{location.searchParams.sort}</span></p>
      </div>
    )
  }
}

export default activityMgt