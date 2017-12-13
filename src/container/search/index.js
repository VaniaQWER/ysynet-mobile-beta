import React, { Component } from 'react';
import { SearchBar, Flex, Icon, Accordion } from 'antd-mobile';
import { hashHistory } from 'react-router';
import PageSearch from '../../component/page_search'
import SiderSearchBar from '../../component/sider_search';
import { SearchCondition } from '../../constants';
import { setLocalStorage, getLocalStorage } from '../../utils/localstorage';
import './style.css';
/**
 * @summary 查询页面
 */
class SearchPage extends Component {
  state = {
    activeKey: null,
    historyData: null
  }
  onSearch = (value) => {
    const type = this.props.location.state.type;
    setLocalStorage(type, value, 'array');
    hashHistory.push({pathname: `/${type}`, state: {type: type, value: value}});
  }
  render () {
    const type = this.props.location.state.type;
    const historyData = getLocalStorage(type, 'array');
    return (
      <div>
        <Flex style={{backgroundColor: '#efeff4'}}>
          <Icon type={'left'} onClick={() => hashHistory.push({pathname: `/${type}`})}/>
          <Flex.Item>
            <SearchBar 
              className={'ysynet-order-searchbar'}
              placeholder="输入订单编号/公司名称" 
              onFocus={() => this.setState({activeKey: null})}
              onSubmit={this.onSearch}
            />
          </Flex.Item>
        </Flex>
        <PageSearch data={historyData || []} type={type}/>
        <Accordion 
          activeKey={this.state.activeKey} 
          onChange={key => this.setState({activeKey: key})}
        >
          <Accordion.Panel header="更多方式" key={1} className="ysynet-search-accordion">
            <SiderSearchBar data={SearchCondition} onSubmit={(result) => {
              console.log(result);
              this.setState({open: false})
            }}/> 
          </Accordion.Panel>
        </Accordion>
      </div>  
    )
  }
}
export default SearchPage;