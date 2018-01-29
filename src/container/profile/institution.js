import React, { Component } from 'react';
import { NavBar, Icon, List, WhiteSpace, WingBlank} from 'antd-mobile';
import { hashHistory } from 'react-router';

import InstitutionInfo from '../../component/institution_info';

import { fetchData } from '../../utils';
import querystring from 'querystring';
import {User} from '../../api';

/**
 * @summary 我的机构
 */

class Institution extends Component{
  state={
    insInfor:null
  }
  // componentWillMount(){
  //     window.Fetch('/insInfo')
  //     .then(res=>{
  //       return res.json()
  //     }).then(data=>{
  //       this.setState({insInfor:data})
  //     })
  // }deptname

  componentDidMount(){
      
      fetchData({
        url:`${User.FINDMYDEPT}`,
        body:querystring.stringify({flag:'01'}),
        success: data=>{
          //data.result
          const deptname=data[0].deptname
  
          this.setState({insInfor:deptname})          
          
          if(data.status && data.result==='success'){
            console.log(data)
          }
        
        },
        err: err =>{
          console.log('不正确')
        }
      })
  }

  render(){
  const user=this.props.location.state
    return this.props.children ||(
      <div>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => hashHistory.push({pathname: '/profile'})}
      >
        我的机构
      </NavBar>
      <InstitutionInfo ins={user.orgName} onClick={()=>console.log(999)}/>
      <WhiteSpace size='md' />
      <WingBlank>
      <span className="explain">我在该企业的信息</span>
      </WingBlank>
      <WhiteSpace size='md'/>
      
        <List.Item extra={user.userName}
        onClick={this.changeName} 
        >
        用户名
        </List.Item>


        <List.Item extra={user.mobilePhone}
        onClick={this.changeNumber}
        >手机</List.Item>

        <List.Item extra={this.state.insInfor}
        onClick={this.unBind}
        >部门</List.Item>

        <List.Item extra={user.groups===null?'':this.state.insInfor.groups}
        onClick={this.changePw}
        >用户组</List.Item>
  </div>
    )
  }
}

export default Institution

