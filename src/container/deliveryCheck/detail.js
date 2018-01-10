import React, { Component } from 'react';
import { NavBar, Icon, Button, WhiteSpace, List, Badge, Tabs } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { Details } from '../../constants';
const Item = List.Item;
const Brief = Item.Brief;

const briefStyle = {
  fontSize: 12,
  textAlign: 'left'
}

const getStatus = (status) => {
  switch (status) {
    case '完成':
      return { type: 'check-circle', color: '#1F90E6' };
    case '备货中':
      return { type: 'loading', color: '#f78e3d' };
    case '待确认':
      return { type: 'check-circle-o', color: '#ffce3d' };
    default:
      return { type: 'cross-circle', color: '#f46e65' };
  }
}

/**
 * @summary 订单明细
 */
class OrderDetail extends Component {
  state = {
    order: {},
    status: { type: null, color: null }
  }
  componentDidMount() {
    const { params } = this.props;
    const status = getStatus(Details.status);
    console.log(params)
    // todo 发送请求获取订单详情
    this.setState({order: Details, status})
  }
  render () {
    const { order } = this.state; 
    const tabs = [
        { title: '基本信息' },
        { title: <Badge text={'4'}>产品信息</Badge> }
      ];
    return (
      <div> 
        <NavBar
          className={'ysynet-header'}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: '/deliveryCheck'})}
        >送货单详情
        </NavBar>
        <div className={'ysynet-content'}>
        <Tabs tabs={tabs}
            initialPage={0}
          >
            <div>
              <List className={"ysynet-order"}>
                <Item><span>送货单号: <a>{ order.orderNo }</a></span></Item>
                <Item><span>订单号: <a>{ order.orderNo }</a></span></Item>
                <Item><span>送货单总金额: <a>{ order.orderMan }</a></span></Item>
                <Item><span>供应商: <a>{ order.orderTime }</a></span></Item>
                <Item><span>收货地址: <a>{ order.expectTime }</a> </span> </Item>
                <Item><span>到货时间: <a>{ order.expectTime }</a></span></Item>
                <Item><span>送货单类型: <a>{ order.expectTime }</a></span></Item>
                <Item><span>状态: <a>{ order.expectTime }</a></span></Item>
                <Item><span>制单人: <a>{ order.expectTime }</a></span></Item>
                <Item><span>制单时间: <a>{ order.expectTime }</a></span></Item>
                <Item><span>验收人: <a>{ order.expectTime }</a></span></Item>
                <Item><span>验收时间: <a>{ order.expectTime }</a></span></Item>
                <Item><span>驳回说明: <a>{ order.expectTime }</a></span></Item>
              </List>
            </div>
            <div>
            {
              order.hasOwnProperty('details') ? 
            <List>
                {order.details.map((item, index) => (

                <Item 
                      key={index}
                      align="top" 
                      multipleLine 
                      extra={
                        <div className={'ysynet-detail'}>
                          <div className={'ysynet-detail-amount'}>￥{ item.price }</div>
                          <Brief style={briefStyle}>
                            <a className={'send'}>
                              送货数量: <span> { item.send } </span>
                            </a>
                       
                          </Brief>
                          <Brief style={briefStyle}>单价: { item.package } </Brief>
                         
                        </div>}
                    >
                      <a style={{fontSize: 14}}>
                        { item.name } 
                        <Brief style={briefStyle}>型号: { item.model } </Brief>
                        <Brief style={briefStyle}>规格: { item.spec } </Brief>
                      </a>
                    </Item>
                  ))
                }
                <Item extra={<a style={{color: '#ff5339'}}>￥{ order.totalPrice }</a>}>
                  <a style={{fontSize: 14, color: '#108ee9'}}>总金额(元)</a>
                </Item>
              </List> : <p>loading!!!</p>
            }
            </div>
 
          </Tabs>
          <WhiteSpace />
       
        </div>  
        <footer className='phxl-footer'>
            <div style={{textAlign:'center'}}>
            <Button type="primary" inline  style={{ marginRight: '4px' }}>通过</Button>
            {/* use `am-button-borderfix`. because Multiple buttons inline arranged, the last one border-right may not display */}
            <Button type="ghost" inline className="am-button-borderfix">不通过</Button>
            </div>
            </footer>
      </div>
    )
  }
}

export default OrderDetail;