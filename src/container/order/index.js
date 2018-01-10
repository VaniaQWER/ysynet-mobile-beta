import React from 'react';
import { NavBar, Icon, ListView, PullToRefresh, Toast } from 'antd-mobile';
import { hashHistory } from 'react-router';
import CardList from '../../component/cardList';
import Footer from '../../component/footer';
import SearchMirror from '../../component/search_mirror';
import Screen from '../../component/screen';
import Slider from '../common/slider';
import { Order } from '../../api';
import './style.css';
/**
 * @summary 我的订单
 */
class OrderList extends Slider {
  constructor(props) {
    super(props);
    this.url = Order.findMyOrderList;
    this.state = {
      dataSource: this.dataSource,
      pageIndex: 1,
      isMore: true,
      isLoading: true,
      refreshing: true,
      sectionIDs: [],
      rowIDs: [],
      dataBlobs: {},
    }
  }
  componentDidMount() {

    this.genData({
      error: err => Toast.fail('请求超时, 请重新连接'),
    });
  }
  onEndReached = (event) => {
    if (this.state.isMore) {
      this.genData({
        error: err => Toast.fail('请求超时, 请重新连接'),
        endReached: true
      });
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
            onLeftClick={() => hashHistory.push({pathname: '/'})}
          >我的订单
          </NavBar>
          <div className={'ysynet-content'}>
            <SearchMirror 
              placeholder={'请输入订单号或公司'}
              onClick={() => hashHistory.push({pathname: '/search', state: {type: 'order'}})}
            />
            <Screen />
            <ListView
              style={{height: '85vh'}}
              dataSource={this.state.dataSource}
              renderBodyComponent={() => <div style={{background: '#efeff4'}}></div>}
              renderRow={
                (rowData, sectionID, rowID) => {
                  return (
                    <CardList 
                      onClick={(key) => hashHistory.push({pathname: `/order/${key}`})}
                      subClick={(key) => hashHistory.push({pathname: `/supplier/${key}`})}
                      key={rowID} 
                      data={{
                        key: rowData.id,
                        title: `${rowData.rOrgName}`,
                        watermark: rowData.status,
                        subTitle: <div>
                                    <p>{rowData.orderType } {"(" +rowData.orderNo + ")"}</p>
                                    <p className="mt8">到货时间: {rowData.expectDate}</p>
                                    </div>,
                        content: <span >送货单总数量{ rowData.deliveryTotal }  / 已发货送货单: { rowData.shippedTotal } </span>,
                        extra: `￥${ rowData.price.toFixed(2) }`,        
                        logo: rowData.logo,
                      }} 
                      footer={true}
                    />
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
          {/* 底部工具栏 */}
          <Footer active={'order'}/>
          </div>
    )
  }
}

export default OrderList;