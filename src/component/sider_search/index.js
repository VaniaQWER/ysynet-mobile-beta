import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import SearchItem from './searchItem';
import { Button } from 'antd-mobile';
import './style.css';

/**
 * @summary 侧边搜索栏
 */
class SiderSearchBar extends Component {
  state = {
    postData: this.props.data
  }
  itemClick = (data, index) => {
    const { postData } = this.state;
    const post = [];
    postData.map((item, i) => i === index ? post.push(data) : post.push(item));
    this.setState({ postData: post });
  }
  onSubmit = () => {
    const { postData } = this.state;
    const data = [];
    postData.map( (item, index) => {
      const postItem = [];
      item.conditions.map(list => ( list.selected ? postItem.push(list.type) : null))
      data.push({id: item.id, items: postItem })
      return data;
    })
    this.props.onSubmit(data);
  }
  reset = () => {
    this.setState({ postData: this.props.data })
  }
  render () {
    const { multiple } = this.props;
    return (
      <div className={'ysynet-searchbar'} style={this.props.style}>
        {
          this.state.postData.map((item, index) => (
            <SearchItem 
              index={index}
              data={item} 
              key={index} 
              multiple={multiple || false}
              onClick={this.itemClick}
            />
          ))
        }
        <div className={'ysynet-searchbar-bottom'}>
          <Button type="primary" size="small" inline className='mr-4' onClick={this.onSubmit} >确定</Button>
          <Button size="small" inline onClick={this.reset}>重置</Button>
        </div>
      </div>
    )
  }
}
SiderSearchBar.propTypes = {
  data: PropTypes.array.isRequired,
  multiple: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
}
export default SiderSearchBar;