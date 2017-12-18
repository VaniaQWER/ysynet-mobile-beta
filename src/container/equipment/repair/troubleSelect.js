import React from 'react';
import {NavBar,Icon, List, Checkbox, Button} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
//故障现象
const checkboxOps = [
    { value: 0, label: '部分功能失效', selected: 0 },
    { value: 1, label: '开机后死机', selected: 0 },
    { value: 2, label: '其他', selected: 0 },
    { value: 3, label: '性能指标偏离', selected: 0 },
    { value: 4, label: '不规则或偶发故障', selected: 0 }
  ];
  //故障类型
const troubleTypes = [
    { value: 0, label: '机械故障', selected: 0 },
    { value: 1, label: '图像显示异常', selected: 0 },
    { value: 2, label: '电器故障', selected: 0 },
    { value: 3, label: '其他', selected: 0 },
]

class TroubleSelect extends React.Component{
    state = {
        data: this.props.location.state.key === '1'? checkboxOps:troubleTypes
    }
    onChange = (e,val,index) => {
        const { data } = this.state;
        data[index].selected = 1;
        this.setState({data:data})
      }
    getTrouble = ()=>{
        let selected = [];
        const { data } = this.state;
        data.map((item,index)=>{
            if(item.selected === 1){
                selected.push(item.value);
                return null;
            };
            return null;
        })
       console.log(selected,'勾选的选项value');
       /* this.props.location.state.key==='1'?
       troubleTypes = selected
       :
       troubleCause = selected
       hashHistory.push({pathname:'/equipment/editTroubdesc',state:{...this.props.location.state,troubleTypes:selected,troubleCause:troubleCause}}) */
    }
    render(){
        
        return (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/troubleEdit',state:this.props.location.state})}
            >故障现象
            </NavBar>
            <div className={'ysynet-content'}>
                <List>
                    <Item><span style={{fontWeight:'bold'}}>故障现象(可多选)</span></Item>
                </List>
                <List>
                    {this.state.data.map((i,ind) => (
                        <CheckboxItem multipleLine key={i.value} onChange={(e) => this.onChange(e,i.value,ind)}>
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