import React, { Component } from 'react';

/**
 * @summary 侧边查询条件筛选Item
 */

class SearchItem extends Component {
  state = {
    postValue: this.props.data
  }
  componentWillReceiveProps(nextProps) {
    this.setState({postValue: nextProps.data});
  }
  // 单个元素点击
  itemSelected = (item, index) => {
    const { multiple } = this.props;
    const { postValue } = this.state;
    let arrValues = [];
    postValue.conditions.map((item, i) => {
      if (index === i) {
        arrValues.push({...item, selected: !item.selected });
      } else {
        multiple ? arrValues.push(item) : arrValues.push({...item, selected: false});
      }
      return arrValues;
    })
    const newItem = { ...postValue, conditions: arrValues };
    this.setState({ postValue: newItem });
    this.props.onClick(newItem, this.props.index);
  }
  render () {
    const { postValue } = this.state;
    return (
      <div className={'ysynet-searchbar-item'}>
        <h4 className={'title'}>{ postValue.title }</h4>
        <ul>
          {
            postValue.hasOwnProperty('conditions') ?
            postValue.conditions.map((item, index) => (
              <li key={index}>
                <a 
                  onClick={this.itemSelected.bind(this, item, index)} 
                  className={item.selected ? 'active' : null}
                >
                  { item.text }
                </a>
              </li>
            )) : null
          }
        </ul> 
      </div> 
    )
  }
}
export default SearchItem;