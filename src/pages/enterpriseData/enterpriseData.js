import React, {Component} from 'react'

class enterpriseData extends Component {
  render() {
    const {location} = this.props
    return (
      <div>
        enterpriseData
        <p>query: <span style={{color: 'red'}}>{location.searchParams.sort}</span></p>
      </div>
    )
  }
}

export default enterpriseData