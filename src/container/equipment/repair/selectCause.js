import React from 'react';
import {NavBar,Icon, List, Checkbox, Button} from 'antd-mobile';
import { hashHistory } from 'react-router';
const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item;
//故障原因
const troubleCause = {
    //人为原因
    HumanCause:[
        { value: 0, label: '操作不当', selected: 0 },
        { value: 1, label: '校正失效', selected: 0 },
        { value: 2, label: '保养不当', selected: 0 }
    ],
    //设备原因
    EquipmentCause:[
        { value: 0, label: '设备故障', selected: 0 }
    ],
    //环境原因
    EnvironmentalCause:[
        { value: 0, label: '电源', selected: 0 },
        { value: 1, label: '温度', selected: 0 },
        { value: 2, label: '湿度', selected: 0 },
        { value: 4, label: '气温', selected: 0 },
        { value: 5, label: '水源', selected: 0 },
        { value: 6, label: '电磁干扰', selected: 0 }
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
        //const data = this.state.data;
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