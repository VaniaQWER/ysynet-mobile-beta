import React, { Component } from 'react';
import { NavBar, Icon, List, WhiteSpace, Badge } from 'antd-mobile';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import Footer from '../../component/footer';
import UserInfo from '../../component/user_info';
import './style.css';

import { onLoad } from '../../action';
import { fetchData } from '../../utils';
//import querystring from 'querystring';
import {User} from '../../api';
const Item = List.Item;

/**
 * @summary 用户模块 30089 999999
 */

class Userinfor extends Component {
  constructor(){
    super()
    this.state={
      userInfo:{}
    }
  }
  // state={
  //   userInfo:{}
  // }

  componentDidMount(){
  const onInforLoad=this.props.onInforLoad
    
    fetchData({
      url:`${User.GETUSERINFO}`,
      //body:querystring.stringify({ code: value}),
      success: data=>{
        //data.result

        onInforLoad(data.result)
        console.log(data.result)
        //console.log(data.result.userName)
        
        // if(data.status && data.result==='success'){
        //   console.log(data)
        // }
      
      },
      err: err =>{
        console.log('不正确')
      }
    })
}
  render () {
    const {user}=this.props
    return this.props.children || (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: '/'})}
        >
          我的
        </NavBar>
        {/* <UserInfo data={this.state.userInfo} 
        onClick={() => hashHistory.push({pathname: '/profile/user',state:this.state.userInfo})}/> */}
        <UserInfo user={user}
        onClick={() => hashHistory.push({pathname: '/profile/user'})}/>
        <WhiteSpace size='md' />
        <List className={'ysynet-userInfo'}>
          <Item arrow="horizontal" onClick={() => {}} thumb={require('../../assets/address16x16.svg')} multipleLine>
            我的地址
          </Item>
        </List>
        <WhiteSpace size='md' />
        <List className={'ysynet-userInfo'}>
          <Item arrow="horizontal" 
        onClick={()=>hashHistory.push({pathname:'/profile/institution',state:user})} thumb={require('../../assets/hospital16x16.svg')} multipleLine>
            我的机构
          </Item>
          <Item 
            arrow="horizontal" 
            onClick={() => {}} 
            thumb={require('../../assets/message16x16.svg')}
            multipleLine
            extra={<Badge text={77} overflowCount={55} />}
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

const mapStateToProps = (state)=>({
  //username:state.user.username
  user:state.user
})
const mapDispatchToProps = (dispatch) => {
  return {
    onInforLoad: (data) => {
      dispatch(onLoad.onLoad(data));
    }
  }
}
//export default User

export default connect(mapStateToProps,mapDispatchToProps)(Userinfor);