import React, { Component } from 'react';
import { NavBar, List, WhiteSpace,Card} from 'antd-mobile';
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
    assetsRecordCount: 0,
    rrpairOrderCount: 0 ,
    RepairGridData:[],
    userName: '游客',
    avatar: '',
  }
  
  componentDidMount = () => {
    const { query } = this.props.location;
    fetchData({
      url: `/test/getWxUser?openid=${query.openid}`,
      error: err => {
        alert(err + '报错啦');
        console.log(err,'err')
      },
      success: data => {
        if (data.result) {
          this.setState({
            userName: data.result.userName,
            avatar: data.result.headimgurl
          })
        }
      }
    }) 
    this.getEquipment();
  }
  //获取设备数据
  getEquipment = () => {
     //获取设备维修数据
     fetchData({
      url:Equipment.selectRrpairFstateNum,
      error: err => {
        console.log(err,'err')
      },
      success: data => {
        if(data.status){
          const total = data.result;
          const Status = [];
          const EquimentType = EquipmentData.EquimentType;
          const EquimentIcon = EquipmentData.EquimentIcon;
          for(let i = 0 ; i < 4 ; i++ ){
            Status.push({TF_CLO_CODE: total[i].code, TF_CLO_NAME : EquimentType[total[i].code], text: total[i].num,icon : EquimentIcon[total[i].code]})
          }
          this.setState( { 
            assetsRecordCount :  total[4].code === "assetsRecordCount" ? total[4].num : 0 ,
            rrpairOrderCount : total[5].code === "rrpairOrderCount" ? total[5].num: 0 ,
            RepairGridData: Status
          })
          
        }
      }
    })
  }
  componentWillReceiveProps = () => {
    if(this.props.location.pathname === "/equipment/equipmentRepaire"){
      this.getEquipment();
    }
  }

  render () {
    //维修工单数据
    const RepairGridData = this.state.RepairGridData;
    const AccusationMgtData = EquipmentData.AccusationMgt.Status;
    return this.props.children ||
        (
        <div>
          <NavBar
            mode="dark"
          >我的工作台
          </NavBar>
          <section className={'ysynet-profile'}>
            <img alt='用户头像' src={this.state.avatar}/>
            <div className={'ysynet-profile-detail'}>
              <p className={'name'}> { this.state.userName } </p>
            </div>
            <a href='http://hsms.com.cn/test/test.html' className='scannig'> </a>
          </section>
            <List className="ysynet-list">
              <Item 
                extra={this.state.assetsRecordCount + '台'}
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
                extra={this.state.rrpairOrderCount + '条'}
              />
              <Card.Body>
                <EquipmentGrid 
                onClick={ (el,index) => {
                  hashHistory.push({pathname: '/equipment/equipmentRepaire',state:{orderFstate:el.TF_CLO_CODE}})
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