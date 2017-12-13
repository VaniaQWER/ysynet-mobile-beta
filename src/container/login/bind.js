import React, { Component } from 'react';
import { InputItem, Button } from 'antd-mobile'
/**
 * @summary 微信绑定组件
 */
class BindForm extends Component {
  render () {
    const { getFieldProps } = this.props.form;
    return (
      <div className='ysynet-login-form'>
        <InputItem
          style={{maxWidth: 300, width: 280}}
          {...getFieldProps('input3')}
          placeholder='请输入用户名'
        />
        <InputItem
          style={{maxWidth: 300, width: 280}}
          {...getFieldProps('input3')}
          placeholder='请输入密码'
        />
        <Button type="primary" style={{marginTop: 10}}>绑定</Button>
      </div>
    )
  }
}

export default BindForm;