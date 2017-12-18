import React, { Component } from 'react';
import { NavBar, Icon, List, WhiteSpace,Tabs, Accordion, Modal} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { fetchData } from '../../../utils/index';
const Item = List.Item;
const alert = Modal.alert;
/**
 * @file 维修单详情
 */
const actions = {
    tfReamrk: (action)=> <a onClick={(action)}>备注</a>,
    accept: (action)=> <a onClick={(action)}>接修</a>,
    finish: (action)=> <a onClick={(action)}>完成维修</a>,
    transferOut: (action)=> <a onClick={(action)}>转外修</a>,
    transferIn: (action)=> <a onClick={(action)}>转内修</a>,
    checkOver: (action)=> <a onClick={(action)}>验收通过</a>,
    checkFailure: (action)=> <a onClick={(action)}>验收不通过</a>,
    evaluate:(action)=> <a onClick={(action)}>评价</a>
}

class RepareList extends Component{
    state = {
        baseData:this.props.location.state,
        historyData: []
    }
    /* componentDidMount = ()=>{
        fetchData({
            url:'rrpairOrderController/selectRrpairList',
            body:{

            },
        },(data)=>{

        })
    } */
    AccordionHeader = (baseData)=>{
        return (
                <div className={'equiment'}>
                    <span className={'con_title'}>{baseData.equipmentName}</span>
                        {
                            baseData.useStatus?baseData.useStatus.map((item,index)=>
                                <span className={item.TF_CLO_CODE==='00'?'tag maintain':(item.TF_CLO_CODE==='01'?'tag out_maintain':'tag not_maintain')} key={index}>{item.TF_CLO_NAME}</span>
                            )
                            :
                            null
                        }
                </div>
        )
    }
    //底部按钮
    ButtonActions = (value,type)=>{
        const baseData = this.state.baseData;
        if(value ==='10'){
            return (<div className={'button-group'}>
                        {actions.tfReamrk(this.tfReamrk.bind(this,baseData))}
                        {actions.accept(this.accept.bind(this,baseData))}
                    </div>);
        }
        else if(value ==='30'){
            if(type==='01'){
                return (<div className={'button-group'}>
                        {actions.tfReamrk(this.tfReamrk.bind(this,baseData))}
                        {actions.finish(this.finish.bind(this,baseData))}
                        {actions.transferIn(this.transferIn.bind(this,baseData))}
                    </div>)
            }else{
                return (<div className={'button-group'}>
                        {actions.tfReamrk(this.tfReamrk.bind(this,baseData))}
                        {actions.finish(this.finish.bind(this,baseData))}
                        {actions.transferOut(this.transferOut.bind(this,baseData))}
                    </div>)
            }
            
        }
        else if(value === '50'){
            return (<div className={'button-group'}>
                    {actions.tfReamrk(this.tfReamrk.bind(this,baseData))}
                    {actions.checkOver(this.checkOver.bind(this,baseData))}
                    {actions.checkFailure(this.checkFailure.bind(this,baseData))}
                </div>);
        }
        else {
            return (<div className={'button-group'}>
                    {actions.tfReamrk(this.tfReamrk.bind(this,baseData))}
                    {actions.evaluate(this.evaluate.bind(this,baseData))}
                </div>);
        }
    }
    //历史工单card 
    historyCard = (item)=>{
        return (
            <List key={-1}>
                <Item multipleLine>
                    <div className={'order-desc'}>
                        <p><span>工单号：</span><span className={'order-No'}>{item.rrpairOrder}</span></p>
                        <p>维修中</p>
                    </div>
                    <div className={'order-summary'}>
                        <p className={'address'}>
                            <span>{item.useDept?item.useDept:'--'}</span>
                            <span> | </span>
                            <span>{item.address?item.address:'--'}</span>
                        </p>
                        <p className={'property'}>
                            <span>申报人: </span>
                            <span>{item.rrpairUserName}<a className={'grassColor'} style={{marginLeft:8}}>{item.rrpairPhone}</a></span>
                        </p>
                        <p className={'updateTime'}>
                            <span>更新时间: </span>
                            <span>{item.modifyTime}</span>
                        </p>
                    </div>
                </Item>
            </List>
        )
    }
    //维修状态
    showFixStatus = (value)=>{
        switch(value){
            case '10':
                return <span style={{color:'#ffbf00'}}>{'待接修'}</span>;
            case '30':
                return <span style={{color:'#28C7A0'}}>{'维修中'}</span>;
            case '50':
                return <span style={{color:'#000'}}>{'待验收'}</span>;
            case '80':
                return <span style={{color:'#f00'}}>{'已关闭'}</span>;
            default:
                break;
        }
    }
    //紧急度
    urgentFlag = (value)=>{
        switch(value){
            case '10':
                return <span>紧急</span>;
            case '20':
                return <span>很急</span>;
            case '30':
                return <span>一般</span>;
            default:
                break;
        }
    }
    redirect = (url, record) => {
        hashHistory.push({
            pathname: url,
            state: record
        })
    }
    tfReamrk = (record)=>{
        this.redirect('/equipment/addRemark',record)
    }
    //接修
    accept = (record)=>{
        alert('接修', '是否确认接修？', [
            { text: '取消', style: 'default' },
            { text: '确定', onPress: () => 
                this.ChangeState('10','30')
            }
          ]);
    }
    //完成维修
    finish = (record)=>{
        alert('完成维修', '是否确认完成维修？', [
            { text: '取消', style: 'default' },
            { text: '确定', onPress: () => 
                this.ChangeState('50','80')
            }
          ]);
    }
    //转内修
    transferIn = (record)=>{
        alert('转内修', '是否确认转内修？', [
            { text: '取消', style: 'default' },
            { text: '确定', onPress: () => 
                this.ChangeState('30','30','00')
            }
          ]);
        
    }
    //转外修
    transferOut = (record)=>{
        alert('转内修', '是否确认转外修？', [
            { text: '取消', style: 'default' },
            { text: '确定', onPress: () => 
                this.ChangeState('30','30','01')
            }
          ]);
        
    }
    //验收通过
    checkOver = (record)=>{
        alert('验收通过', '是否确认转验收通过？', [
            { text: '取消', style: 'default' },
            { text: '确定', onPress: () => 
                this.ChangeState('50','80',record.rrpairType,'1')
            }
          ]);
        
    }
    //验收不通过
    checkFailure = (record)=>{
        alert('验收不通过', '是否确认转验收不通过？', [
            { text: '取消', style: 'default' },
            { text: '确定', onPress: () => 
                this.ChangeState('50','80',record.rrpairType,'0')
            }
          ]);
    }
    //评价
    evaluate = (record)=>{
        console.log('评价')
    }
    /* 
        orderFstate: 当前状态
        assersNextRecord：转变后状态
        rrpairType: 维修单类型转变（00内修，01外修）
        isPass: 验收是否通过
    */
    ChangeState = (orderFstate,next,rrpairType,isPass)=>{
        const { baseData } = this.state;
        fetchData({
            url:'rrpairOrderController/updateRrpairFstate',
            body:{
                rrpairOrder:baseData.rrpairOrder,
                assersNowRecord:orderFstate,
                assersNextRecord:next,
                rrpairType:rrpairType,
                isPass:isPass
            }
        },(data)=>{
            if(data.result){
                console.log('Ok');
            }else{
                console.log('Not ok');
            }
        })
    }
    render(){
        const baseData = this.props.location.state;
        console.log(baseData,'baseData');
        
        const tabs = [
            { title: '维护信息' },
            { title: '工单信息' },
            { title: '历史工单' }
          ];
        
        return (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/equipmentRepaire'})}
            >
            维修单详情
            </NavBar>
            <div className={'detail-content'}>
                <List className={'ysynet-repaire-detail'}>
                    <Item arrow="horizontal" onClick={() => {}}>
                        <div className={'title'}>
                            <span>{baseData.rrpairOrder}</span>
                            <span>{this.showFixStatus(baseData.orderFstate)}</span>
                        </div>
                    </Item>
                </List>
                <WhiteSpace size='md' />
                <div className={'ysynet-repaire-detail'}>
                    <div className={'pd13 product'}>
                        <List>
                            <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                                <Accordion.Panel header={this.AccordionHeader(baseData)}>
                                    <List className="my-list">
                                        <List>
                                            <Item>
                                                <p><span>{baseData.spec?baseData.spec:'--'}</span></p>
                                                <p><span>{baseData.useDept?baseData.useDept:'--'}</span><label>|</label><span>{baseData.address}</span></p>
                                            </Item>
                                        </List>
                                    </List>
                                </Accordion.Panel>
                            </Accordion>
                        </List>
                    </div>
                </div>
                <Tabs tabs={tabs}
                    initialPage={0}
                >
                    <div className={'maintain-info'}>
                        <WhiteSpace size='md' />
                        <div className={'trouble-desc'}>
                            <List>
                                <Item multipleLine extra={<a className={'grassColor'} onClick={()=>hashHistory.push({pathname:'/equipment/editTroubdesc',state:{...baseData}})}>编辑</a>}>
                                    <span className={'con_title'}>故障描述</span>
                                </Item>
                            </List>
                            <List>
                                <Item multipleLine>{baseData.faultDescribe?baseData.faultDescribe:'暂无现象'}</Item>
                            </List>
                            <List>
                                <Item multipleLine>{baseData.faultWords?baseData.faultWords:'暂无'}</Item>
                            </List>
                        </div>
                        <WhiteSpace size='md' />
                        <div className={'repair-con'}>
                            <List>
                                <Item multipleLine extra={<a className={'grassColor'} onClick={()=>hashHistory.push({pathname:'/equipment/troubleEdit',state:{...baseData,key:'2'}})}>编辑</a>}>
                                <span className={'con_title'}>维修内容</span>
                                </Item>
                            </List>
                            <List>
                                <Item>
                                    <p><span>故障类型：</span><span>{baseData.repairContentType?baseData.repairContentType:'暂无'}</span></p>
                                    <p><span>故障原因：</span><span>{baseData.repairContentTyp?baseData.repairContentTyp:'暂无'}</span></p>
                                </Item>
                            </List>
                        </div>
                        <WhiteSpace size='md' />
                        <div className={'repair-estimate-cost'}>
                            <List>
                                <Item multipleLine arrow="horizontal" onClick={()=>hashHistory.push({pathname:'/equipment/estimateFee',state:baseData})} extra={<a className={'grassColor'}>添加</a>}>
                                <span className={'con_title'}>预估费用</span>
                                </Item>
                            </List>
                        </div>
                        <WhiteSpace size='md' />
                        <div className={'repair-actual-cost'}>
                            <List>
                                <Item multipleLine arrow="horizontal" onClick={()=>console.log('添加实际费用')} extra={<a className={'grassColor'}>添加</a>}>
                                <span className={'con_title'}>实际费用</span>
                                </Item>
                            </List>
                        </div>
                    </div>
                    <div className={'order-info'}>
                        <WhiteSpace size='md' />
                        <List>
                            <Item multipleLine extra={<a onClick={()=>hashHistory.push({pathname:'/equipment/editOrder',state:baseData})} className={'grassColor'}>编辑</a>}>
                                <span className={'con_title'}>工单信息</span>
                            </Item>
                            <Item><span>维修性质: <a>{ baseData.orderType?baseData.orderType:'暂无' }</a></span></Item>
                            <Item><span>维修类型: <a>{ baseData.rrpairType==='00'?'内修':'外修' }</a></span></Item>
                            <Item><span>是否返修: <a>{ baseData.rrpairFlag==='00'?'否':'是' }</a></span></Item>
                            <Item><span>紧急度: <a>{ this.urgentFlag(baseData.urgentFlag) }</a></span></Item>
                            <Item><span>备用机: <a>{ baseData.spare==='00'?'无':'有' }</a></span></Item>
                            <Item><span>报修人: <a>{ baseData.rrpairUserName?baseData.rrpairUserName:'' }
                                    <label className={'grassColor'} style={{marginLeft:8}}>{baseData.rrpairPhone?baseData.rrpairPhone:''}</label></a></span>
                            </Item>
                            <Item><span>预计完成时间: <a>{ baseData.completTime?baseData.completTime:'' }</a></span></Item>
                        </List>
                        <WhiteSpace size='md' />
                        <List>
                            <Item multipleLine extra={<a className={'grassColor'} onClick={()=>console.log('编辑负责人')}>编辑</a>}>
                                <span className={'con_title'}>负责人</span>
                            </Item>
                        </List>
                    </div>
                    
                    <div className={'history-info'}>
                        <WhiteSpace size='md' />
                        { 
                           /* tabs.map((item,index)=>{
                                return this.historyCard(item,index);
                            }) */
                            this.historyCard(baseData)
                        }
                        
                    </div>
                </Tabs>
            </div>
            <div className={'ysynet-detail-foot'}>
                <List>
                    <Item>
                        {
                           this.ButtonActions(baseData.orderFstate,baseData.rrpairType)
                        }
                    </Item>
                </List>
            </div>
        </div>)
        
    }
}
export default RepareList;