import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { FOOTER_TOOLS } from '../../constants';
import './style.css';

class Footer extends Component {
  state = {
    selectedTab: this.props.active
  }
  render() {
    const { selectedTab } = this.state;
    return (
      <footer className='phxl-footer'>
        <TabBar>
          {
            FOOTER_TOOLS.map((item, index) => (
                <TabBar.Item
                  icon={{ uri: item.bg }}
                  selectedIcon={{ uri: item.activeBg }}
                  title={item.text}
                  key={index}
                  selected={selectedTab === item.selectedTab}
                  onPress={() => {
                    this.setState({
                      selectedTab: item.selectedTab,
                    });
                    hashHistory.push({
                      pathname: item.link
                    })
                  }}
                >
                </TabBar.Item>
              ))
          }
        </TabBar>  
      </footer>  
    )
  }
}

export default Footer;