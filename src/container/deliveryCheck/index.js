import React from 'react';
import { NavBar, Icon,SearchBar,Card } from 'antd-mobile';
import { hashHistory } from 'react-router';
import Slider from '../common/slider';

/**
 * @summary 送货单验收
 */
class DeliveryCheck extends Slider {
  constructor(props) {
    super(props);
    this.url = 'order';
    this.state = {
      //dataSource: this.dataSource,
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
   // this.genData();
  }
  onEndReached = (event) => {
    if (this.state.isMore) {
      this.genData({
        endReached: true
      });
    }
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
            onLeftClick={() => hashHistory.push({pathname: '/'})}
          >送货单验收
          </NavBar>
          <div className={'ysynet-content'}>
            <SearchBar 
              placeholder="搜索送货单" 
              onSubmit={value => {
                document.querySelector('.am-list-view-scrollview').scrollTo(0, 0);
                this.genData({
                  query: { equipmetStandarName: value }
                });
              }}
            />
            <Card onClick={() => hashHistory.push({pathname: `/deliveryCheck/detail`})}>
              <Card.Header
                title="武汉普华信联科技有限公司"
                thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                extra={<span>待验收</span>}
              />
              <Card.Body>
                <p className="list">普耗送货单:SH2903832201920339030</p>
                <p className="list">订单号:DD98069860696096069999</p>
              </Card.Body>
              <Card.Footer content="产品总数量:20" extra={<div className="money">￥19220.00</div>} />
            </Card>
          </div>
          </div>
    )
  }
}

export default DeliveryCheck;