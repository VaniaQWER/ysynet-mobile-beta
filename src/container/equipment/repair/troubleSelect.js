/** 
   @file 故障现象
*/
import React from 'react';
import {NavBar,Icon, List, Checkbox, Button, Toast} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;

//故障现象
const checkboxOps = [
    { value: '部分功能失效', label: '部分功能失效', selected: 0 },
    { value: '开机后死机', label: '开机后死机', selected: 0 },
    { value: '性能指标偏离', label: '性能指标偏离', selected: 0 },
    { value: '不规则或偶发故障', label: '不规则或偶发故障', selected: 0 },
    { value: '其他', label: '其他', selected: 0 }
];
class TroubleSelect extends React.Component{
    state = {
        data: checkboxOps
    }
    onChange = (e,val,index) => {
        const { data } = this.state;
        data[index].selected = 1;
        this.setState({data:data})
      }
    getTrouble = ()=>{
        let selected = [],faultDescribe = '';
        const { data } = this.state;
        data.map((item,index)=>{
            if(item.selected === 1){
                selected.push(item.value);
                faultDescribe +=item.value;
                faultDescribe +='、';
                return null;
            };
            return null;
        });
       faultDescribe = faultDescribe.substring(0,faultDescribe.length-1)
       console.log(selected,'勾选的选项value');
       console.log(faultDescribe,'原因')
       Toast.loading('loding',1,()=>{
           hashHistory.push({pathname:'/equipment/editTroubdesc',state:{...this.props.location.state,faultDescribe:faultDescribe}});
       })
    }
    render(){
        console.log(this.props,'111')
        return (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/editTroubdesc',state:this.props.location.state})}
            >故障现象
            </NavBar>
            <div className={'ysynet-content'}>
                <List>
                    <Item><span style={{fontWeight:'bold'}}>故障现象(可多选)</span></Item>
                </List>
                <List>
                    {this.state.data.map((i,ind) => (
                        <CheckboxItem multipleLine key={i.value} defaultChecked={this.props.location.state.repairContentTyp===i.value?true:false} onChange={(e) => this.onChange(e,i.value,ind)}>
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