/* 
    @file 编辑工单信息
*/
import React, { Component } from 'react';
import { NavBar, Icon, List, Modal,DatePicker } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';

const operation = Modal.operation;
const Item = List.Item;
/* const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp); */

class EditOrderInfo extends Component{
    state = {
        repaireNature:'',
        repaireType: this.props.location.state.rrpairType,//维修类型
        rrpairFlag: this.props.location.state.rrpairFlag,//是否返修
        urgentFlag: this.props.location.state.urgentFlag,//紧急度
        spare: this.props.location.state.spare,//备用
        //completTime:this.props.location.state.completTime=== null ? now : this.props.location.state.completTime
    }
     
    //维修性质
    selectFix = ()=>{
        operation([
            { text: '故障维修', onPress: () => this.setState({ repaireNature:'故障维修' }) },
            { text: 'PM后维修', onPress: () => this.setState({ repaireNature:'PM后维修' }) },
            { text: '计量检测后维修', onPress: () => this.setState({ repaireNature:'计量检测后维修' }) },
        ])
    }
    //紧急度
    showUrgency = (value)=>{
        switch(value){
            case '10':
                return <span style={{color:'#FA6268'}}>紧急</span>;
            case '20':
                return <span style={{color:'#F29736'}}>急</span>;
            case '30':
                return <span style={{color:'#20B78B'}}>一般</span>;
            default:
                break;
        }
    }
    onSubmit = (e)=>{

    }
    cancel = ()=>{
        hashHistory.push({pathname: '/equipment/equipmentDetail',state:this.props.location.state})
    }
    render(){
        console.log(this.props,'11')
        const { repaireNature, repaireType, rrpairFlag, urgentFlag, spare } = this.state;
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
                    <Item multipleLine arrow="horizontal" onClick={this.selectFix} extra={repaireNature ===''?'暂无':repaireNature}>
                        <span>维修性质</span>
                    </Item>
                    <Item arrow="horizontal" onClick={()=>hashHistory.push({pathname:'/equipment/selRepaireType',state:this.props.location.state})} extra={repaireType ==='01'?'外修':'内修'}>
                        <span>维修类型</span>
                    </Item>
                    <Item arrow="horizontal" onClick={()=>hashHistory.push({pathname:'/equipment/BackRepaire',state:this.props.location.state})} extra={rrpairFlag ==='01'?'是':'否'}>
                        <span>是否返修</span>
                    </Item>
                    <Item arrow="horizontal" onClick={()=>hashHistory.push({pathname:'/equipment/urgencys',state:this.props.location.state})} extra={this.showUrgency(urgentFlag)}>
                        <span>紧急度</span>
                    </Item>
                    <Item arrow="horizontal" onClick={()=>hashHistory.push({pathname:'/equipment/spare',state:this.props.location.state})} extra={spare==='01'?'有':'无'}>
                        <span>备用机</span>
                    </Item>
                    <DatePicker
                        //value={new Date(Date.parse(this.state.completTime.replace(/-/g,"/")))}
                        onChange={date => this.setState({ completTime:date })}
                        >
                        <List.Item arrow="horizontal" extra={this.state.completTime}>预计完成时间</List.Item>
                    </DatePicker>
                </List>
                <div className={'ysynet-detail-foot'}>
                    <div className={'foot-button'}>
                        <a className={'btn-cancel'} onClick={this.cancel}>取消</a>
                        <a className={'btn-submit'} onClick={this.onSubmit}>提交</a>
                    </div>
                </div>
            </div>
        </div>)
    }
}

const WrapperEditOrderInfo = createForm()(EditOrderInfo);
export default WrapperEditOrderInfo;
