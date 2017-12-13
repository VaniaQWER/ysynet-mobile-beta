import React, { Component } from 'react';

/**
 * @summary 供应商页面
 */

class Supplier extends Component {
  render () {
    return this.props.children || (
      <div>供应商页面</div>
    )
  }
}

export default Supplier;