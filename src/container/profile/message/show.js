import React from 'react';
import { NavBar, Icon ,Toast} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { User } from '../../../api'
import { fetchData } from '../../../utils';
import querystring from 'querystring';

class MsgShow extends React.Component{

    componentDidMount = ()=>{
        if(this.props.location.state.MESSAGE_READFSTATE==='00'){
            fetchData({
                url: User.UPDATEMSGREADFSTATE,
                body:querystring.stringify({messageTag:'inbox',messageGuid:this.props.location.state.MESSAGE_GUID }),
                err: err => console.log(err,'err'),
                success: data=>{
                    if(data.status){
                        console.log('成功！')
                    }else{
                        Toast.fail(data.msg);
                    }
                }
            })
        }
    }
    render(){
        const baseData = this.props.location.state;
        return this.props.children ||
        (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/profile/message',state:{...this.props.location.state,MESSAGE_READFSTATE:'01'}})}
            >我的消息详情
          </NavBar>
          <div className={'ysynet-content'}>
            <div className={'ysy-msg-upper'}>
                <h6 className={'ysy-msg-title'}>{baseData.MI_SYS_TYPE}</h6>
                <p className={'ysy-msg-time'}>{baseData.MI_LAST_SEND_DATE}</p>
            </div>
            <div className={'ysy-msg-detail'}>
                <p>{baseData.MESSAGE_CONTENT}</p>
            </div>
          </div>
        </div>)
    }
}
export default MsgShow