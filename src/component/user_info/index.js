import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
/**
 * @summary 用户信息组件
 */
class UserInfo extends Component {
  constructor(props){
    super()
    this.state={
      User:{
        onClick:()=>{},
        user:{}
      }
    }
  }
componentWillReceiveProps(nextProps){

  const {onClick,user}=nextProps
  const {mobilePhone}=user
  //console.log(user)
  let str = mobilePhone.substring(0,3)+"****"+mobilePhone.substring(8)
  user.tel=str
  const newOne={onClick,user}
  this.setState({User:newOne})

}
  render () {
    const {user,onClick}=this.state.User
    return (
      <section className={'ysynet-profile'} onClick={onClick}>
        <img alt='用户头像' src={user.userNo}/>
        <div className={'ysynet-profile-detail'}>
          <p className={'name'}> {user.userName } </p>
          <p className={'phone'}><i></i><span>{user.tel}</span></p>
        </div>
        <span className={'next'}></span>
      </section>
    )
  }
}

UserInfo.propTypes = {
  //data: PropTypes.object.isRequired,
  onClick: PropTypes.func
}

export default UserInfo;