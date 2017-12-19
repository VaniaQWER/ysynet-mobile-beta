/**
    @file 维修类型选择
*/
import React, { Component } from 'react';
import {NavBar, Icon, List, Radio} from 'antd-mobile';
import { hashHistory } from 'react-router';

const RadioItem = Radio.RadioItem;
class SpareList extends Component{
    state = {
        value:this.props.location.state.spare
    }
    onChange =(value) =>{
        this.setState({ value });
    }
    render(){
        const data = [
            { value: '01', label: '有' },
            { value: '00', label: '无' },
          ];
          const { value } = this.state;
        return this.props.children ||
        (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/editOrder',state: {...this.props.location.state,afterSpare:this.state.value}})}
            >备用机
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
export default SpareList;