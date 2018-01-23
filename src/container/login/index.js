import React, { Component } from 'react';
import { Tabs, WhiteSpace, WingBlank } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { createForm } from 'rc-form';
//import { fetchData } from '../../utils';
import BindForm from './bind';
import LoginForm from './login';
import './style.css';
/**
 * @summary 登录组件
 */
function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}
const tabs = [
  { title:  '微信绑定' },
  { title:  '用户名登录'}
];

const browser={
  versions:function(){
      var u = navigator.userAgent
      return {
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,//火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
          iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
          weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
          qq: u.match(/\sQQ/i) === " qq" //是否QQ
      };
  }()
}

const tabStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}
const BindFormWrapper = createForm()(BindForm);
const LoginFormWrapper = createForm()(LoginForm);
class Login extends Component {
  state = {
    isWeiXin : false
  }
  //判断浏览器
  componentWillMount = ()=>{
    if(browser.versions.weixin){
      alert('微信端....')
    }else{
      if(browser.versions.android){
        alert('非微信，安卓端')
      }else if(browser.versions.ios){
        alert('非微信，ios');
      }else{
        alert('其他');
      }
    }
  }

  render () {
    
    return (
      <div className={'ysynet-welcome'}>
        <WingBlank>
          <WhiteSpace />
          <div className={'logo'}>
          </div>  
          <StickyContainer className={'ysynet-login'}>
            <Tabs 
              tabs={tabs}
              initalPage={2}
              renderTabBar={renderTabBar}
            >
              <div style={tabStyle}>
                {<BindFormWrapper/>}
              </div>
              <div style={tabStyle}>
                {<LoginFormWrapper/>}
              </div>
            </Tabs>
          </StickyContainer>
          <WhiteSpace />
        </WingBlank>  
      </div>
    )
  }
}

export default Login;