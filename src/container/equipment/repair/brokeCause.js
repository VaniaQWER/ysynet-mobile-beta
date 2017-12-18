/**
 * @file 故障类型 页面
 */
import React from 'react';
import {NavBar,Icon, List, Checkbox, Button,Toast} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
//故障类型
const troubleTypes = [
    { value: '机械故障', label: '机械故障', selected: 0 },
    { value: '图像显示异常', label: '图像显示异常', selected: 0 },
    { value: '电器故障', label: '电器故障', selected: 0 },
    { value: '其他', label: '其他', selected: 0 },
];
class TroubleSelect extends React.Component{
    state = {
        data:troubleTypes
    }
    onChange = (e,val,index) => {
        const { data } = this.state;
        data[index].selected = 1;
        this.setState({data:data})
      }
    getTrouble = ()=>{
        let selected = [],repairContentType = '';
        const { data } = this.state;
        data.map((item,index)=>{
            if(item.selected === 1){
                selected.push(item.value);
                repairContentType +=item.value;
                repairContentType+='、';
                return null;
            };
            return null;
        })
        repairContentType = repairContentType.substring(0,repairContentType.length-1);
        console.log(repairContentType,'原因')
       console.log(selected,'勾选的选项value');
        Toast.loading('loding',1,()=>{
            hashHistory.push({pathname:'/equipment/troubleEdit',state:{...this.props.location.state,repairContentType:repairContentType}})
        })
    }
    render(){
        
        return (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/troubleEdit',state:this.props.location.state})}
            >故障类型
            </NavBar>
            <div className={'ysynet-content'}>
                <List>
                    <Item><span style={{fontWeight:'bold'}}>故障类型(可多选)</span></Item>
                </List>
                <List>
                    {this.state.data.map((i,ind) => (
                        <CheckboxItem multipleLine key={i.value}  onChange={(e) => this.onChange(e,i.value,ind)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                    <Button onClick={this.getTrouble}><span style={{color:'green'}}>确认</span></Button>
                </List>
            </div>
        </div>)
    }
}
const WrapperTroubleForm = createForm()(TroubleSelect);
export default WrapperTroubleForm;