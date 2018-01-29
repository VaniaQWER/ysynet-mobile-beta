import React, { Component } from 'react';
import { NavBar, Icon, List, WhiteSpace, Modal } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { logout } from '../../utils';
const alert = Modal.alert;
/**
 * @summary 用户详情
 */
const userInfo = {
  avatar: require('../../assets/avatar.png'),
  username: '萌萌的拖鞋酱',
  wechat: 18607107725,
  extra: <p className={'phone'}><i></i><span>186****7725</span></p>
}
class User extends Component {
  upload = () => {
    const upload = this.refs.upload;
    upload.click();
  }
  logoutClick = () => {
    alert('退出', '是否确认退出？', [
      { text: '取消', style: 'default' },
      { text: '确定', onPress: () => 
        logout().then(data => {
          if (data.result) {
            hashHistory.push({pathname: '/login'})
          } else {
            alert('桥等麻袋')
          }
        })
      },
    ]);
  }
  render () {
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: '/profile'})}
        >
          账户信息
        </NavBar>
        <List>
          <List.Item 
            onClick={this.upload}
            arrow="horizontal"
            className={'ysynet-userInfo'} 
            extra={<img className={'avatar'} alt='avatar' src={userInfo.avatar}/>}>
            头像
            <input type='file' style={{display: 'none'}} ref='upload'/>
          </List.Item>
          <List.Item extra={userInfo.username}>用户名</List.Item>
        </List>
        <List renderHeader={() => '账号绑定'}>
          <List.Item extra={<a>解绑</a>}>微信号</List.Item>
        </List>
        <List renderHeader={() => '安全设置'}>
          <List.Item extra={'修改密码'}>登录密码</List.Item>
        </List>
        <WhiteSpace size='xl' />
        <List>
          <List.Item 
            className={'ysynet-userInfo logout'}
            onClick={this.logoutClick}
          >
            退出登录
          </List.Item>
        </List>  
      </div>  
    )
  }
}
export default User;