import React, { Component } from 'react';
import { NoticeBar, Carousel,
  WhiteSpace } from 'antd-mobile';
import Header from '../../component/header';
import HeaderTools from '../../component/header_tools';
import Footer from '../../component/footer';
import Abstract from '../../component/abstract';
import ContentTools from '../../component/content';
import SearchMirror from '../../component/search_mirror';
import { hashHistory } from 'react-router';
import { Notice } from '../../constants';

class Home extends Component {
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
        { /* 头部工具栏 */ }
        <HeaderTools/>
        </Header> 
        { /* 系统公告 */ }
        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          公告: 庆祝双11，医商云服务费用1折抢购，最低仅需998元
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