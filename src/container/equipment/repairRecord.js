import React, { Component } from 'react';
import { NavBar, Icon} from 'antd-mobile';
import { hashHistory } from 'react-router';

/**
 * @summary 资产档案列表 --详情1-维修记录
 */

class RepairRecord extends Component {
    render(){
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
                
            </div>
        )
    }
}
export default RepairRecord;