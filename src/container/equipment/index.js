import React, { Component } from 'react';
import { NavBar, Icon, List, WhiteSpace,Card} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { EquipmentData } from '../../constants';
import EquipmentGrid from '../../component/equipmentGrid';
import { Equipment } from '../../api';
import './index.css';
import '../../component/user_info/style.css';
import { fetchData } from '../../utils';

const Item = List.Item;
/**
 * @file 设备
 */
class EquipmentPage extends Component {
  state ={
    checked: true,
    total: 0
  }
  
  componentDidMount = () => {
    //获取资产档案台数接口
    fetchData({
      url:Equipment.selectAssetsRecordCount,
      error: err => {
        console.log(err,'err')
      },
      success: data => {
        if(data.status){
          this.setState( { total : data.result})
        }
      }
    }) 
    

  }
  render () {
    //维修工单数据
    const RepairGridData = EquipmentData.Repair.Status;
    const AccusationMgtData = EquipmentData.AccusationMgt.Status;
    const userInfo = {
      avatar: require('../../assets/avatar.png'),
      username: '萌萌的拖鞋酱'
    }
    return this.props.children ||
        (
        <div>
          <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => hashHistory.push({pathname: '/'})}
          >我的工作台
          </NavBar>
          <section className={'ysynet-profile'}>
            <img alt='用户头像' src={userInfo.avatar}/>
            <div className={'ysynet-profile-detail'}>
              <p className={'name'}> { userInfo.username } </p>
            </div>
            <img alt='扫一扫' src={require('../../assets/scan.svg')} onClick={()=>{
              alert("点击扫一扫")
            }}/>
          </section>
            <List className="ysynet-list">
              <Item 
                extra={this.state.total+ '台'}
                multipleLine 
                onClick={ (el) => {
                  hashHistory.push({pathname: '/equipment/list'})
                }} 
                thumb={require('../../assets/archives.svg')}
              >
                资产档案
              </Item>
            </List>
            <WhiteSpace/>
            <Card className="ysynet-list">
              <Card.Header
                title="设备维修单"
                thumb={require('../../assets/repair_order.svg')}
              />
              <Card.Body>
                <EquipmentGrid 
                onClick={ (el,index) => {
                  hashHistory.push({pathname: '/equipment/equipmentRepaire'})
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
            <Card className="ysynet-list">
              <Card.Header
                title="设备保养单"
                thumb={require('../../assets/quality_control.svg')}
              />
              <Card.Body>
                <EquipmentGrid
                onClick={ (el,index) => {
                  hashHistory.push({pathname: '/equipment/do',state:{backlink:'/equipment'}})
                }} 
                columnNum='3' 
                data={AccusationMgtData}
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
        </div>
        )  
  }
}

export default EquipmentPage;