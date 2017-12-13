import React from 'react';
import { NavBar, Icon, ListView, PullToRefresh } from 'antd-mobile';
import { hashHistory } from 'react-router';
import CardList from '../../component/cardList';
import Footer from '../../component/footer';
import SearchMirror from '../../component/search_mirror';
import Slider from '../common/slider';
import { Status } from '../../constants';
import './style.css';
/**
 * @summary 我的订单
 */
class Order extends Slider {
  constructor(props) {
    super(props);
    this.url = 'order';
    this.state = {
      dataSource: this.dataSource,
      pageIndex: 0,
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
            onLeftClick={() => hashHistory.push({pathname: '/'})}
          >我的订单
          </NavBar>
          <div className={'ysynet-content'}>
            <SearchMirror 
              placeholder={'请输入订单号或公司'}
              onClick={() => hashHistory.push({pathname: '/search', state: {type: 'order'}})}
            />
            <ListView
              style={{height: '85vh'}}
              dataSource={this.state.dataSource}
              renderBodyComponent={() => <div style={{background: '#efeff4'}}></div>}
              renderRow={
                (rowData, sectionID, rowID) => {
                  console.log(Status[rowData.status])
                  return (
                    <CardList 
                      onClick={(key) => hashHistory.push({pathname: `/order/${key}`})}
                      subClick={(key) => hashHistory.push({pathname: `/supplier/${key}`})}
                      key={rowID} 
                      data={{
                        key: rowData.id,
                        title: `${rowData.supplyname}(${rowData.address})`,
                        watermark: Status[rowData.status],
                        subTitle: rowData.datetime,
                        content: 
                                  <span className={'productname ellipsis'}>
                                  { rowData.productname }
                                  <span>等{ rowData.total }件商品</span>
                                  </span>,
                        extra: `￥${ rowData.price.toFixed(2) }`,        
                        logo: rowData.logo,
                      }} 
                      footer={true}
                    />
                  );
                }
              } 
              renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                {this.state.isLoading ? '加载中...' : '下拉加载更多'}
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
          {/* 底部工具栏 */}
          <Footer active={'order'}/>
          </div>
    )
  }
}

export default Order;