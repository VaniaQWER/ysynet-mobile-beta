import React, { Component } from 'react';
import { NavBar, Icon} from 'antd-mobile';
import { hashHistory } from 'react-router';
import CardItem  from '../../component/card'
import Footer from '../../component/footer';
import { WorkOrder } from '../../constants';

/**
 * @summary 送货单
 */
class Delivery extends Component {
  
  render() {
    
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: '/'})}
        >送货单
        </NavBar>
        <CardItem data={WorkOrder} onClick={(key) => alert(key)}/>
        <Footer active={'delivery'}/>
      </div>
    )
  }
}

export default Delivery;