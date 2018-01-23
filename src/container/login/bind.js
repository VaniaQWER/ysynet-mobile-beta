import React, { Component } from 'react';
import { InputItem,List, Button,Toast,Switch } from 'antd-mobile'
import { fetchData } from '../../utils';
import { Login,_Local } from '../../api';
import querystring from 'querystring';
const Item = List.Item;
/**
 * @summary 微信绑定组件
 */
class BindForm extends Component {
  state = {
    checkCode: '',
    checkFstate: false,
    bindFlag: false
  }
  componentDidMount = () => {
    this.codeChange();
  }
  codeChange = () => {
    this.setState({
      checkCode: `${Login.GetCheckCode}/checkCode.jpg?date` + new Date()
    })
  }
  bindUser = (e)=>{
    e.stopPropagation();
    this.props.form.validateFields({force:true},(err)=>{
      if(!err){
        Toast.loading('Loding....',2);
        let values = this.props.form.getFieldsValue();
        values.openid = this.props.location.query.openid;
        console.log(values,'value');
        fetchData({
          url: Login.WeXinBind,
          body:querystring.stringify(values),
          err: err=> console.log(err,'err'),
          success: data=>{
            if(data.status){
              console.log(data,'data')
            }else{
              this.codeChange();
              this.setState({ bindFlag: true })
            }
          }
        })
        
      }
    })
  }
  render () {
    const { getFieldProps,getFieldError } = this.props.form;
    return (
      <div className='ysynet-login-form'>
        <form>
          <InputItem
            style={{maxWidth: 300, width: 280}}
            error={!!getFieldError('name')}
            {...getFieldProps('name',{
              rules: [
                { required: true }
              ]
            })}
            placeholder='请输入用户名'
          >
          </InputItem>
          <Item className={'pwd'} extra={<Switch
            {...getFieldProps('Switch2', {
              initialValue: false,
              valuePropName: 'checked',
            })}
            onClick={(checked) => { this.setState({checkFstate:checked }) }}
          />}>
          <div className={'ysy-child'}>
              <InputItem
                error={!!getFieldError('pwd')}
                {...getFieldProps('pwd',{
                  rules: [
                    { required: true }
                  ]
                })}
                type={this.state.checkFstate===false?'password':'text'}
                placeholder='请输入密码'
              />
            </div>
          </Item>
          {
          this.state.bindFlag && 
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
          <Button type="primary" style={{marginTop: 10}} onClick={this.bindUser}>绑定</Button>
        </form>
      </div>
    )
  }
}

export default BindForm;