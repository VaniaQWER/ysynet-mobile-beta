import React from 'react';
import { NavBar, Icon,WhiteSpace } from 'antd-mobile';
import { hashHistory } from 'react-router';
import CardItem from '../../component/card';
import Slider from '../common/slider';
import { Equipment } from '../../api';
import { fetchData } from '../../utils';
import querystring from 'querystring';
import './repair/style.css';

/**
 * @summary 工单列表
 */
class EquipmentRepair extends Slider {
  state = {
    rowData : []
  }
  componentDidMount() {
    fetchData({
      url:Equipment.selectRrpairList,
      body:querystring.stringify({
        equipmentCode:this.props.location.state.equipmentCode
      }),
      error: err=>{
          console.log(err);
      },
      success: data=>{
          if(data.status){
              this.setState({ rowData : data.result })
          }
      }
    })
  }

  render () {
    console.log(this.props.location.state,'1111')
    return this.props.children ||
        (
        <div>
          <NavBar
            className={'ysynet-header'}
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => hashHistory.push({pathname: '/equipment/firstDetails',state:this.props.location.state})}
          >维修记录
          </NavBar>
          <div className={'ysynet-content'}>
            <CardItem data={this.state.rowData} onClick={()=>{}}/>
            <WhiteSpace  />
          </div>
          </div>
    )
  }
}

export default EquipmentRepair;