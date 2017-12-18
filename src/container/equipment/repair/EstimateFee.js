import React, { Component } from 'react';
import { NavBar, Icon, WhiteSpace,InputItem,TextareaItem, List, Modal } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
const alert = Modal.alert;
class EstimateFee extends Component{

    onSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields({ force: true }, (err) => {
            if(!err){
                let values = this.props.form.getFieldsValue();
                console.log(values,'value')
            }else{
                alert('请输入预估费用！');
            }
        })
    }
    cancel = ()=>{
        hashHistory.push({pathname:'/equipment/equipmentDetail',state:this.props.location.state});
    }
    render(){
        const { getFieldProps } = this.props.form;
        return this.props.childre||
        (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/equipmentDetail',state:this.props.location.state})}
            >预估费用
            </NavBar>
            <div className={'ysynet-content'}>
                <InputItem
                    {...getFieldProps('money',{
                        rules:[{required:true}]
                    })}
                    type={'money'}
                    placeholder="填写预估费用"
                    clear
                    moneyKeyboardAlign="left"
                ><span style={{fontSize:13}}><label style={{color:'red'}}>*</label>预估费用(元)</span>
                </InputItem>
                <WhiteSpace size='md' />
                <List renderHeader={() => '费用详情'}>
                    <TextareaItem
                        {...getFieldProps('feeDetail', {
                        initialValue: '',
                        })}
                        placeholder='填写费用详情'
                        rows={7}
                        count={500}
                    />
                </List>
                <div className={'ysynet-detail-foot'}>
                    <div className={'foot-button'}>
                        <a className={'btn-cancel'} onClick={this.cancel}>取消</a>
                        <a className={'btn-submit'} onClick={this.onSubmit}>提交</a>
                    </div>
                </div>
            </div>
        </div>)
    }
}
const WrapperEstimateFee = createForm()(EstimateFee);
export default WrapperEstimateFee;