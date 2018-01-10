import React, { Component } from 'react';
import { NavBar, Icon, Button, WhiteSpace, Card ,List} from 'antd-mobile';
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
 * @summary 审核管理明细
 */
class AuditDetail extends Component {
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
    return (
      <div> 
        <NavBar
          className={'ysynet-header'}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: '/auditMgt'})}
        >审核管理详情
        </NavBar>
        <div className={'ysynet-content'}>
            <Card >
                <Card.Header
                title="基本信息"
                />
                <Card.Body>
                    <p className="list">单据号:GH830390303223333</p>
                    <p className="list">科室:xxxx</p>
                    <p className="list">库房:xxxx</p>
                    <p className="list">单据类型:xxxx</p>
                    <p className="list">状态:xxxx</p>
                    <p className="list">发送人:xxxx</p>
                    <p className="list">发送时间:xxxx</p>
                    <p className="list">审批时间:xxxx</p>
                    <p className="list">驳回说明:xxxx</p>
                </Card.Body>
            </Card>
            <WhiteSpace/>
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
                            数量: <span> { item.send } </span>
                            </a>
                       
                          </Brief>
                          <Brief style={briefStyle}>价格: { item.package } </Brief>
                         
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

            <footer>
            <div style={{textAlign:'right',marginTop:15,marginBottom:30}}>
            <Button type="primary" inline  style={{ marginRight: '4px' }}>通过</Button>
            {/* use `am-button-borderfix`. because Multiple buttons inline arranged, the last one border-right may not display */}
            <Button type="ghost" inline className="am-button-borderfix">不通过</Button>
            </div>
        </footer>
        </div>  
      
      </div>
    )
  }
}

export default AuditDetail;