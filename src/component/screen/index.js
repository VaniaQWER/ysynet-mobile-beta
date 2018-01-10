import React, { Component } from 'react';
import { Icon, Radio, List } from 'antd-mobile';
import Mask from '../mask';
import './style.css';
const RadioItem = Radio.RadioItem;
const data = [{
  key: 'type1',
  children: [
    {text: '默认排序', value: 0, checked: true }, { text: '条件1-1', value: 1 }, {text: '条件1-2', value: 2 }, {text: '条件1-3', value: 3 }
  ]
}, {
  key: 'type2',
  children: [
    {text: '全部时长', value: 0, checked: true  }, {text: '条件2-1', value: 1 }, {text: '条件2-2', value: 2 }, {text: '条件2-3', value: 3 }
  ]
}, {
  key: 'type3',
  children: [
    {text: '全部分区', value: 0, checked: true  }, {text: '条件3-1', value: 1 }, {text: '条件3-2', value: 2 }, {text: '条件3-3', value: 3 }
  ]
}]
/**
 * @file 筛选
 */
class Screen extends Component {
  constructor(props) {
    super(props);
    const checkedArr = [];
    data.map((item, index) => 
      item.children 
      ? item.children.map(list =>  {
        if (list.checked) {
          checkedArr[index] = { type: item.key, text: list.text, value: list.value }
        }
        return checkedArr;
      }) 
      : null
    )
    this.state = {
      showKey: null,
      checked: checkedArr
    }
  }
  onClick = (key, event) => {
    event.stopPropagation();
    const { showKey } = this.state;
    const newKey = key === showKey ? null : key;
    this.setState({
      showKey: newKey
    })
  }
  onChange = (parentKey, parentIndex, childValue, childText) => {
    const { checked } = this.state;
    const checedObj = checked[parentIndex];
    checedObj.value = childValue;
    checedObj.text = childText;
    this.setState({
      checked: checked,
      showKey: null
    })
    console.log('查询数据:', checked);
  }
  render () {
    const { showKey, checked } = this.state;
    showKey ? Mask.show({
      callback: () => this.setState({showKey: null})
    }) : Mask.remove();
    return ( 
      <div className='ysynet-screen'>
        {
          data.map((item, index) => (
            <div 
              key={index} 
              className={'ysynet-screen-item-header'}
              style={{
                width: `${(100/data.length).toFixed(4)}%`,
                borderLeft: index === 0 ? null : '1px solid #ddd'
              }}
            >
              <span style={{color: '#1890ff'}} onClick={this.onClick.bind(this, item.key)}>
                { checked[index].text }
                <Icon type={ showKey === item.key ? 'up' : 'down' } size='xxs'/>
              </span>
              <section 
                className={'ysynet-screen-item-body'}
                style={{
                  marginLeft: document.querySelector('.ysynet-screen-item-header') ? 
                  `-${index * document.querySelector('.ysynet-screen-item-header').offsetWidth + (index === 0 ? 0 : 1)}px` : null,
                  height: item.key === showKey ? `${45 * item.children.length}px` : '0px'
                  // display: item.key === showKey ? 'block' : 'none'
                }}>
                <List>
                  {
                    item.children.map((child, i) => (
                      <RadioItem 
                        key={child.value} 
                        checked={checked[index].value === child.value}
                        onChange={() => this.onChange(item.key, index, child.value, child.text)}
                      >
                        <span style={{color: checked[index].value === child.value ? '#1890ff' : '#000'}}>{child.text}</span>
                      </RadioItem>
                    ))
                  }
                </List>
              </section>
            </div>
          ))
        }
      </div>
    )
  }
}
export default Screen;