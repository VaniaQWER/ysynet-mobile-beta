import React, { Component } from 'react';
import { NavBar, Icon, WhiteSpace,Card} from 'antd-mobile';
import { hashHistory } from 'react-router';

/**
 * @summary 资产档案列表 --详情2
 */

class SecondDetails extends Component {

     //渲染状态style
    handleStatusStyle = (rowData) =>{
      if(rowData.useFstate === "00"){
          return <span style={{color:"#ffbf00"}}>{"在用"}</span>
      }else if(rowData.useFstate === "01"){
        return <span style={{color:"#3dbd7d"}}>{"异常"}</span>
      }else if(rowData.useFstate === "02"){
        return <span style={{color:"#2395ff"}}>{"报废"}</span>
      }
    }
    render () {
        const rowData = this.props.location.state;
        console.log(rowData,'rowData')
        return this.props.children ||
        (  
            <div>
                <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/firstDetails',state: this.props.location.state})}
                >资产信息-详情
                </NavBar>
                <div className={'ysynet-content'}>
                    <Card full
                    >
                      <Card.Header
                        title={rowData.equipmentName}
                        extra={<span>{this.handleStatusStyle(rowData)}</span>}
                      />
                      <Card.Body>
                        <p className="cardBodyList">编号: {rowData.equipmentCode}</p>
                        <p className="cardBodyList">型号: {rowData.spec}</p>
                        <WhiteSpace  />

                        <p className="cardBodyList">使用科室: {rowData.useDept}</p>
                        <p className="cardBodyList">所属科室: {rowData.bDept}</p>
                        <p className="cardBodyList">责任人: {rowData.custodian}</p>
                      </Card.Body>
                      <Card.Footer content={"详细地址:" + rowData.address} />
                    </Card>
                    <WhiteSpace  />

                    <Card full
                    >
                      <Card.Header
                        title={"设备信息"}
                      />
                      <Card.Body>
                        <p className="cardBodyList">注册证: {rowData.certGuid}</p>
                        <p className="cardBodyList">生产商: {rowData.product}</p>
                        <p className="cardBodyList">生产日期: {rowData.productionDate}</p>
                        <p className="cardBodyList">有效期: {rowData.validity}</p>
                      </Card.Body>
                    </Card>
                    <WhiteSpace  />
                    <Card full
                    >
                      <Card.Header
                        title={"其他信息"}
                      />
                      <Card.Body>
                        <p className="cardBodyList">备注: {rowData.number}</p>
                      </Card.Body>
                    </Card>
              
                    </div>
            </div>
        )  
    }
}
export default SecondDetails;