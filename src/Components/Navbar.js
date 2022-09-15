import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{display: 'flex', placeItems: 'center', justifyContent: 'space-between', background: 'lightgrey', padding: '1rem'}}>
        <Link to='/' style={{textDecoration: 'none'}}><h1>Movies App</h1></Link>
        <Link to='/favourites' style={{textDecoration: 'none'}}><h1>Favourites</h1></Link>
      </div>
    )
  }
}
