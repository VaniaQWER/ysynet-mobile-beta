import React, { Component } from 'react';
import { NavBar, Icon, List, WhiteSpace } from 'antd-mobile';
import { hashHistory } from 'react-router';
const Item = List.Item;
/**
 * @file 设备
 */
class Equipment extends Component {
  render () {
    return this.props.children ||
        (
        <div>
          <NavBar
            className={'ysynet-header'}
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => hashHistory.push({pathname: '/'})}
          >设备工作台
          </NavBar>
          <div className='ysynet-content'>
            <List>
              <Item 
                arrow="horizontal" 
                multipleLine 
                onClick={() => {}}
                thumb={require('../../assets/archives.svg')}
              >
                设备档案
              </Item>
            </List>
            <WhiteSpace/>
            <List>
              <Item 
                arrow="horizontal" 
                multipleLine 
                onClick={() => {}}
                thumb={require('../../assets/repari_order.svg')}
              >
                维修工单
              </Item>
            </List>
            <WhiteSpace/>
            <List>
              <Item 
                arrow="horizontal" 
                multipleLine 
                onClick={() => {}}
                thumb={require('../../assets/quality_control.svg')}
              >
                质量控制
              </Item>
            </List>
            <WhiteSpace/>
            <List>
              <Item 
                arrow="horizontal" 
                multipleLine 
                onClick={() => {}}
                thumb={require('../../assets/contract.svg')}
              >
                合同管理
              </Item>
            </List>
          </div>  
        </div>
        )  
  }
}

export default Equipment;