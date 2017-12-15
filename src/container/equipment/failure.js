import React, { Component } from 'react';
import { NavBar, Icon,List, Radio} from 'antd-mobile';
import { hashHistory } from 'react-router';

/**
 * @summary 资产档案列表 --详情1-报修申请--故障现象
 */
const RadioItem = Radio.RadioItem;
class FailureList extends Component {
    state = {
        value: this.props.location.state.failure,
    }
    onChange =(value) =>{
        console.log('checkbox');
        this.setState({ value });
    }

    render(){
        const data = [
            { value: "部分功能失效", label: '部分功能失效' },
            { value: "开机后死机", label: '开机后死机' },
            { value: "性能指标偏离", label: '性能指标偏离' },
            { value: "不规则障碍", label: '不规则障碍' },
            { value: "其他", label: '其他' },
          ];

          const { value } = this.state;

        return this.props.children || (
            <div>
                <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/applyRepair',state:{...this.props.location.state,failure:this.state.value}})}
                >故障现象
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
export default FailureList;