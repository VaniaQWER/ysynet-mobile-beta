import React, { Component } from 'react';
import { NavBar, Icon, WhiteSpace,Card,Grid} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { EquipmentData } from '../../constants';

/**
 * @summary 资产档案列表 --详情2
 */

class SecondDetails extends Component {
    render () {
        const rowData = this.props.location.state;
        const firstDetailsGridData = EquipmentData.firstDetailsGrid;
        const { columnNum, onClick, hasLine } = this.props;
        return this.props.children ||
        (  
            <div>
                <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/firstDetails',state: this.props.location.state})}
                >资产详细信息
                </NavBar>
                <div className={'ysynet-content'}>
                    <Card full
                    >
                      <Card.Header
                        title={rowData.productname}
                      />
                      <Card.Body>
                        <p className="cardBodyList">编号: {rowData.number}</p>
                        <p className="cardBodyList">品牌: {rowData.tfBrandName}</p>
                        <p className="cardBodyList">型号: {rowData.model}</p>
                      </Card.Body>
                      <Card.Footer content={"科室:" + rowData.address} />
                    </Card>
                    <WhiteSpace  />
              
                    </div>
            </div>
        )  
    }
}
export default SecondDetails;