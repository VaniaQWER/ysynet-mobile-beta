import React, { Component } from 'react';
import { NavBar,Icon } from  'antd-mobile';
import { hashHistory } from 'react-router';
class DoImg extends Component {
    render(){
        const pathname = this.props.location.state.backlink || '/equipment';
        return this.props.children || (
            <div>
                <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: pathname,state:this.props.location.state})}
                >正在建设中
                </NavBar>
                <div className={'ysynet-content'}>
                    <img style={{marginTop:"20%"}} alt="建设中图片..." src={require("../../assets/do@2x.png")} width="100%"/>
                    <p style={{textAlign:'center',marginTop:'40px',color:'#666'}}>页面正在建设中...</p>
                </div>
            </div>
        )
    }
}

export default DoImg;