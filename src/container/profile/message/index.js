import React  from 'react';
import { NavBar, Icon, ListView, PullToRefresh,WhiteSpace,List } from 'antd-mobile';
import Slider from '../../common/slider';
import { hashHistory } from 'react-router';
import { User } from '../../../api'
import './style.css';
const Item = List.Item;
class MyMessageList extends Slider{
    constructor(props) {
        super(props);
        this.url = User.GETMYMESSAGELIST;
        this.searchName = { messageTag: 'inbox' };
        this.state = {
          dataSource: this.dataSource,
          pageIndex: 1,
          isMore: true,
          isLoading: true,
          refreshing: true,
          sectionIDs: [],
          rowIDs: [],
          dataBlobs: {},
        }
    }
    componentDidMount() {
      this.genData();
    }
    onEndReached = (event) => {
      if (this.state.isMore) {
        this.genData({
          endReached: true
        });
      }
    }
    render(){
        return this.props.children ||
        (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/profile',state:this.props.location.state})}
            >我的消息
          </NavBar>
          <div className={'ysynet-content'}>
          <ListView
              style={{height: '85vh'}}
              dataSource={this.state.dataSource}
              renderBodyComponent={() => <div style={{background: '#efeff4'}}></div>}
              renderRow={
                (rowData, sectionID, rowID) => {
                  return (
                  <div className={'ysy-message'}>
                        <p style={{textAlign:'center'}}>{rowData.MI_LAST_SEND_DATE}</p>
                        <List >
                            <Item extra={this.props.location.state!==undefined&& this.props.location.state.MESSAGE_READFSTATE==='01'?null: rowData.MESSAGE_READFSTATE==='00'?<span className='unReadCicle'></span>:null}>
                              <h4 className={'ysy-msg-title'}>{rowData.MI_SYS_TYPE}</h4>
                            </Item>
                            <Item arrow="horizontal" onClick={()=>hashHistory.push({pathname:'/profile/message/show',state:rowData})}>{rowData.MESSAGE_TITLE}</Item>
                        </List>
                    <WhiteSpace  size='lg'/>
                 </div>
                  );
                }
              } 
              renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                {
                  this.state.isMore ? this.state.isLoading ? '加载中...' : '下拉加载更多' : '没有了'
                }
              </div>)}
              pageSize={4}
              pullToRefresh={<PullToRefresh style={{color: 'red'}}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />}
              scrollEventThrottle={200}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
          </div>
          
        </div>)
    }
}
export default MyMessageList;