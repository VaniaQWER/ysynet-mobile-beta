import React, { Component } from 'react';
import { NavBar, Icon, List, WhiteSpace,Card,Switch,NoticeBar} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { EquipmentData } from '../../constants';
import EquipmentGrid from '../../component/equipmentGrid';
import './index.css';

const Item = List.Item;
/**
 * @file 设备
 */
class Equipment extends Component {
  state ={
    checked: true,
  }
  render () {
    //维修工单数据
    const RepairGridData = EquipmentData.Repair.Status;
    const AccusationMgtPMData = EquipmentData.AccusationMgt.PM;
    const AccusationMgtInspectionData = EquipmentData.AccusationMgt.Inspection;
    const AccusationMgtMeteringData = EquipmentData.AccusationMgt.Metering;
    const ContractMgtData = EquipmentData.ContractMgt.Status;
    return this.props.children ||
        (
        <div>
          <NavBar
            className={'ysynet-header'}
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => hashHistory.push({pathname: '/'})}
          >设备工作台
          </NavBar>
          <div className='ysynet-content'>
            <List>
              <Item
                extra={<Switch
                  checked={this.state.checked}
                  onChange={(checked) => { 
                    this.setState({checked})
                   }}
                />}
              >所有信息
              </Item>
              <WhiteSpace/>
              <Item 
                extra={EquipmentData.archivesTotal + '台'}
                multipleLine 
                onClick={() => {}}
                thumb={require('../../assets/archives.svg')}
              >
                设备档案
              </Item>
            </List>
            <WhiteSpace/>
            <Card>
              <Card.Header
                title="维修工单"
                thumb={require('../../assets/repari_order.svg')}
              />
              <Card.Body>
                <EquipmentGrid 
                onClick={ (el,index) => {
                  console.log(el,'el');
                  console.log(index,'index')
                  hashHistory.push({pathname: '/invoice'})
                }} 
                itemStyle={{backgroundColor:'#f1fff1'}}
                columnNum='3' 
                data={RepairGridData}
                hasLine={false} 
                renderItem={dataItem => (
                 <div style={{ padding: '12.5px' }}>
                  <span className={'grid-span reGrid-span-bg'}>{dataItem.text}</span>
                  <div style={{ color: '#888', fontSize: '12px', marginTop: '10px' }}>
                    <span><img src={dataItem.icon} style={{ width: '14px', height: '14px' }} alt="" />{dataItem.TF_CLO_NAME}</span>
                  </div>
                </div>
                )}
                />  
                
              </Card.Body>
            </Card>
            <WhiteSpace/>
            <Card>
              <Card.Header
                title="质量控制"
                thumb={require('../../assets/quality_control.svg')}
              />
              <Card.Body>
                <NoticeBar  
                icon={<Icon type={require('../../assets/quality_control.svg')} />} 
                mode="link" 
                action={<span style={{color:"#2a363b"}}>本年完成 <strong style={{color:"#2395ff"}}>{EquipmentData.AccusationMgt.InYearTotal}</strong> 单 本月完成 <strong style={{color:"#2395ff"}}>{EquipmentData.AccusationMgt.InMonthTotal}</strong> 单</span>} 
                marqueeProps={{ loop: true, style: { backgroundColor:"#fdfce0",color:"#2a363b" } }}>
                  PM
                </NoticeBar>
                <EquipmentGrid
                onClick={ (el,index) => {
                  console.log(el,'el');
                  console.log(index,'index')
                  hashHistory.push({pathname: '/invoice'})
                }} 
                columnNum='3' 
                data={AccusationMgtPMData}
                hasLine={false} 
                itemStyle={{backgroundColor:'#fdfce0'}}
                renderItem={dataItem => (
                <div style={{ padding: '12.5px' }}>
                  <span className={'grid-span acGrid-span-bg'}>{dataItem.text}</span>
                  <div style={{ color: '#888', fontSize: '12px', marginTop: '10px' }}>
                    <span><img src={dataItem.icon} style={{ width: '12px', height: '12px' }} alt="" />{dataItem.TF_CLO_NAME}</span>
                  </div>
                </div>
                )}
                /> 
                <WhiteSpace/>
                <NoticeBar  icon={<Icon type={require('../../assets/quality_control.svg')} />} 
                mode="link" 
                action={<span style={{color:"#2a363b"}}>本年完成 <strong style={{color:"#2395ff"}}>{EquipmentData.AccusationMgt.MeYearTotal}</strong> 单 本月完成 <strong style={{color:"#2395ff"}}>{EquipmentData.AccusationMgt.MeMonthTotal}</strong> 单</span>} 
                marqueeProps={{ loop: true, style: { backgroundColor:"#fdfce0",color:"#2a363b" } }}>
                  工程师巡检
                </NoticeBar>
                <EquipmentGrid 
                onClick={ (el,index) => {
                  console.log(el,'el');
                  console.log(index,'index')
                  hashHistory.push({pathname: '/invoice'})
                }} 
                columnNum='3' 
                data={AccusationMgtInspectionData}
                hasLine={false} 
                itemStyle={{backgroundColor:'#fdfce0'}}
                renderItem={dataItem => (
                <div style={{ padding: '12.5px' }}>
                  <span className={'grid-span acGrid-span-bg'}>{dataItem.text}</span>
                  <div style={{ color: '#888', fontSize: '12px', marginTop: '10px' }}>
                    <span><img src={dataItem.icon} style={{ width: '12px', height: '12px' }} alt="" />{dataItem.TF_CLO_NAME}</span>
                  </div>
                </div>
                )}
                /> 
                <WhiteSpace/>
                <NoticeBar  
                icon={<Icon type={require('../../assets/quality_control.svg')} />} 
                mode="link" 
                action={<span style={{color:"#2a363b"}}>本年完成 <strong style={{color:"#2395ff"}}>{EquipmentData.AccusationMgt.PMYearTotal}</strong> 单 本月完成 <strong style={{color:"#2395ff"}}>{EquipmentData.AccusationMgt.PMMonthTotal}</strong> 单</span>} 
                arqueeProps={{ loop: true, style: { backgroundColor:"#fdfce0",color:"#2a363b" } }}>
                  计量
                </NoticeBar>
                <EquipmentGrid 
                onClick={ (el,index) => {
                  console.log(el,'el');
                  console.log(index,'index')
                  hashHistory.push({pathname: '/invoice'})
                }} 
                columnNum='3' 
                data={AccusationMgtMeteringData}
                hasLine={false} 
                itemStyle={{backgroundColor:'#fdfce0'}}
                renderItem={dataItem => (
                <div style={{ padding: '12.5px' }}>
                  <span className={'grid-span acGrid-span-bg'}>{dataItem.text}</span>
                  <div style={{ color: '#888', fontSize: '12px', marginTop: '10px' }}>
                    <span><img src={dataItem.icon} style={{ width: '12px', height: '12px' }} alt="" />{dataItem.TF_CLO_NAME}</span>
                  </div>
                </div>
                )}
                /> 
              </Card.Body>
            </Card>
            <WhiteSpace/>
            <Card>
              <Card.Header
                title="合同管理"
                extra={<span>共 <strong style={{color:"#2395ff"}}> {EquipmentData.contractTotal} </strong>  份</span>}
                thumb={require('../../assets/contract.svg')}
              />
              <Card.Body>
                <EquipmentGrid
                onClick={ (el,index) => {
                  console.log(el,'el');
                  console.log(index,'index')
                  hashHistory.push({pathname: '/invoice'})
                }}  
                columnNum='3' 
                data={ContractMgtData}
                itemStyle={{backgroundColor:'aliceblue'}}
                hasLine={false} 
                renderItem={dataItem => (
                <div style={{ padding: '12.5px' }}>
                  <span className={'grid-span coGrid-span-bg'}>{dataItem.text}</span>
                  <div style={{ color: '#888', fontSize: '12px', marginTop: '10px' }}>
                    <span><img src={dataItem.icon} style={{ width: '14px', height: '14px' }} alt="" />{dataItem.TF_CLO_NAME}</span>
                  </div>
                </div>
                )}
                /> 
              </Card.Body>
            </Card>
      
          </div>  
        </div>
        )  
  }
}

export default Equipment;