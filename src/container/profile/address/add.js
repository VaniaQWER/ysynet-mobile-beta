import React from 'react';
import { NavBar, Icon, List, Modal,Button,Picker,InputItem,WingBlank,Radio,SegmentedControl,Toast} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import { fetchData } from '../../../utils';
import querystring from 'querystring';
import { User } from '../../../api'
import './style.css';
const RadioItem = Radio.RadioItem;
const Item = List.Item;
const alert = Modal.alert;
class NewAdd extends React.Component{
    state = {
        visible: false,
        plholderText: '选择所在省份、城市、区县',
        addressType: '科室',
        selectVal:'',
        selectedIndex:0,
        addressData: [],//全国地址
        storageOptions: [],//库房
        deptOptions: [],//科室
        radioData: [],
        pickerValue: [],
    }
    componentDidMount = ()=>{
        //当前用户所属科室
        Toast.loading('loading......');
        fetchData({
            url:User.FINDMYDEPT,
            body:querystring.stringify({ flag:'02' }),
            err: err =>{
                console.log(err,'err');
            },
            success: data =>{
                Toast.hide();
                this.setState({ deptOptions: data });
            }
        });
        //当前用户所属库房
        fetchData({
            url:User.FINDMYStORAGE,
            err: err =>{
                console.log(err,'err');
            },
            success: data =>{
                this.setState({ storageOptions: data.result });
            }
        });
        //地址列表
        fetchData({
            url: '/address',
            method: 'get',
            error : err=>{
                console.log(err,'err');
            },
            success: data=>{
                this.setState({ addressData: data.result });
            }
        });
        
    }
    selectAddr  = (type)=>{
        let options = [];
        const { storageOptions, deptOptions } = this.state;
        const data = type==='库房'? storageOptions : deptOptions;
        data.map((item,index)=>{
            return options.push(<RadioItem key={index} 
                checked={this.state.selectVal === (item.stoguid?item.stoguid:item.deptGuid)} 
                onChange={()=>this.setState({selectVal:item.stoguid?item.stoguid:item.deptGuid})} 
                value={item.stoguid?item.stoguid:item.deptGuid}>
                {item.stoname?item.stoname:item.deptname}
            </RadioItem>)
        });
        return options;
    }
    onChange = (e) => {
        this.setState({ selectedIndex: e.nativeEvent.selectedSegmentIndex})
    }
    onValueChange = (value) => {
        this.setState({ addressType : value });
    }
    save = (e)=>{
        e.stopPropagation();
        this.props.form.validateFields({ force: true }, (error) => {
            if(!error){
                //selectedIndex 0 :科室  1 库房
                let url = null;
                url = this.state.selectedIndex === 1 ? User.ADDSTORAGEADDR:User.DEPTADDADDR;
                let postData = {};
                let values = this.props.form.getFieldsValue();
                console.log(values,'values')
                this.state.selectedIndex === 1 ? postData.storageGuid = this.state.selectVal:postData.deptGuid = this.state.selectVal;
                postData.linkman = values.linkman;
                postData.linktel = values.linktel;
                postData.tfAddress = values.tfAddress;
                postData.tfProvince = this.state.pickerValue[0];
                postData.tfCity = this.state.pickerValue[1];
                postData.tfDistrict = this.state.pickerValue[2];
                console.log(postData,'postData');
                fetchData({
                    url:url,
                    body:querystring.stringify(postData),
                    err: err=>console.log(err,'err'),
                    success: data =>{
                        console.log(data,'data');
                        if(data.status){
                            Toast.success('操作成功',2,()=>{
                                hashHistory.push({pathname: '/profile/address'});
                            })
                        }else{
                            Toast.fail(data.msg);
                        }
                        
                    }
                });
            }
        });;
    }
    render(){
        const { getFieldProps, getFieldError  } = this.props.form;
        return this.props.children ||
        (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/profile/address',state:this.props.location.state})}
            >新增地址
          </NavBar>
          <div className={'ysynet-content'}>
            <form>
                <List className={'ysy-editAddr'}>
                    <InputItem {...getFieldProps('linkman',{
                        rules:[{required:true,message:'请输入姓名'},
                        {pattern:/[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,message:'只能是中文、英文、数字、下划线(_)、中横线(-)'},
                        {max:20,message:'字符长度不能超过20'},
                    ]
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
                    ]
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
                        所在区域<span className={this.state.pickerValue.length>0?'showText':'hideText'}>{this.state.pickerValue.length>0?this.state.pickerValue:this.state.plholderText}</span>
                    </Item>
                    <InputItem {...getFieldProps('tfAddress',{
                        rules:[{required:true,message:'请输入街道、楼牌号等详细地址'}]
                    })} 
                    clear
                    error={!!getFieldError('tfAddress')}
                    onErrorClick={() => {
                        alert(getFieldError('tfAddress').join('、'));
                    }}
                    placeholder="街道、楼牌号等详细地址">
                        详细地址
                    </InputItem>
                    <Item className={'segmentControl'} arrow="horizontal" multipleLine onClick={this.selectAddr}
                        extra={ <SegmentedControl
                                    selectedIndex={this.state.selectedIndex}
                                    values={['科室', '库房']}
                                    onChange={this.onChange}
                                    onValueChange={this.onValueChange}
                                    tintColor={'#108ee9'}
                                    style={{ height: '32px', width: '150px' }}
                                />
                            }>
                        地址类型
                    </Item>
                    <Item>
                        科室&部门
                        <div className={'selectAddr'}>
                            {
                                this.state.storageOptions.length>0 && this.selectAddr(this.state.addressType)
                            }
                        </div>
                    </Item>
                </List>
                <Picker
                    visible={this.state.visible}
                    data={this.state.addressData}
                    value={this.state.pickerValue}
                    onChange={v => {this.setState({ pickerValue: v })}}
                    onOk={() => this.setState({ visible: false })}
                    onDismiss={() => this.setState({ visible: false })}
                />
                <WingBlank size='md' style={{marginTop:16}}>
                    <Button type="primary" onClick={this.save}>保存</Button>
                </WingBlank>
            </form>
          </div>
        </div>)
    }
}
const NewAddForm = createForm()(NewAdd);
export default NewAddForm;