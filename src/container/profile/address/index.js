import React from 'react';
import { NavBar, Icon, List, Toast, Modal,Button} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { fetchData } from '../../../utils';
import querystring from 'querystring';
import { User } from '../../../api'
import './style.css';
const Item = List.Item;
const alert = Modal.alert;
class Address extends React.Component{
    state = {
        addressData: []
    }
    //查询我的地址列表
    componentDidMount = ()=>{
        this.genData();
    }
    genData = ()=>{
        Toast.loading('加载中......');
        fetchData({
            url: User.FINDADDRSBYUSER,
            err: err=>{
                console.log(err,'err');
            },
            success: data=>{
                Toast.hide();
                this.setState({addressData:data.result })
            }
        })
    }
    deleteAddr = (item,index)=>{
        const alertInstance = alert('删除', '确认删除这条地址记录?', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确认', onPress: () => this.delete(item) },
          ]);
          setTimeout(() => {
            // 可以调用close方法以在外部close
            console.log('auto close');
            alertInstance.close();
          }, 500000);
    }
    delete = (value)=>{
        console.log(value,'value')
        fetchData({
            url:User.DELETEADDR,
            body: querystring.stringify({ addrGuid:value.addr_guid }),
            err : err=>console.log(err,'err'),
            success: data=>{
                if(data.status){
                    Toast.success('操作成功',2,()=>{
                        this.genData();
                    })
                }else{
                    Toast.fail(data.msg);
                }
            }
        });
    }

    ShowAddress = (item,index)=>{
        return (<List key={index} className={'ysy-address'}>
            <Item className={'ItemHeader'}>
                <span className={'userName'}>{item.linkman}</span>
                <span className={'phone'}>{item.linktel}</span>
                {
                    item.default==='01' && <span className={'defaultFlag'}>默认</span>
                }
            </Item>
            <Item>
                <span className={item.flag===1?'ysy-tag-storage':'ysy-tag-dept'}>{item.flag===1?'库房':'科室'}</span>
                <span>{item.addr}</span>
            </Item>
            <Item>
                {
                    item.isDefault==='01' && <span className={'defaultAddress'}>默认地址</span>
                }
                <span className={'btn-group'}>
                    <a className={'btn btn-edit'} onClick={()=>hashHistory.push({ pathname:'/profile/EditAddr',state:item })}>编辑</a>
                    <a className={'btn btn-delete'}onClick={()=>this.deleteAddr(item,index)}>删除</a>
                </span>
            </Item>
        </List>)
    }
    render(){
        return this.props.children ||
        (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/profile',state:this.props.location.state})}
            >我的地址
          </NavBar>
          <div className={'ysynet-content'}>
            <div className={'ysynet-addList'}>
                    {
                        this.state.addressData.map((item,index)=>{
                            return this.ShowAddress(item,index)
                        })
                    }
            </div>
            <div className={'addr-footer'}>
                <Button type='primary' onClick={()=>hashHistory.push({pathname:'/profile/newAdd' })}>新增地址</Button>
            </div>
          </div>
        </div>)
    }
}
export default Address;