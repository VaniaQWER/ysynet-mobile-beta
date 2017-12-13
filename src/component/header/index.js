import React, { Component } from 'react';
import './style.css'

class Header extends Component {
  render() {
    return (
      <header className='phxl_header'>
        { this.props.children }
      </header>  
    )
  }
}

export default Header;