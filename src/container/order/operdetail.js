import React, { Component } from 'react';
import { NavBar, Icon, Grid } from 'antd-mobile';
import { hashHistory } from 'react-router';
import OperItem from './operItem';
import { Operbag } from '../../constants';
const data = Operbag.map((item, i) => ({
  text: item.text,
  total: item.total,
  children: item.children
}));
/**
 * @summary 手术包明细
 */
class OperDetail extends Component {
  render() {
    const { params } = this.props;
    return (
      <div>
        <NavBar
          className={'ysynet-header'}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: `/order/${params.id}`})}
        >手术包详情
        </NavBar>
        <div className={'ysynet-content'}>
          <Grid 
            data={data} 
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

export default OperDetail;