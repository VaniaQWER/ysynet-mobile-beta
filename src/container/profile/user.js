import React, { Component } from 'react';
import { NavBar, Icon, List, WhiteSpace, Modal,Toast} from 'antd-mobile';
import { connect } from 'react-redux';
import {compressImage_jiu,fetchData} from '../../utils';
import { logout } from '../../utils';
import { hashHistory } from 'react-router';
import { updateHeadImg } from '../../action';
import {User} from '../../api';
import querystring from 'querystring';

const alert = Modal.alert;


/**
 * @summary user从状态树获取用户数据方式
 */

class UserShow extends Component{

upload = () => {
    const Input = this.refs.upload;
    Input.click();
  }
inputChange=()=>{
    const Input = this.refs.upload;

    let fil = Input.files[0];

    this.beforeUpload(fil)

    Input.value=''

  }
 beforeUpload=(fil)=>{
  
      const isGif = fil.type === 'image/gif';
  
      if (isGif) alert('格式不支持Gif')
  
      const isLt2M = fil.size / 1024 / 1024 < 2;
  
      if (!isLt2M){
        alert('','头像必须小于2M',[{text: 'OK'}])
      }
      
      if(!isGif && isLt2M) this.reads(fil)
      
  }
reads=(fil)=>{
  
    var reader = new FileReader();
  
    reader.readAsDataURL(fil);
  
    reader.onload=(e)=>{
      
      let result = e.target.result;
      compressImage_jiu(result, newImgData => {
          this.props.updateImg(newImgData)
      })
      //this.setState({imageUrl:reader.result})
    }
  }
  

unBind=()=>{
  const {user}=this.props
  if(user.wechatOpenid===null){
    Toast.info('您就没绑过微信!')
  }else{
    console.log("有微信")
    alert('','确定解绑微信吗？',[
      { text: '取消', style: 'default' },
          { text: '确定', onPress: () => 
        
          fetchData({
            url:`${User.unbind}`,
            body:querystring.stringify({wechatOpenid:user.wechatOpenid}),
            success: data=>{
              if(data){
                Toast.info('解绑成功！');
              }   
            },
            err: err =>{
              console.log('不正确')
            }
          })
          }
    ])
  }
  }

changeName=()=>{
    hashHistory.push({pathname: '/profile/user/changename',state:this.props.user})
}

changeNumber=()=>{
  hashHistory.push({pathname: '/profile/user/changeNumber',state:this.props.user})  
}

changePw=()=>{
  hashHistory.push({pathname: '/profile/user/changePw'})  
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
  render(){
    const {user}=this.props
    return this.props.children ||(
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
          extra={<img className={'avatar'} alt='avatar' src={user.avatar}/>}
          ref="headerPhoto"
          >
          头像
          <input type='file' style={{display: 'none'}} ref='upload' 
          accept="image/png, image/jpg" onChange={this.inputChange}/>
          
        </List.Item>

        <List.Item 
        onClick={this.changeName} 
        extra={user.userName}
        >
        用户名
        </List.Item>
        </List>

        <List renderHeader={() => '账号绑定'}>
        <List.Item extra={<a>解绑</a>}
        onClick={this.unBind}
        >微信号</List.Item>
        </List>

        <List renderHeader={() => '手机号设置'}>
        <List.Item extra={'修改手机号'}
        onClick={this.changeNumber}
        >手机号</List.Item>
        </List>

        <List renderHeader={() => '安全设置'}>
        <List.Item extra={'修改密码'}
        onClick={this.changePw}
        >登录密码</List.Item>
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

const mapStateToProps = (state)=>({
  user:state.user
})
//window.onload=console.log(mapStateToProps.state)

const mapDispatchToProps = (dispatch) => {
  return {
    updateImg: (img) => {
      dispatch(updateHeadImg.updateHeadImg(img));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserShow);

