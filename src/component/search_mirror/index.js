import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
/**
 * @summary 查询框镜像
 */

class SearchMirror extends Component {
  render () {
    return (
      <div className='ysynet-search-mirror-container' onClick={this.props.onClick} style={this.props.style}>
        <div className='ysynet-search-mirror-wrapper'>
          <i className='ysynet-search-mirror-icon '></i>
          <span className='ysynet-search-mirror-placeholder'>{this.props.placeholder || '请输入'}</span>
        </div>
      </div>
    )
  }
}

SearchMirror.propTypes = {
  onClick: PropTypes.func,
  placeholder: PropTypes.string
}

export default SearchMirror;