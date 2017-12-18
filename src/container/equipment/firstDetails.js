import React, { Component } from 'react';
import { NavBar, Icon, WhiteSpace,Card,Grid} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { EquipmentData } from '../../constants';

/**
 * @summary 资产档案列表 --详情1
 */

class FirstDetails extends Component {
    render () {
        const rowData = this.props.location.state;
        const firstDetailsGridData = EquipmentData.firstDetailsGrid;
        const { columnNum, hasLine } = this.props;
        return this.props.children ||
        (  
            <div>
                <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/list'})}
                >资产信息
                </NavBar>
                <div className={'ysynet-content'}>
                    <Card full
                    onClick={() => hashHistory.push({pathname: `/equipment/secondDetails`,state: this.props.location.state})}
                    >
                      <Card.Header
                        title={rowData.equipmentName}
                        extra={<a>详情</a>}
                      />
                      <Card.Body>
                        <p className="cardBodyList">编号: {rowData.equipmentCode}</p>
                        <p className="cardBodyList">型号: {rowData.spec}</p>
                      </Card.Body>
                      <Card.Footer content={"科室:"  + rowData.address + "--" + rowData.useDept} />
                    </Card>
                    <WhiteSpace  />
                    { /* 相关业务 */ }
                    <Grid
                        data={firstDetailsGridData}
                        columnNum={ columnNum || 3 }
                        onClick={(el) => hashHistory.push({pathname: el.link,state:{...this.props.location.state,backlink:'/equipment/firstDetails'}})}
                        hasLine={ hasLine }
                    />
                    </div>
            </div>
        )  
    }
}
export default FirstDetails;