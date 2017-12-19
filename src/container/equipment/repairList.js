import React from 'react';
import { NavBar, Icon, ListView, PullToRefresh,SearchBar,WhiteSpace } from 'antd-mobile';
import { hashHistory } from 'react-router';
import CardItem from '../../component/card';
import Slider from '../common/slider';
import { Equipment } from '../../api';
import './repair/style.css';

/**
 * @summary 工单列表
 */
class EquipmentRepair extends Slider {
  constructor(props) {
    super(props);
    this.url = Equipment.selectRrpairList;
    this.state = {
      dataSource: this.dataSource,
      pageIndex: 1,
      isMore: true,
      isLoading: true,
      refreshing: true,
      sectionIDs: [],
      rowIDs: [],
      dataBlobs: {}
    }
  }
  componentDidMount() {
    this.genData();
  }
  onEndReached = (event) => {
    this.genData();
  }
  render () {
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
          <div className={'ysynet-content'}>
            <SearchBar placeholder="设备维修单号" maxLength={8} />
            <ListView
              style={{height: '85vh'}}
              dataSource={this.state.dataSource}
              renderBodyComponent={() => <div style={{background: '#efeff4'}}></div>}
              renderRow={
                (rowData, sectionID, rowID) => {
                  return (
                  <div>
                    <CardItem data={rowData} onClick={()=>{}}/>
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

export default EquipmentRepair;