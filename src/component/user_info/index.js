import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
/**
 * @summary 用户信息组件
 */
class UserInfo extends Component {
  render () {
    const { data, onClick } = this.props;
    return (
      <section className={'ysynet-profile'} onClick={onClick}>
        <img alt='用户头像' src={data.avatar}/>
        <div className={'ysynet-profile-detail'}>
          <p className={'name'}> { data.username } </p>
          {
            data.extra
          }
        </div>
        <span className={'next'}></span>
      </section>
    )
  }
}

UserInfo.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func
}

export default UserInfo;