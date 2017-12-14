import React, { Component } from 'react';
import { NavBar, Icon, List, WhiteSpace,SearchBar} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { EquipmentData } from '../../constants';
import './index.css';

const Item = List.Item;
/**
 * @file 设备列表
 */
class EquipmentList extends Component {
 
  render () {
      return(
        <div>
            <NavBar
            className={'ysynet-header'}
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => hashHistory.push({pathname: '/equipment'})}
            >设备列表
            </NavBar>
            <div className='ysynet-content'>
                <SearchBar placeholder="查找设备" maxLength={8} />
            </div>
        </div>
      )
  }
}

export default EquipmentList;