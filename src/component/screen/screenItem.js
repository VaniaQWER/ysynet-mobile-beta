import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
/**
 * @file 筛选元素
 * @param {*} param0 
 */
class ScreenItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      icon: 'down'
    }
  }
  onClick = () => {
    const { onClick } = this.props;
    const { icon } = this.state;
    this.setState({
      icon: icon === 'down' ? 'up' : 'down'
    })
    onClick();
  }
  render () {
    const { style, title } = this.props;
    const { icon } = this.state;
    return (
      <a 
        className={'ysynet-screen-item'} 
        style={style} 
        onClick={this.onClick}
      > { title }
        <Icon type={icon} size='xxs'/> 
      </a>
    )
  }
}
export default ScreenItem;