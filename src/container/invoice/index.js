import React from 'react';
import { NavBar, Icon, ListView, PullToRefresh } from 'antd-mobile';
import SearchMirror from '../../component/search_mirror';
import Slider from '../common/slider';
import CardList from '../../component/cardList';
import { Status } from '../../constants';
import { hashHistory } from 'react-router';
/**
 * @file 发票
 */

class Invoice extends Slider {
  constructor(props) {
    super(props)
    this.url = 'invoice';
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
    return this.props.children || (
      <div>
        <NavBar
          className={'ysynet-header'}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => hashHistory.push({pathname: '/'})}
          rightContent={
            <div>1234567</div>
          }
        >发票
        </NavBar>
        <div className={'ysynet-content'}>
          <SearchMirror 
            placeholder={'请输入发票代码/号码/送货单'}
            onClick={() => hashHistory.push({pathname: '/search', state: {type: 'invoice'}})}
          />
          <ListView
            style={{height: '85vh'}}
            dataSource={this.state.dataSource}
            renderBodyComponent={() => <div style={{background: '#efeff4'}}></div>}
            renderRow={
              (rowData, sectionID, rowID) => {
                return (
                  <CardList 
                    onClick={(key) => hashHistory.push({pathname: `/invoice/${key}`})}
                    subClick={(key) => hashHistory.push({pathname: `/supplier/${key}`})}
                    key={rowID} 
                    data={{
                      key: rowData.id,
                      title: rowData.supplierName,
                      subTitle: `开票日期：${rowData.billDate}`,
                      watermark: Status[rowData.status],
                      content: <span className={'productname ellipsis'}>
                                发票代码：{ rowData.invoiceCode }
                                <br/>
                                发票编码：{ rowData.invoiceNo }
                                </span>,
                      extra: `￥${ Number(rowData.amount).toFixed(2) }`,        
                      logo: rowData.logo,
                    }} 
                    footer={false}
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
      </div>  
    )
  }
}

export default Invoice;