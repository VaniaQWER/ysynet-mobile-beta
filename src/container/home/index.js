import React, { Component } from 'react';
import { NoticeBar, Carousel,
  WhiteSpace } from 'antd-mobile';
import Header from '../../component/header';
import Footer from '../../component/footer';
import Abstract from '../../component/abstract';
import ContentTools from '../../component/content';
import SearchMirror from '../../component/search_mirror';
import { hashHistory } from 'react-router';
import { Notice } from '../../constants';

class Home extends Component {
  state = {
    data: [require('../../assets/1@3x.png'), require('../../assets/2@3x.png'),require('../../assets/3@3x.png')],
    imgHeight: 128,
  }
  render () {
    return (
      <div>
        {/* 头部 */}
        <Header>
        {/* 头部搜索框 */}
        <SearchMirror 
          style={{padding: 20, background: '#108ee9'}}
          placeholder={'搜索'}
          onClick={() => hashHistory.push({pathname: '/search', state: {type: ''}})}
        />
        <Carousel
          autoplay={true}
          infinite
          selectedIndex={1}
        >
          {this.state.data.map(ii => (
            <a
              key={ii}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={ii}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        </Header> 
        { /* 系统公告 */ }
        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          公告: 庆祝双11，医商云服务费用1折抢购，最低仅需998元！！！！！！！！！
        </NoticeBar>
        { /* 行业信息 */ }
        <Carousel
          style={{backgroundColor: '#ffffff', height: 80}}
          vertical
          dots={false}
          dragging={false}
          swiping={false}
          autoplay
          infinite
          speed={200}
          autoplayInterval={2000}
          resetAutoplay={false}
        >
          {
            Notice.map((item, index) => <Abstract key={index} url={item.img} content={item.abstract}/>)
          }
        </Carousel>
        <WhiteSpace size="lg" />
        { /* 相关业务 */ }
        <ContentTools onClick={ el => hashHistory.push({pathname: el.link})}/>  
        {/* 底部工具栏 */}
        <Footer active={'home'}/>
      </div>
    )
  }
}

export default Home;