/* 
    @file 编辑工单信息
*/
import React, { Component } from 'react';
import { NavBar, Icon, List,Radio } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';

const RadioItem = Radio.RadioItem;
const Item = List.Item;
//内修，外修
const rrpairType = [
    {
        label:'外修',
        value:'01'
    },{
        label:'内修',
        value:'00'
    }
]
class EditOrderInfo extends Component{
    state = {
        rrpairTypeValue:''//内修，外修
    }
    onChange = (value)=>{
        this.setState({ rrpairTypeValue:value });
    }
    render(){
        const { rrpairTypeValue } = this.state;
        return this.props.children ||
        (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/equipmentDetail',state:this.props.location.state})}
            >编辑工单信息
            </NavBar>
            <div className={'ysynet-content'}>
                <List>
                    <Item multipleLine arrow="horizontal" onClick={()=>console.log('添加实际费用')} extra={'暂无'}>
                        <span>维修性质</span>
                    </Item>
                    <Item>
                        <div className={'ysynet-radio'}>
                            <div>
                                <span>维修类型</span>
                            </div>
                        </div>
                        <div>
                        {rrpairType.map(i => (
                            <RadioItem key={i.value} checked={rrpairTypeValue === i.value} onChange={() => this.onChange(i.value)}>
                                {i.label}
                            </RadioItem>
                            ))}
                        </div>

                    </Item>
                </List>
            </div>
        </div>)
    }
}

const WrapperEditOrderInfo = createForm()(EditOrderInfo);
export default WrapperEditOrderInfo;
