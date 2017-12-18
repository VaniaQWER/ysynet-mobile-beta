import React, { Component } from 'react';
import { NavBar, Icon, List, TextareaItem} from 'antd-mobile';
import { hashHistory } from 'react-router';
import querystring from 'querystring';
import { createForm } from 'rc-form';
import { fetchData } from '../../../utils';
class Remark extends Component{
    onSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields({ force: true }, (err) => {
            if(!err){
                let value = this.props.form.getFieldsValue();
                console.log(value,'value');
                fetchData({
                    url:"rrpairOrderController/updateRrpairContent",
                    body:querystring.stringify({
                        rrpairOrder:this.props.location.state.rrpairOrder,
                        type:0,
                        value:value
                    }),
                    error: data => {
                      console.log(data.msg,'err')
                    },
                    success: data => {
                      if(data.status){
                          alert('提交成功！');
                          hashHistory.push({pathname:'equipment/equipmentDetail',state:this.props.location.state})
                      }
                    }
                  }) 
            }else{
                alert('Validation failed');
            }
        })
    }
    cancel = ()=>{
        hashHistory.push({pathname:'equipment/equipmentDetail',state:this.props.location.state})
    }

    render(){
        console.log(this.props,'porps')
        const { getFieldProps } = this.props.form;
        return this.props.children ||
        (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/equipmentDetail',state:this.props.location.state})}
            >
            添加备注
            </NavBar>
            <div className={'detail-content'}>
                <List>
                    <TextareaItem
                        {...getFieldProps('tfRemark', {
                        initialValue: '',
                        })}
                        rows={6}
                        style={{border:'solid 1px #ccc',height:'auto',borderRadius:3}}
                        placeholder='备注内容'
                        count={140}
                    />
                </List>
            </div>
            <div className={'ysynet-detail-foot'}>
                <div className={'foot-button'}>
                    <a className={'btn-cancel'} onClick={this.cancel}>取消</a>
                    <a className={'btn-submit'} onClick={this.onSubmit}>提交</a>
                </div>
            </div>
        </div>
        )
    }
}
const WrapperAddReamrk = createForm()(Remark);
export default WrapperAddReamrk;