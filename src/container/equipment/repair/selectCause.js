import React from 'react';
import {NavBar,Icon, List, Checkbox, Button, Toast} from 'antd-mobile';
import { hashHistory } from 'react-router';
const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item;
//故障原因
const troubleCause = {
    //人为原因
    HumanCause:[
        { value: '操作不当', label: '操作不当', selected: 0 },
        { value: '校正失效', label: '校正失效', selected: 0 },
        { value: '保养不当', label: '保养不当', selected: 0 }
    ],
    //设备原因
    EquipmentCause:[
        { value: '设备故障', label: '设备故障', selected: 0 }
    ],
    //环境原因
    EnvironmentalCause:[
        { value: '电源', label: '电源', selected: 0 },
        { value: '温度', label: '温度', selected: 0 },
        { value: '湿度', label: '湿度', selected: 0 },
        { value: '气温', label: '气温', selected: 0 },
        { value: '水源', label: '水源', selected: 0 },
        { value: '电磁干扰', label: '电磁干扰', selected: 0 }
    ]
}
class TroubCause extends React.Component{
    state = {
        data:troubleCause
    }
    onChange = (e,val,index,key) => {
        const data = this.state.data;
        switch(key){
            case 'human':
                data['HumanCause'][index].selected = 1;
                break;
            case 'equip':
                data['EquipmentCause'][index].selected = 1;
                break;
            case 'envir':
                data['EnvironmentalCause'][index].selected = 1;
                break;
            default:
                break;
        }
        this.setState({data})
    }
    onSubmit = (e)=>{
        e.preventDefault();
        const data = this.state.data;
        let selected = [],repairContentTyp = '',flag = false;
        data['HumanCause'].map((item,index)=>{
            if(item.selected === 1){
                if(!flag){
                    repairContentTyp += '人为原因-';
                }
                flag = true;
                selected.push(item);
                repairContentTyp +=item.value;
                repairContentTyp +='、';
                return null;
            }
            return null;
        });
        flag = false;
        repairContentTyp = repairContentTyp.substring(0,repairContentTyp.length-1);
        data['EquipmentCause'].map((item,index)=>{
            if(item.selected === 1){
                if(!flag){
                    repairContentTyp +='|设备原因-';
                }
                flag = true;
                selected.push(item);
                repairContentTyp +=item.value;
                return null;
            }
            return null;
        });
        flag = false;
        repairContentTyp = repairContentTyp.substring(0,repairContentTyp.length);
        data['EnvironmentalCause'].map((item,index)=>{
            if(item.selected === 1){
                if(!flag){
                    repairContentTyp +='|环境原因-';
                }
                flag = true
                selected.push(item);
                repairContentTyp +=item.value;
                repairContentTyp +='、';
                return null;
            }
            return null;
        });
        repairContentTyp = repairContentTyp.substring(0,repairContentTyp.length-1);
        console.log(repairContentTyp,'原因拼接');
        Toast.loading('loding',1,()=>{
            hashHistory.push({pathname:'/equipment/troubleEdit',state:{...this.props.location.state,afterRepairContentTyp:repairContentTyp}})
        })
    }
    render(){
        return this.props.children ||
         (<div>
             <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/troubleEdit',state:this.props.location.state})}
            >故障原因
            </NavBar>
            <div className={'ysynet-content'}>
                <List>
                    <Item><span style={{fontWeight:'bold'}}>故障原因(可多选)</span></Item>
                </List>
                <List renderHeader='人为原因'>
                    {
                        this.state.data.HumanCause.map((i,ind) => (
                            <CheckboxItem multipleLine key={i.value} onChange={(e) => this.onChange(e,i.value,ind,'human')}>
                                {i.label}
                            </CheckboxItem>
                        ))
                    }
                </List>
                <List renderHeader='设备原因'>
                    {
                        this.state.data.EquipmentCause.map((i,ind) => (
                            <CheckboxItem multipleLine key={i.value} onChange={(e) => this.onChange(e,i.value,ind,'equip')}>
                                {i.label}
                            </CheckboxItem>
                        ))
                    }
                </List>
                <List renderHeader='环境原因'>
                    {
                        this.state.data.EnvironmentalCause.map((i,ind) => (
                            <CheckboxItem multipleLine key={i.value} onChange={(e) => this.onChange(e,i.value,ind,'envir')}>
                                {i.label}
                            </CheckboxItem>
                        ))
                    }
                </List>
                <List>
                    <Button onClick={this.onSubmit}><span style={{color:'green'}}>确认</span></Button>
                </List>
            </div>
        </div>)
    }
}
export default TroubCause;