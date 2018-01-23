import React, { Component } from 'react';
import { InputItem, Button,List,Toast,Switch } from 'antd-mobile';
import { connect } from 'react-redux';
import { userAction } from '../../action';
import { login, fetchData } from '../../utils';
import querystring from 'querystring';
import { hashHistory } from 'react-router';
import { Login, _Local } from '../../api';
const Item = List.Item;
/**
 * @summary 登录表单组件
 */

const inputStyle = {maxWidth: 300, width: 285};

class LoginForm extends Component {
  state = {
    checkCode: '',
    checkFstate: false,
    loginFlag: false
  }
  componentDidMount = () => {
    this.codeChange();
  }
  codeChange = () => {
    this.setState({
      checkCode: `${Login.GetCheckCode}/checkCode.jpg?date` + new Date()
    })
  }
  onSubmit = (e) => {
    e.stopPropagation();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        Toast.loading('Loding....',2);
        login(values.username, values.password).then(
          (data) => {
            if (data.result.userInfo) {
              Toast.success(data.result.loginResult);
              hashHistory.push({pathname: '/home'})
              this.props.setUser({username: 'vania'});
            } else {
              this.setState({ loginFlag: true });
              this.codeChange();
              Toast.fail(data.result.loginResult,2)
            }
          },
          (err) => {
            console.log(err);
          }
        )
      }
    });
  }
  render () {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className='ysynet-login-form'>
        <InputItem
          error={!!getFieldError('username')}
          style={inputStyle}
          {...getFieldProps('username', {
            rules: [
              { required: true }
            ]
          })}
          placeholder='请输入用户名'
        />
        <Item className={'pwd'} extra={<Switch
          {...getFieldProps('Switch2', {
            initialValue: false,
            valuePropName: 'checked',
          })}
          onClick={(checked) => { this.setState({checkFstate:checked }) }}
        />}>
        <div className={'ysy-child'}>
          <InputItem
            error={!!getFieldError('password')}
            type={this.state.checkFstate===false?'password':'text'}
            
            {...getFieldProps('password', {
              rules: [
                { required: true }
              ]
            })}
            placeholder='请输入密码'
          />
        </div>
        </Item>
        {
          this.state.loginFlag && 
          <Item className={'checkCode'} extra={<img alt='验证码' src={this.state.checkCode} onClick={this.codeChange}/>}>
            <div className={'ysy-child'}>
              <InputItem 
                error={!!getFieldError('code')}
                {...getFieldProps('code',{
                  rules: [
                    { required: true, message: '请输入验证码' },
                    { validator:(rule, value, cb)=>{
                      if(typeof value !== 'undefined' && value.length === 5) {
                          fetchData({
                            url:`${_Local}/login/check`,
                            body:querystring.stringify({ code: value}),
                            success: data=>{
                              if(data.status && data.result==='success'){
                                cb();
                              }else{
                                cb('验证码不正确');
                              }
                              
                            },
                            err: err =>{
                              cb('验证码不正确');
                            }
                          })
                        }else{
                          cb('验证码不正确');
                        }
                      } 
                    }
                  ]
                })}
                placeholder='请输入验证码'
              />
            </div>
          </Item>
        }
        <Button type="primary" style={{marginTop: 10}} onClick={this.onSubmit}>登录</Button>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(userAction.setUserMapper(user));
    }
  }
};

export default connect(null, mapDispatchToProps)(LoginForm);