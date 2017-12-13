import React, { Component } from 'react';
import { NavBar, Icon} from 'antd-mobile';
import { hashHistory } from 'react-router';
import Footer from '../../component/footer';
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
        <Footer active={'delivery'}/>
      </div>
    )
  }
}

export default Delivery;