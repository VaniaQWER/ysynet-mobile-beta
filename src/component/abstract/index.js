import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
/**
 * @summary 摘要组件
 * @author vania
 */
class Abstract extends Component {
  shouldComponentUpdate = nextProps => (
    this.props.content !== nextProps.content ||
    this.props.url !== nextProps.url ||
    this.props.style !== nextProps.style
  )
  render () {
    const { content, url, style } = this.props;
    return (
      <section className='ysynet_abstract' style={style}>
        <img alt='缩略图' src={ url } width={70} height={70}/>
        <span className='ysynet_abstract_content'> { content }</span>
        <a className='ysynet_abstract_details'>详情</a>
      </section>  
    )
  }
}

Abstract.propTypes = {
  content: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  style: PropTypes.object
}

export default Abstract;