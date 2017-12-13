import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { clearLocalStorage } from '../../utils/localstorage';
import './style.css';
/**
 * @summary 查询页面卡片组件
 */

class PageSearch extends Component {
  state = {
    data: this.props.data
  }
  clear = () => {
    const { type } = this.props;
    clearLocalStorage(type);
    this.setState({data: []});
  }
  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }
  
  render () {
    const { type } = this.props;
    const { data } = this.state;
    return (
      <div className={'ysynet-search'}>
        <section>
          <header className={'ysynet-search-header'}>
            <span>历史搜索</span>
            {
              data.length ? 
              <img src={require('../../assets/trash.svg')} alt='垃圾桶' onClick={this.clear}/> : null
            }
          </header>
          <section className={'ysynet-search-history'}>
            {
              data.map((item, index) => (
                <Link 
                  key={index} 
                  className={'ysynet-search-tag'} 
                  to={{pathname: `/${type}`, state: {type, value: item}}}> 
                  { item } 
                </Link>
              ))
            }
          </section>
        </section>
        <section>
          <header className={'ysynet-search-header'}>
            <span>热门搜索</span>
          </header>
          <section className={'ysynet-search-history'}>
          <Link 
            className={'ysynet-search-tag'} 
            to={{pathname: `/${type}`, state: {type, value: '止血纱布'}}}> 
            止血纱布
          </Link> 
          <Link 
            className={'ysynet-search-tag'} 
            to={{pathname: `/${type}`, state: {type, value: '心脏起搏器'}}}> 
            心脏起搏器
          </Link>    
          </section>
        </section>
      </div>
    )
  }
}

PageSearch.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}

export default PageSearch;