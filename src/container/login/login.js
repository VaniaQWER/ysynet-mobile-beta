import React, { Component } from 'react';
import { InputItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { userAction } from '../../action';
import { login } from '../../utils';
import { hashHistory } from 'react-router';
/**
 * @summary 登录表单组件
 */

const inputStyle = {maxWidth: 300, width: 285};

class LoginForm extends Component {
  onSubmit = (e) => {
    e.stopPropagation();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        login(values.username, values.password).then(
          (data) => {
            if (data.result.userInfo) {
              hashHistory.push({pathname: '/'})
              this.props.setUser({username: 'vania'});
            } else {
              alert(data.result.loginResult)
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
        <InputItem
          error={!!getFieldError('password')}
          type='password'
          style={inputStyle}
          {...getFieldProps('password', {
            rules: [
              { required: true }
            ]
          })}
          placeholder='请输入密码'
        />
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