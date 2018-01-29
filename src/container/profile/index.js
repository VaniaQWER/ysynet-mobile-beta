import React, { Component } from 'react';
import { NavBar, Icon, List, WhiteSpace, Badge,Toast } from 'antd-mobile';
import { hashHistory } from 'react-router';
import Footer from '../../component/footer';
import UserInfo from '../../component/user_info';
import { fetchData } from '../../utils';
import { User } from '../../api';
import './style.css';
const Item = List.Item;

const userInfo = {
  avatar: require('../../assets/avatar.png'),
  username: '萌萌的拖鞋酱',
  extra: <p className={'phone'}><i></i><span>186****7725</span></p>
}

/**
 * @summary 用户模块
 */
class MyUser extends Component {
  state = {
    userInfo: '',
    unreadMessage: 0
  }
  componentWillMount = ()=>{
    this.getUserInfo();
  }
  
  componentWillReceiveProps = ()=>{
    if(this.props.location.pathname === "/profile/message"){
      this.getUserInfo();
    }
  }
  getUserInfo = ()=>{
    fetchData({
      url: User.GETUSERINFO,
      err: err=>console.log(err,'err'),
      success: data=>{
        if(data.status){
          this.setState({ userInfo:data.result,unreadMessage:data.result.unreadMessage });
        }else{
          Toast.fail(data.msg);
        }
      } 
    })
  }
  render () {
    return this.props.children || (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: '/'})}
        >
          我的
        </NavBar>
        <UserInfo data={userInfo} onClick={() => hashHistory.push({pathname: '/profile/user'})}/>
        <WhiteSpace size='md' />
        <List className={'ysynet-userInfo'}>
          <Item arrow="horizontal" onClick={() => hashHistory.push({pathname:'/profile/address'})} thumb={require('../../assets/address16x16.svg')} multipleLine>
            我的地址
          </Item>
        </List>
        <WhiteSpace size='md' />
        <List className={'ysynet-userInfo'}>
          <Item arrow="horizontal" onClick={() => {}} thumb={require('../../assets/hospital16x16.svg')} multipleLine>
            医院
          </Item>
          <Item 
            arrow="horizontal" 
            onClick={() => hashHistory.push({pathname:'/profile/message'}) }
            thumb={require('../../assets/message16x16.svg')}
            multipleLine
            extra={<Badge text={this.state.unreadMessage} overflowCount={10} />}
          >
            消息
          </Item>
          <Item arrow="horizontal" onClick={() => {}} thumb={require('../../assets/data16x16.svg')} multipleLine>
            资料
          </Item>
        </List>
        <WhiteSpace size='md' />
        <List className={'ysynet-userInfo'}>
          <Item arrow="horizontal" onClick={() => {}} thumb={require('../../assets/setting16x16.svg')} multipleLine>
            设置
          </Item>
        </List>
        <Footer active={'profile'}/>
      </div> 
    ) 
  }
}

export default MyUser;