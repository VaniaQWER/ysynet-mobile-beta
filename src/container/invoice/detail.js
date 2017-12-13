/**
 * @file 发票详情
 */
import React, { Component } from 'react';
import { NavBar, Icon, Result, Tabs, Badge, WhiteSpace, List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import '../order/style.css';
const Item = List.Item;
const tabs = [
  { title: '基本信息' },
  { title: <Badge text={'2'}>送货单(共:￥6000.00元)</Badge> }
];
const iStyle = {
  fontStyle: 'normal',
  paddingLeft: 10,
  color: '#888'
}
class InvoiceDetail extends Component {
  render () {
    return (
      <div>
        <NavBar
          className={'ysynet-header'}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: '/invoice'})}
        >发票详情
        </NavBar>
        <div className={'ysynet-content'}>
          <Result
            img={<Icon type={'check-circle' }  style={{ fill: '1F90E6', width: 60, height: 60 }} />}
            title={`已验收`}
            message={
              <p>感谢您对医商云的信任，期待下次光临</p>
            }
          />
          <WhiteSpace size='md'/>
          <Tabs tabs={tabs}
            initialPage={0}
          >
            <div>
              <List className={"ysynet-order"}>
                <Item><span>发票代码: <a>4200163350</a></span></Item>
                <Item><span>发票编码: <a>05085547</a></span></Item>
                <Item><span>供应商: <a>湖北优利医药有限公司</a></span></Item>
                <Item><span>发票金额: <a>39780.0000元</a></span></Item>
                <Item><span>制单时间: <a>2017-12-11</a></span></Item>
                <Item wrap><span>备注: <i style={iStyle}>在英雄联盟全明星赛打得热火朝天的时候英雄联盟官方推出了一款名为全明星选手卡牌揭秘活动，但是许多玩家都不知道lol全明星选手卡牌揭秘活动地址，好奇的玩家马上点击进入英雄联盟all star选手卡牌揭秘皮肤领取地址参与活动领取奖励吧。</i></span></Item>
              </List>
            </div>
            <div>
              <List className={"ysynet-order"}>
                <Item><span>送货单号: <a>SH1020171201362</a></span></Item>
                <Item><span>收货地址: <a>外科楼26楼</a></span></Item>
              </List>
              <List className={"ysynet-order"}>
                <Item><span>送货单号: <a>SH1020171201362</a></span></Item>
                <Item><span>收货地址: <a>外科楼26楼</a></span></Item>
              </List>
            </div>
          </Tabs>
        </div>  
      </div>
    )
  }
}

export default InvoiceDetail;