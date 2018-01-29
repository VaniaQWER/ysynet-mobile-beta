import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
/**
 * @summary 用户机构组件
 */
class Institution extends Component {
  render () {
    const { ins,onClick } = this.props;
    return (
      <section className={'ysynet-profile-institution'} onClick={onClick}>
        <div className={'ysynet-profile-detail'}>
          <p className={'name'}> {ins} </p>
          <div className="sign">
            <span className="grade">vip</span>
            <span className="authenticate">已认证</span>
          </div>
        </div>
      </section>
    )
  }
}

Institution.propTypes = {
  //data: PropTypes.object.isRequired,
  onClick: PropTypes.func
}

export default Institution;