import React, { Component } from 'react';
//import { submitUserName } from '../../utils';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import {
  NavBar, 
  Icon, 
  WhiteSpace,
  Button,
  WingBlank,
  Toast
 } from 'antd-mobile';


import { fetchData } from '../../utils/index';

import {User} from '../../api';

import querystring from 'querystring';

/*修改用户名*/
class ChangePw extends Component {

  state = {
    hasError:[false,false,false],
    hasValue:[false,false,false],
    pw:null,
    check:false
    }

  onSubmit = () => {
    //e.stopPropagation();
        let old=this.refs.old.value
        let news=this.refs.new.value
        let confirm=this.refs.confirm.value
let confirmpass
        let hasError=this.state.hasError

        const pattern =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
          if(old===''){
            hasError[0]=true
            this.setState({hasError})
            Toast.info('必须输入旧密码!')
            return
          }
          if(news===''){
            hasError[1]=true
            this.setState({hasError})
            Toast.info('新密码不能为空!')
            return
          }else{
            if(news.match(pattern)){
              hasError[1]=false
              this.setState({hasError})
              }else{
  
                hasError[1]=true
                this.setState({hasError})
                Toast.info('新密码必须是6-16位之间，数字和字母的组合!')
                return
              }
          }
          if(confirm===''){
            hasError[2]=true
            this.setState({hasError})
            Toast.info('确认新密码不能为空!')
            return
          }else{
            if(confirm===news){
              this.setState({pw:confirm})
              Toast.info('修改成功!')
              confirmpass=confirm
            }else{
              hasError[2]=true
              this.setState({hasError})
              Toast.info('两次输入不一样!')  
            }
          }

          fetchData({
            url:`${User.modifyUserPwd}`,
            body:querystring.stringify({oldPwd:old,newPwd:confirmpass}),
            success:data=>{
              console.log(data)
            },
            err:err=>{
              console.log(err)
            }
          })
  }

  onFocus=(e)=>{
  const key=e.target.dataset.index
  let hasError=this.state.hasError
  
    if (this.state.hasError) {
      this.setState({hasError:false})
    }
    if(key==='0'){
        
      hasError[0]=false
      this.setState({hasError})
    } 
    if(key==='1'){
        
      hasError[1]=false
      this.setState({hasError})
    } 
    if(key==='2'){
        
      hasError[2]=false
      this.setState({hasError})
    } 

}

onKeyUp=(e)=>{
const key=e.target.dataset.index

  const mValue=e.target.value.replace(/[^A-Za-z0-9]/g,'');

    if (mValue!==''){
      
      let hasValue=this.state.hasValue
      
      if(key==='0'){
        
        hasValue[0]=true
        this.setState({hasValue})
      } 
      if(key==='1'){
        hasValue[1]=true
        this.setState({hasValue})
      } 
      if(key==='2'){
        hasValue[2]=true
        this.setState({hasValue})
      } 
    }
    e.target.value=mValue
}
errorClick=(e)=>{
  const key=e.target.dataset.index
  
  if(key==='0'){
    Toast.info('必须输入旧密码!')
    
  }else{
    Toast.info('密码格式不对!') 
  }
}
backClick=(e)=>{
  const key=e.target.dataset.index
  let hasValue=this.state.hasValue
  
  if(key==='0'){
    this.refs.old.value=''
    hasValue[0]=false
    this.setState({hasValue})
  }else if(key==='1'){
    this.refs.new.value=''
    hasValue[1]=false
    this.setState({hasValue})
  }else{
    this.refs.confirm.value=''
    hasValue[2]=false
    this.setState({hasValue})
  }
}
check=()=>{
  if(this.refs.check.checked===true){
    this.setState({check:true})
  }else{
    this.setState({check:false})
  }
}
  render () {
    const block={
      display:'block'
    }
    const none={
      display:'none'
    }
    const red={
      color:'red'
    }
    const black={
      color:'black'
    }


    const errorDiv0=this.state.hasError[0]?
    <div className="input-error-extra" onClick={this.errorClick} data-index={0}></div>
    :null;

    const errorDiv1=this.state.hasError[1]?
    <div className="input-error-extra" onClick={this.errorClick} data-index={1}></div>
    :null;

    const errorDiv2=this.state.hasError[2]?
    <div className="input-error-extra" onClick={this.errorClick} data-index={2}></div>
    :null;



    const backDiv0=this.state.hasValue[0]?
    <div className="input-clear" style={this.state.hasError[0]?none:block} onClick={this.backClick} data-index={0}></div>
    :null;

    const backDiv1=this.state.hasValue[1]?
    <div className="input-clear" style={this.state.hasError[1]?none:block} onClick={this.backClick} data-index={1}></div>
    :null; 

    const backDiv2=this.state.hasValue[2]?
    <div className="input-clear" style={this.state.hasError[2]?none:block} onClick={this.backClick} data-index={2}></div>
    :null;

    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: '/profile/user'})}
        >
        修改密码
        </NavBar>

        <WhiteSpace size='md' />

          <div className="list-item">
            <div className="list-line">
              <div className="input-control">

                <input
                type={this.state.check?'text':'password'}
                data-index={0}
                onKeyUp={this.onKeyUp}
                onFocus={this.onFocus}
                style={this.state.hasError[0]?red:black}
                maxLength="16"
                autoFocus="autoFocus"
                ref="old"
                placeholder="旧密码"/>

              </div>
              {backDiv0}
              
              {errorDiv0}
            </div>
          </div>

          <WhiteSpace size='md' />

          <div className="list-item">
            <div className="list-line">
              <div className="input-control">

                <input
                type={this.state.check?'text':'password'}
                data-index={1}
                
                onKeyUp={this.onKeyUp}
                onFocus={this.onFocus}
                style={this.state.hasError[1]?red:black}
                maxLength="16"
                ref="new"
                placeholder="新密码"/>

              </div>
              {backDiv1}
              {errorDiv1}
            </div>
          </div>

        <WhiteSpace size='md' />

          <div className="list-item">
            <div className="list-line">
              <div className="input-control">
                <input
                type={this.state.check?'text':'password'}
                data-index={2}
                onKeyUp={this.onKeyUp}
                onFocus={this.onFocus}
                style={this.state.hasError[2]?red:black}
                maxLength="16"
                ref="confirm"
                placeholder="确认新密码"/>
              </div>
              {backDiv2}
              {errorDiv2}
            </div>
          </div>

          <WhiteSpace size='md' />

        <WingBlank className="check_this">
          <input type="checkbox" ref="check" onClick={this.check}/>
          <span>显示密码</span>
        </WingBlank>
        <WingBlank className="my_button">
          <Button type="primary" onClick={this.onSubmit}>保存</Button><WhiteSpace />
        </WingBlank>
      </div>  
    )
  }
}

const ChangePws = createForm()(ChangePw)
export default ChangePws


