/**
 * 审批管理
 */ 

import React, { Component } from 'react';
import { NavBar, Icon,SearchBar,Card} from 'antd-mobile';
import { hashHistory } from 'react-router';

class Audit extends Component {
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
    render() {
        return this.props.children || (
            <div>
                <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/'})}
                >审批管理
                </NavBar>
                <div className={'ysynet-content'}>
                    <SearchBar 
                    placeholder="搜索" 
                    onSubmit={value => {
                        document.querySelector('.am-list-view-scrollview').scrollTo(0, 0);
                        this.genData({
                        query: { equipmetStandarName: value }
                        });
                    }}
                    />
                    <Card onClick={() => hashHistory.push({pathname:'/auditMgt/details'})}>
                        <Card.Header
                            title="门诊科室"
                            extra={<span>待审批</span>}
                        />
                        <Card.Body>
                            <p className="list">普耗送货单:PA2903832201920339030</p>
                        </Card.Body>
                        <Card.Footer content="发起人:张三" extra={<div className="money">￥19220.00</div>} />
                    </Card>
                </div>
            </div>
        )
    }
}
export default Audit;