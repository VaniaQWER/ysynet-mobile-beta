import React, { Component } from 'react';
import { List, WhiteSpace } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
/**
 * @summary 手术详情
 */
const briefStyle = {
  fontSize: 12,
  textAlign: 'left'
}

const iStyle = {
  fontStyle: 'normal',
  paddingLeft: 10,
  color: '#888'
}
class Operation extends Component {
  render () {
    const { patient, operBag, onClick } = this.props;
    return (
    <div> 
      <List className={"ysynet-order"}>
        <Item><span style={{color: '#333', fontSize: 17}} > 患者信息 </span></Item>
        <Item><span>就诊号: <a>{ patient.visitNo }</a></span></Item>
        <Item><span>患者姓名: <a>{ patient.patientName }</a></span></Item>
        <Item><span>性别: <a>{ patient.gender }</a></span></Item>
        <Item><span>手术名称: <a>{ patient.operName }</a></span></Item>
        <Item><span>手术日期: <a>{ patient.operTime }</a></span></Item>
        <Item><span>品牌: <a>{ patient.brand }</a></span></Item>
        <Item wrap><span>备注: <i style={iStyle}>{ patient.remark }</i></span></Item>
      </List>
      <WhiteSpace/>
      <List className={"ysynet-order"}>
        <Item arrow="horizontal" onClick={onClick}>
          <span style={{color: '#333'}} > 手术包信息(共计：{operBag.total}) </span>
          <Brief style={briefStyle}>外来植入物总数量: { operBag.implant } </Brief>
          <Brief style={briefStyle}>灭菌总数量: { operBag.sterilization } </Brief>
          <Brief style={briefStyle}>外来工具总数量: { operBag.tool } </Brief>
        </Item>
      </List>
      <WhiteSpace/>
    </div>  
    )
  }
}

 export default Operation;