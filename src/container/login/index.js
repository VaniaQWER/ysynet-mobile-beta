import React, { Component } from 'react';
import { Tabs, WhiteSpace, WingBlank } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { createForm } from 'rc-form';
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
  { title: '微信绑定' },
  { title: '用户名登录' }
];
const tabStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}
const BindFormWrapper = createForm()(BindForm);
const LoginFormWrapper = createForm()(LoginForm);
class Login extends Component {
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
              initalPage={'t2'}
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