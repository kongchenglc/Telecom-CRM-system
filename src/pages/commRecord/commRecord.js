import React, {Component} from 'react'

class commRecord extends Component {
  render() {
    const {location} = this.props
    return (
      <div>
        commRecord
        <p>query: <span style={{color: 'red'}}>{location.searchParams.sort}</span></p>
      </div>
    )
  }
}

export default commRecord