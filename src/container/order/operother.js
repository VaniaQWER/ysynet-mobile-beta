import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { NavBar, Icon, Grid } from 'antd-mobile';
import OperItem from './operItem';
/**
 * @summary 订单 -> 订单详情 -> 手术包详情 -> 其他
 */

class OperOther extends Component {
  render () {
    const children = this.props.location.state;
    return (
      <div>
        <NavBar
          className={'ysynet-header'}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: '/order/operdetail/package'})}
        >外来工具详情
        </NavBar>
        <div className={'ysynet-content'}>
          <Grid 
            data={children} 
            columnNum={4}
            renderItem={dataItem => (
              <OperItem dataItem={dataItem}/>
            )}
            activeStyle={false} />
        </div>  
      </div>  
    )
  }
}

export default OperOther;