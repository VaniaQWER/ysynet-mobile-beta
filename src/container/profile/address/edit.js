import React from 'react';
import { NavBar, Icon, List,InputItem,Modal,Picker,Button,WingBlank,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { fetchData,jsonNull } from '../../../utils';
import { hashHistory } from 'react-router';
import querystring from 'querystring';
import { User } from '../../../api'
import './style.css';

const alert = Modal.alert;
const Item = List.Item;

class EditAddress extends React.Component{
    state = {
        visible: false,
        addressData: [],
        pickerValue: [],
    }
    componentDidMount = ()=>{
        fetchData({
            url: '/address',
            method: 'get',
            error : err=>{
                console.log(err,'err');
            },
            success: data=>{
                this.setState({ addressData: data.result });
            }
        })
    }
    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
          this.setState({ hasError: true });
        } else {
          this.setState({ hasError: false });
        }
    }
    deleteAlert = ()=>{
        const alertInstance = alert('删除', '确认删除这条地址记录???', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
            { text: 'OK', onPress: () => this.delete() },
          ]);
          setTimeout(() => {
            // 可以调用close方法以在外部close
            console.log('auto close');
            alertInstance.close();
          }, 500000);
    }
    delete = ()=>{
        fetchData({
            url:User.DELETEADDR,
            body: querystring.stringify({ addrGuid:this.props.location.state.addr_guid }),
            err : err=>console.log(err,'err'),
            success: data=>{
                if(data.status){
                    Toast.success('操作成功',2,()=>{
                        hashHistory.push({pathname:'/profile/address' });
                    })
                }else{
                    Toast.fail(data.msg);
                }
            }
        });
    }
    onSubmit = ()=>{
        this.props.form.validateFields({ force: true }, (error) => {
            if (!error) {
                let values = this.props.form.getFieldsValue();
                console.log(values,'values');
                let postData = {};
                postData.addrGuid = this.props.location.state.addr_guid;
                postData.linkman = values.linkman;
                postData.linktel = values.linktel;
                postData.tfAddress = values.tfAddress;
                postData.tfProvince = this.state.pickerValue[0];
                postData.tfCity = this.state.pickerValue[1];
                postData.tfDistrict = this.state.pickerValue[2];
                console.log(postData,'postData');
                fetchData({
                    url:User.UPDATEADDR,
                    body:querystring.stringify(postData),
                    err: err=> console.log(err,'err'),
                    success: data=> {
                        if(data.status){
                            Toast.success('操作成功',2,()=>{
                                hashHistory.push({pathname: '/profile/address'});
                            })
                        }else{
                            Toast.fail(data.msg);
                        }
                    }
                })
            } 
          });
    }
    render(){
        const baseData = jsonNull(this.props.location.state);
        let tfAddress = baseData.province+baseData.city+baseData.district;
        const { getFieldProps, getFieldError  } = this.props.form;
        return this.props.children ||
        (
        <div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/profile/address',state:this.props.location.state})}
                rightContent={<a onClick={()=>this.deleteAlert()}>删除</a>}
            >编辑我的地址
          </NavBar>
          <div className={'ysynet-content'}>
                <form>
                    <List className={'ysy-editAddr'}>
                        <InputItem {...getFieldProps('linkman',{
                            rules:[{required:true,message:'请输入姓名'}],
                            initialValue: baseData.linkman
                        })} 
                        clear
                        error={!!getFieldError('linkman')}
                        onErrorClick={() => {
                            alert(getFieldError('linkman').join('、'));
                        }}
                        placeholder="请输入收货人姓名">
                            姓名
                        </InputItem>
                        <InputItem {...getFieldProps('linktel',{
                            rules:[{required:true,message:'请输入手机号码'},
                            {pattern:/^1[3|4|5|7|8][0-9]{1}\s{1}[0-9]{4}\s{1}[0-9]{4}$/,message:'只能是数字'},
                        ],
                            initialValue: baseData.linktel
                        })} 
                        clear
                        error={!!getFieldError('linktel')}
                        onErrorClick={() => {
                            alert(getFieldError('linktel').join('、'));
                        }}
                        placeholder="请输入手机号码" type='phone'>
                            手机号码
                        </InputItem>
                        <Item arrow="horizontal" multipleLine onClick={() => this.setState({ visible:true})}>
                            所在区域<span className={'showText'}>{this.state.pickerValue.length>0?this.state.pickerValue:tfAddress!==""? tfAddress :null}</span>
                        </Item>
                        <InputItem {...getFieldProps('tfAddress',{
                            rules:[{required:true,message:'请输入街道、楼牌号等详细地址'}],
                            initialValue: baseData.addr
                        })} 
                        clear
                        error={!!getFieldError('tfAddress')}
                        onErrorClick={() => {
                            alert(getFieldError('tfAddress').join('、'));
                        }}
                        placeholder="街道、楼牌号等详细地址">
                            详细地址
                        </InputItem>
                    </List>
                    <Picker
                        visible={this.state.visible}
                        data={this.state.addressData}
                        value={this.state.pickerValue}
                        onChange={v => {console.log(v,'v');this.setState({ pickerValue: v })}}
                        onOk={() => this.setState({ visible: false })}
                        onDismiss={() => this.setState({ visible: false })}
                    />
                    <WingBlank size='md' style={{marginTop:16}}>
                        <Button type="primary" onClick={this.onSubmit}>保存</Button>
                    </WingBlank>
                </form>
          </div>
        </div>)
    }
}
const EditAddressWrapperForm = createForm()(EditAddress);
export default EditAddressWrapperForm;