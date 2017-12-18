/**
    @file 是否返修选择
*/
import React, { Component } from 'react';
import {NavBar, Icon, List, Radio} from 'antd-mobile';
import { hashHistory } from 'react-router';

const RadioItem = Radio.RadioItem;
class BackRepaire extends Component{
    state = {
        value:this.props.location.state.rrpairFlag
    }
    onChange =(value) =>{
        this.setState({ value });
    }
    render(){
        console.log(this.props.location.state.rrpairFlag,'rr')
        const data = [
            { value: '01', label: '是' },
            { value: '00', label: '否' },
          ];
          const { value } = this.state;
        return this.props.children ||
        (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/editOrder',state: {...this.props.location.state,rrpairFlag:this.state.value}})}
            >是否返修
            </NavBar>
            <div className={'ysynet-content'}>
                <List>
                    {data.map(i => (
                    <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
                        {i.label}
                    </RadioItem>
                    ))}
                </List> 
            </div>
        </div>
        )
    }
}
export default BackRepaire;