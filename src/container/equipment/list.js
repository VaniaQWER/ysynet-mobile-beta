import React from 'react';
import { NavBar, Icon, List,ListView, PullToRefresh,SearchBar,Card,WhiteSpace } from 'antd-mobile';
import { hashHistory } from 'react-router';
import Slider from '../common/slider';
import { Equipment } from '../../api';
import './index.css';
const Item = List.Item;

/**
 * @summary 资产档案列表
 */
class EquipmentList extends Slider {
  constructor(props) {
    super(props);
    this.url = Equipment.selectAssetsList;
    this.state = {
      dataSource: this.dataSource,
      pageIndex: 1,
      isMore: true,
      isLoading: true,
      refreshing: true,
      sectionIDs: [],
      rowIDs: [],
      dataBlobs: {},
      values :{}
    }
  }
  componentDidMount() {
    this.genData();
  }
  onEndReached = (event) => {
    this.genData();
  }
  //渲染状态style
  handleStatusStyle = (rowData) =>{
      switch(rowData.useFstate){
        case '00':
            return <span style={{color:'#ffbf00'}}>{'在用'}</span>;
        case '01':
            return <span style={{color:'#28C7A0'}}>{'异常'}</span>;
        case '02':
            return <span style={{color:'#000'}}>{'报废'}</span>;
        default:
            break;
    }
  }
  render () {
    return this.props.children ||
        (
        <div>
          <NavBar
            className={'ysynet-header'}
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => hashHistory.push({pathname: '/equipment'})}
          >我的资产档案列表
          </NavBar>
          <div className={'ysynet-content'}>
            <SearchBar placeholder="查找资产" maxLength={8} />
            <ListView
              style={{height: '85vh'}}
              dataSource={this.state.dataSource}
              renderBodyComponent={() => <div style={{background: '#efeff4'}}></div>}
              renderRow={
                (rowData, sectionID, rowID) => {
                  return (
                  <div>
                    <Card full
                    onClick={() => hashHistory.push({pathname: `/equipment/firstDetails`,state: rowData})}
                    >
                    <div className={'ysynet_card_header'}>
                        <Item extra={this.handleStatusStyle(rowData)}>
                            <span className={'workNo'}>{"编号: " +rowData.equipmentCode}</span>
                      </Item>
                    </div>
         
                      <Card.Body>
                        <div>名称: {rowData.equipmentName}</div>
                      </Card.Body>
                      <Card.Footer content={"地址: " + rowData.address} />
                    </Card>
                    <WhiteSpace  />
                 </div>
                    
                  );
                }
              } 
              renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                {
                  this.state.isMore ? this.state.isLoading ? '加载中...' : '下拉加载更多' : '没有了'
                }
              </div>)}
              pageSize={4}
              pullToRefresh={<PullToRefresh style={{color: 'red'}}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />}
              scrollEventThrottle={200}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          </div>
          </div>
    )
  }
}

export default EquipmentList;