import React, { Component } from 'react';
import { NavBar, Icon, List, WhiteSpace,SearchBar,Tabs,Button,Accordion} from 'antd-mobile';
import { hashHistory } from 'react-router';
const Item = List.Item;
/**
 * @file 维修单详情
 */
class RepareList extends Component{
    state = {
        baseData:this.props.location.state
    }
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
                    <p className={'address'}>
                        <span>{baseData.deptName?baseData.deptName:'--'}</span>
                        <span className={'adrCenter'}>{baseData.buildingName}</span>
                        <span>{baseData.floorName}</span>
                    </p>
                </div>
        )
    }
    //底部按钮
    ButtonActions = (value)=>{
        switch(value.TF_CLO_CODE){
            case '00':
                return (<div className={'button-group'}>
                            <a>备注</a>
                            <a>接修</a>
                        </div>)
                break;
            case '01':
                return (<div className={'button-group'}>
                            <a>备注</a>
                            <a>完成维修</a>
                            <a>转外修</a>
                        </div>)
            case '02':
                return (<div className={'button-group'}>
                        <a>备注</a>
                        <a>验收通过</a>
                        <a>验收不通过</a>
                    </div>)
            case '03':
                return (<div className={'button-group'}>
                            <a>备注</a>
                            <a>评价</a>
                        </div>)
        }
    }
    //历史工单card 
    historyCard = (item,index)=>{
        return (
            <List key={index}>
            <Item multipleLine>
                <div className={'order-desc'}>
                    <p><span>工单号：</span><span className={'order-No'}>1712003</span></p>
                    <p>维修中</p>
                </div>
                <div className={'order-summary'}>
                    <p>
                        <span>故障性质: </span><span>暂无</span>
                    </p>
                    <p>
                        <span>故障类型: </span><span>暂无</span>
                    </p>
                    <p>
                        <span>处理结果: </span><span>暂无</span>
                    </p>
                    <p>
                        <span>最后更新: </span><span>2017-12-08 10:57</span>
                    </p>
                </div>
            </Item>
        </List>
        )
    }
    render(){
        const baseData = this.props.location.state;
        console.log(baseData,'baseData')
        
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
                            <span>{baseData.WONo}</span>
                            <span>{baseData.WOStatus.TF_CLO_NAME}</span>
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
                                                <p><span>短码 : <a>{1111}</a></span></p>
                                                <p><span>资产号 : <a>{1111}</a></span></p>
                                                <p><span>序列号 : <a>{1111}</a></span></p>
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
                                <Item multipleLine extra={<a onClick={()=>hashHistory.push({pathname:'/equipment/troubleEdit',state:baseData})}>编辑</a>}>
                                    <span className={'con_title'}>故障描述</span>
                                </Item>
                            </List>
                            <List>
                                <Item multipleLine>暂无现象</Item>
                            </List>
                            <List>
                                <Item multipleLine>nmb</Item>
                            </List>
                        </div>
                        <WhiteSpace size='md' />
                        <div className={'repair-con'}>
                            <List>
                                <Item multipleLine extra={<a style={{color:'green'}} onClick={()=>console.log('编辑')}>编辑</a>}>
                                <span className={'con_title'}>维修内容</span>
                                </Item>
                            </List>
                            <List>
                                <Item>
                                    <p><span>故障类型：</span><span>暂无</span></p>
                                    <p><span>故障原因：</span><span>暂无</span></p>
                                </Item>
                            </List>
                        </div>
                        <WhiteSpace size='md' />
                        <div className={'repair-estimate-cost'}>
                            <List>
                                <Item multipleLine arrow="horizontal" onClick={()=>console.log('添加')} extra={<a style={{color:'green'}}>添加</a>}>
                                <span className={'con_title'}>预估费用</span>
                                </Item>
                            </List>
                        </div>
                        <WhiteSpace size='md' />
                        <div className={'repair-actual-cost'}>
                            <List>
                                <Item multipleLine arrow="horizontal" onClick={()=>console.log('添加实际费用')} extra={<a style={{color:'green'}}>添加</a>}>
                                <span className={'con_title'}>实际费用</span>
                                </Item>
                            </List>
                        </div>
                    </div>
                    <div className={'order-info'}>
                        <WhiteSpace size='md' />
                        <List>
                            <Item multipleLine extra={<a onClick={()=>console.log('编辑工单信息')} style={{color:'green'}}>编辑</a>}>
                                <span className={'con_title'}>工单信息</span>
                            </Item>
                        <List>
                            <Item><span>维修性质: <a>{ "暂无" }</a></span></Item>
                        </List>
                        <List>
                            <Item><span>维修类型: <a>{ "暂无" }</a></span></Item>
                        </List>
                        <List>
                            <Item><span>是否返修: <a>{ "暂无" }</a></span></Item>
                        </List>
                        <List>
                            <Item><span>紧急度: <a>{ "暂无" }</a></span></Item>
                        </List>
                        <List>
                            <Item><span>备用机: <a>{"暂无" }</a></span></Item>
                        </List>
                        <List>
                            <Item><span>报修人: <a>{ "暂无" }</a></span></Item>
                        </List>
                        <List>
                            <Item><span>预计完成时间: <a>{ "暂无" }</a></span></Item>
                        </List>
                        </List>
                        <WhiteSpace size='md' />
                        <List>
                            <Item multipleLine extra={<a style={{color:'green'}} onClick={()=>console.log('编辑负责人')}>编辑</a>}>
                                <span className={'con_title'}>负责人</span>
                            </Item>
                        </List>
                    </div>
                    
                    <div className={'history-info'}>
                        <WhiteSpace size='md' />
                        {
                            tabs.map((item,index)=>{
                                return this.historyCard(item,index);
                            })
                        }
                        
                    </div>
                </Tabs>
            </div>
            <div className={'ysynet-detail-foot'}>
                <List>
                    <Item>
                        {
                           this.ButtonActions(baseData.WOStatus)
                        }
                    </Item>
                </List>
            </div>
        </div>)
        
    }
}
export default RepareList;