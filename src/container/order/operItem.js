import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import './style.css';
/**
 * @summary 手术包明细组件
 */
class OperItem extends Component {
  onClick = (other) => {
    hashHistory.push({
      pathname: `/order/operother/other/detail`,
      state: other
    })
  }
  render() {
    const { dataItem } = this.props;
    return (
      <div 
        className={'ysynet-package'} 
        onClick={dataItem.children  ? this.onClick.bind(this, dataItem.children) : null}
      >
        <div className={'package-item'}> { dataItem.text.substring(0, 1) } </div>
        <div className={'summary'}>
          <span className={'title'}>{dataItem.text}:</span>{`${dataItem.total}` }
        </div>
      </div>
    )
  } 
}
export default OperItem;