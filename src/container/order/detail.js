import React, { Component } from 'react';
import { NavBar, Icon, Result, Button, WhiteSpace, List, Badge, Tabs } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { Details } from '../../constants';
import Operation from './operation';
import './style.css';
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
    const { order, status } = this.state; 
    const { params } = this.props;
    const tabs = [
      { title: '订单信息' },
      { title: <Badge text={'4'}>详情</Badge> }
    ];
    if (order.type === 2) {
      tabs.push({ title: <Badge dot>手术详情</Badge>})
    }
    return (
      <div> 
        <NavBar
          className={'ysynet-header'}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: '/order'})}
        >订单详情
        </NavBar>
        <div className={'ysynet-content'}>
          <Result
            img={<Icon type={ status.type }  style={{ fill: status.color, width: 60, height: 60 }} />}
            title={`订单${order.status}`}
            message={
              // status === '完成' ?
              <div>
                <p>感谢您对医商云的信任，期待下次光临</p>
                <Button type="primary" size="small" inline style={{marginTop: 8}}>再来一单</Button>
                <Button type="warning" size="small" inline style={{marginTop: 8, marginLeft: 10}}>用户评分</Button>
              </div> 
              }
          />
          <WhiteSpace size='md'/>
          {/* {
            order.type === 2 ? 
             : null
          } */}
          <Tabs tabs={tabs}
            initialPage={0}
          >
            <div>
              <List className={"ysynet-order"}>
                <Item><span>订单号: <a>{ order.orderNo }</a></span></Item>
                <Item><span>下单人: <a>{ order.orderMan }</a></span></Item>
                <Item><span>下单时间: <a>{ order.orderTime }</a></span></Item>
                <Item><span>到货时间: <a>{ order.expectTime }</a></span></Item>
                <Item>
                  <span>送货地址: 
                    <ul className={'address'}>
                      <li>{ order.recevier }</li><li>{ order.phoneNo }</li><li>{ order.address }</li>
                    </ul>
                  </span>
                </Item>
              </List>
            </div>
            <div>
            {
              order.hasOwnProperty('details') ? 
              <List>
                <Item 
                  arrow="horizontal" 
                  onClick={() => {}}
                >
                  <span style={{color: '#333'}} > { order.supplierName } </span>
                </Item>
                {
                  order.details.map((item, index) => (
                    <Item 
                      key={index}
                      align="top" 
                      multipleLine 
                      extra={
                        <div className={'ysynet-detail'}>
                          <div className={'ysynet-detail-amount'}>x{ item.amount }</div>
                          <div className={'ysynet-detail-price'}>￥{ item.price }</div>
                          <Brief style={briefStyle}>
                            <a className={'send'}>
                              已送: <span> { item.send } </span>
                            </a>
                            <a className={'no_send'}>
                              未送: <span> { item.no_send } </span>
                            </a> 
                          </Brief>
                          <Brief style={briefStyle}>包装规格: { item.package } </Brief>
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
            {
              order.type === 2 ? 
              <div>
                <Operation 
                  patient={order.patient} 
                  operBag={order.package} 
                  onClick={() => hashHistory.push({pathname: `/order/${params.id}/${order.packageId}`})}
                />
              </div> : <div></div>
            }
          </Tabs>
        </div>  
      </div>
    )
  }
}

export default OrderDetail;