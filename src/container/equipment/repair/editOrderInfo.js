/* 
    @file 编辑工单信息
*/
import React, { Component } from 'react';
import { NavBar, Icon, List, Modal,DatePicker,Toast } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import { fetchData } from '../../../utils/index';
import querystring from 'querystring';
const operation = Modal.operation;
const Item = List.Item;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class EditOrderInfo extends Component{
    state = {
        orderType: this.props.location.state.orderType, //故障类型
        repaireType: this.props.location.state.rrpairType, //维修类型
        rrpairFlag: this.props.location.state.rrpairFlag, //是否返修
        urgentFlag: this.props.location.state.urgentFlag, //紧急度
        spare: this.props.location.state.spare, //备用
        completTime:this.props.location.state.completTime? new Date(this.props.location.state.completTime.replace(/-/g,"/")):now, //预计完成时间
        formatDate:''
    }
     
    //维修性质
    selectFix = ()=>{
        operation([
            { text: '故障维修', onPress: () => { this.setState({ afterOrderType:'故障维修' })} },
            { text: 'PM后维修', onPress: () => { this.setState({ afterOrderType:'PM后维修' })} },
            { text: '计量检测后维修', onPress: () => { this.setState({ afterOrderType:'计量检测后维修' })} },
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
    
    changeDate = (date)=>{
        let d = new Date(date);
        let formatDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        console.log(formatDate,'formatDate');
        this.props.location.state.formatDate = formatDate;
        this.setState({ completTime:date, formatDate: formatDate });
    }
    onSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state.repaireNature,111);
        const baseData = this.props.location.state;
        this.props.form.validateFields({ force: true }, (err) => {
            if(!err){
                let values = {};
                values.rrpairOrder = baseData.rrpairOrder;
                baseData.orderType = values.orderType = this.state.afterOrderType ? this.state.afterOrderType : this.state.orderType;
                baseData.rrpairType = values.rrpairType = baseData.afterRepairType ? baseData.afterRepairType:baseData.rrpairType;
                baseData.rrpairFlag =  values.rrpairFlag = baseData.afterRrpairFlag ? baseData.afterRrpairFlag:baseData.rrpairFlag;
                baseData.spare =  values.spare = baseData.afterSpare ? baseData.afterSpare: baseData.spare;
                baseData.completTime =  values.completTime = this.state.formatDate;
                console.log(values,'values');
                fetchData({
                    url: 'rrpairOrderController/updateRrpairInfo',
                    body: querystring.stringify(values),
                    error: err=>{
                        console.log(err)
                    },
                    success: data=>{
                        if(data.status){
                            Toast.success('操作成功',2,()=>{
                                hashHistory.push({pathname:'equipment/equipmentDetail',state:baseData})
                            })
                        }else{
                            Toast.fail(data.msg);
                        }
                    }
                })
            }
        })
    }
    cancel = ()=>{
        hashHistory.push({pathname: '/equipment/equipmentDetail',state:this.props.location.state})
    }
    render(){
        console.log(this.props,'11')
        const { afterOrderType,orderType, repaireType, rrpairFlag, urgentFlag, spare } = this.state;
        const {  afterRepairType, afterRrpairFlag, afterUrgenFlag, afterSpare } = this.props.location.state;
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
                    <Item multipleLine arrow="horizontal" onClick={this.selectFix} extra={afterOrderType? afterOrderType: orderType === null ?'暂无':orderType}>
                        <span>维修性质</span>
                    </Item>
                    <Item arrow="horizontal" onClick={()=>hashHistory.push({pathname:'/equipment/selRepaireType',state:{...this.props.location.state}})} extra={afterRepairType ? afterRepairType ==='00'? '内修':'外修':repaireType==='00'?'内修':'外修'}>
                        <span>维修类型</span>
                    </Item>
                    <Item arrow="horizontal" onClick={()=>hashHistory.push({pathname:'/equipment/BackRepaire',state:{...this.props.location.state}})} extra={afterRrpairFlag? afterRrpairFlag ==='01'?'是':'否': rrpairFlag ==='01'?'是':'否'}>
                        <span>是否返修</span>
                    </Item>
                    <Item arrow="horizontal" onClick={()=>hashHistory.push({pathname:'/equipment/urgencys',state:{...this.props.location.state}})} extra={afterUrgenFlag? this.showUrgency(afterUrgenFlag):this.showUrgency(urgentFlag)}>
                        <span>紧急度</span>
                    </Item>
                    <Item arrow="horizontal" onClick={()=>hashHistory.push({pathname:'/equipment/spare',state:{...this.props.location.state}})} extra={afterSpare? afterSpare==='01'?'有':'无':spare ==='01'?'有':'无'}>
                        <span>备用机</span>
                    </Item>
                    <DatePicker
                        value={this.state.completTime}
                        onChange={date => this.changeDate(date)}
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
