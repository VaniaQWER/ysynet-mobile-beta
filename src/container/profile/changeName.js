import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import {
  NavBar, 
  Icon, 
  WhiteSpace,
  List,
  InputItem , 
  Button,
  WingBlank,
  Toast
 } from 'antd-mobile';

import { connect } from 'react-redux';

import { updateUser } from '../../action';

import { fetchData } from '../../utils/index';

import {User} from '../../api';

import querystring from 'querystring';


/**
 * @summary 修改用户名
 */
class ChangeUserName extends Component {

  state = {
    hasError: false,
    qualified:false
  }
  getEntrylen=(val)=>{
    var len = 0;
    for (var i = 0; i < val.length; i++) {
       var length = val.charCodeAt(i);
       if(length>=0&&length<=128)
        {
            len += 1;
        }
        else
        {
            len += 2;
        }
    }
    return len;
  }
  onSubmit = (e) => {
    e.stopPropagation()
    const vf=this.props.form.validateFields
    let oio
    vf((error, values) => {
      let vals=values.newUserName
      if(vals===undefined){
        this.setState({
          hasError: true,
        });
        Toast.info('用户名不能为空!');
        return
      }
      if (!error) {
        let val=vals.trim()
        
        if (val!=='') {

          let len = 0;           
                         
          for (let i in val){
            let length = val.charCodeAt(i);

            if(length<0||length>128)
            {
                len += 2
            }else{
                len += 1
            }
          }

          const han = /[\u4e00-\u9fa5]/
          const hanzi = /^[\u4e00-\u9fa5]+$/
          // const regname=/^[a-zA-Z0-9]{2,15}$/
          const regname=/^[a-zA-Z\d]\w{3,11}[a-zA-Z\d]$/
          
          if(han.test(val)){
            if(val.match(hanzi)){            
              if(2<len&&len<30){
                //this.props.setUser(val);
                this.setState({
                  hasError: false,
                });
                hashHistory.push({pathname: '/profile/user'})
                oio=val

              }else{

                this.setState({
                  hasError: true,
                });
                Toast.info('如果全是汉字，用户名必须2-30位!');
              }
            }
            else if(2<len&&len<15){
              //this.props.setUser(val);
              
              this.setState({
                hasError: false,
              });
              hashHistory.push({pathname: '/profile/user'})
              oio=val
            }
            else{
              
              this.setState({
                hasError: true,
              });
              Toast.info('如果汉字字母组合，用户名必须2-15位!');
            }
          }
            else if(val.match(regname)){
              //this.props.setUser(val);
              
              this.setState({
                hasError: false,
              });
              hashHistory.push({pathname: '/profile/user'})
              oio=val
              
            }else{
                this.setState({
                  hasError: true,
                });
                Toast.info('如果字母数字组合，用户名必须2-15位!');
              }
            }
        }
    })
      
      const userid=this.props.location.state.userId

      fetchData({
        url:`${User.updateUser}`,
        body:querystring.stringify({userName:oio,userId:userid}),
        success:data=>{
          //console.log(data)
        },
        err:err=>{
          console.log(err)
        }
      })
  }
  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('用户名必须2-15位!');
    }
  }
  onFocus=(e)=>{
    if (this.state.hasError) {
      this.setState({hasError:false})
    }
  }
  onKeyUp=(e)=>{
    // e.target.value=e.target.value.replace(/\s/g,'');
    e.target.value=e.target.value.replace(/^\s+$/g,'');
    //e.target.setSelectionRange(0,4)
    //changeCursorPos
    //this.setSelectionRange(vLen,vLen)
    //this.setSelectionRange(12,12)
  }
  // componentDidMount(){
  //   console.log(this.state.inputRef.refs.input)
  //   //console.log(this.refs.nameNode.value)
  //   this.props.form.setFieldsInitialValue(
  //     (error, values) => {
  //       this.props.form.newUserName
  //     }
  //     )

  //   console.log(this.props.form)
  // }
  // componentDidMount() {
  //     //console.log(inputRef)
  //     console.log(this.refs.inputRef.refs.input)
  //     const input = this.inputRef.refs.input

  //     input.focus()
  //     input.setSelectionRange(0, input.value.length);
    
  // }


  render () {

    const { getFieldProps } = this.props.form
    const userName=this.props.location.state.userName
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: '/profile/user'})}
        >
          修改用户名
        </NavBar>

        <WhiteSpace size='md' />
<List>
          <InputItem
          onFocus={this.onFocus}
          error={this.state.hasError}
          onErrorClick={this.onErrorClick}
          onKeyUp={this.onKeyUp}
          //defaultValue={userName}
          
          autoFocus="autoFocus"
              {...getFieldProps('newUserName', 
                // rules: [
                //   { required: true }
                // ]
                //{ref:c => inputRef = c}
                {initialValue:userName}
              )}
              placeholder="修改用户名"
              clear
              moneyKeyboardAlign="left"
              // onBlur={(v) => {console.log(v)}}
            />
</List>
        <WingBlank className="my_button">
          <Button type="primary" onClick={this.onSubmit}>保存</Button><WhiteSpace />
        </WingBlank>
      </div>  
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (text) => {
      dispatch(updateUser.updateUser(text));
    }
  }
}

const ChangeUserNames = createForm()(ChangeUserName)
const ChangeUserNamesss=connect(null,mapDispatchToProps)(ChangeUserNames)
export default ChangeUserNamesss


