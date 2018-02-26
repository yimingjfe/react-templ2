import React, { Component } from 'react'

class DashBoard extends Component {
  componentWillMount() {
    console.log('ttt', this.props)
  }
  render() {
    return (
      <div>
        {
          this.props.match.params.id || 'AAA3A'
        }
      </div>
    )
  }
}

export default DashBoard
