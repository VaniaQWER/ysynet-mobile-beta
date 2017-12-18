import React, { Component } from 'react';
import { NavBar, Icon, WhiteSpace, TextareaItem, ImagePicker ,List, } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import './style.css'
const Item = List.Item;

class Edit extends Component{
    state = {
        clicked:'none',
        multiple:false,
        files: [],
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({ files });
      };
    onSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields({ force: true }, (err) => {
            if(!err){
                let values = this.props.form.getFieldsValue();
                values.failure = this.props.location.state.failure;
                values.imageUrl = this.state.files[0].url;
                console.log(values);
            }
        })
    }
    cancel = ()=>{
        hashHistory.push({pathname:'/equipment/equipmentDetail',state:{...this.props.location.state}})
    }
    render(){
        console.log(this.props)
        const baseData = this.props.location.state;
        const { files } = this.state;
        const { getFieldProps } = this.props.form;
        return this.props.children ||
        (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/equipmentDetail',state:baseData})}
            >
            编辑故障描述
            </NavBar>
            <div className={'detail-content'}>
                <List>
                    <Item arrow='horizontal' onClick={()=>hashHistory.push({pathname:'/equipment/troublSelect',state:{...baseData,key:'1'}})}>
                        故障现象
                    </Item>
                </List>
                <WhiteSpace size='md' />
                <List>
                    <Item>
                        <TextareaItem
                            {...getFieldProps('note3')}
                            autoHeight
                            placeholder="请输入文字说明"
                            rows={3}
                            labelNumber={5}
                            />
                    </Item>
                </List>
                <WhiteSpace size='md' />
                <List>
                    <div className={'imagePicker'}>
                        <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 1}
                            multiple={this.state.multiple}
                            />
                    </div>
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
const BasicInputExampleWrapper = createForm()(Edit);
export default BasicInputExampleWrapper;
