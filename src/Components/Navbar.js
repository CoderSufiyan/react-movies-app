import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{display: 'flex', placeItems: 'center', justifyContent: 'space-between', background: 'lightgrey', padding: '1rem'}}>
        <h1>Movies App</h1>
        <h2>Favourites</h2>
      </div>
    )
  }
}
