import React, { Component } from 'react';
import { NavBar, Icon, WhiteSpace, TextareaItem, ImagePicker ,List,Toast,Accordion,Checkbox } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import { fetchData,compressImage } from '../../../utils/index';
import querystring from 'querystring';
import { Equipment } from '../../../api';
import './style.css'

const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
//故障类型
const troubleTypes = [
    { value: '机械故障', label: '机械故障', selected: 0 },
    { value: '图像显示异常', label: '图像显示异常', selected: 0 },
    { value: '电器故障', label: '电器故障', selected: 0 },
    { value: '其他', label: '其他', selected: 0 },
];
class Edit extends Component{
    state = {
        multiple:false,
        data: troubleTypes,
        submitFiles: [],
        files: []
    }
    componentWillMount = ()=>{
        if(this.props.location.state.faultAccessory!==null){
            let urls = this.props.location.state.faultAccessory.split(';');
            let u = urls.splice(0,urls.length-1);
            let file = [],submitFile = [];
            u.map((item,index)=>{
                submitFile.push(Equipment.FTP+item)
                return file.push({
                    url: Equipment.FTP+item,
                    id: index
                })
            });
            this.setState({ files:file,submitFiles : submitFile})
        }
    }
    troubleChange = (e,val,index) => {
        const { data } = this.state;
        data[index].selected = 1;
        this.setState({data:data})
    }
    onChange = (files, type, index) => {
        const len = files.length - 1;
        const { submitFiles } = this.state;
        if (type === 'add') {
           compressImage(files[len], newImgData => {
            this.setState({ files, submitFiles: [...submitFiles, newImgData]});
          }) 
        } else {
          submitFiles.splice(index, 1);
          this.setState({ files, submitFiles: submitFiles});
        } 
      };
    onSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFields({ force: true }, (err) => {
            if(!err){
                let repairContentType = '';
                const { data } = this.state;
                data.map((item,index)=>{
                    if(item.selected === 1){
                        repairContentType +=item.value;
                        repairContentType+='、';
                        return null;
                    };
                    return null;
                })
                repairContentType = repairContentType.substring(0,repairContentType.length-1);
                console.log(repairContentType,'原因')

                const baseData  = this.props.location.state;
                let values = this.props.form.getFieldsValue();
                baseData.faultWords = values.faultWords;
                values.rrpairOrder = baseData.rrpairOrder;
                values.faultDescribe = baseData.faultDescribe;
                baseData.repairContentType =  values.repairContentType = repairContentType? repairContentType: baseData.repairContentType;
                baseData.repairContentTyp = values.repairContentTyp = baseData.afterRepairContentTyp? baseData.afterRepairContentTyp: baseData.repairContentTyp;                
               
                values.faultAccessory = this.state.submitFiles;
                console.log(values,'values');
                fetchData({
                    url:Equipment.updateRrpairType,
                    body:querystring.stringify(values),
                    err: err=>{
                        console.log(err);
                    },
                    success: data =>{
                        if(data.status){
                            Toast.success('操作成功',2,()=>{
                                hashHistory.push({
                                    pathname:'/equipment/equipmentDetail',
                                    state:baseData
                                })
                            })
                        }else{
                            Toast.fail('操作成功',data.msg)
                        }
                    }
                })
            }
        })
    }
    cancel = ()=>{
        hashHistory.push({pathname:'/equipment/equipmentDetail',state:{...this.props.location.state}})
    }
    
    render(){
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
           编辑维修内容
            </NavBar>
            <div className={'detail-content'}>
                <List>
                    <List>
                        <Accordion accordion openAnimation={{}} className="my-accordion">
                                <Accordion.Panel header={'故障类型'}>
                                    <List className="my-list">
                                        <List>
                                            <Item>
                                                {this.state.data.map((i,ind) => (
                                                    <CheckboxItem multipleLine key={i.value} defaultChecked={baseData.faultDescribe===i.value?true:false} onChange={(e) => this.troubleChange(e,i.value,ind)}>
                                                        {i.label}
                                                    </CheckboxItem>
                                                ))}
                                            </Item>
                                        </List>
                                    </List>
                                </Accordion.Panel>
                            </Accordion>
                    </List>
                    <Item arrow='horizontal' onClick={()=>hashHistory.push({pathname:'/equipment/selectCause',state:baseData})} extra={baseData.afterRepairContentTyp?baseData.afterRepairContentTyp:baseData.repairContentTyp}>
                        故障原因
                    </Item>
                </List>
                <WhiteSpace size='md' />
                <List>
                    <Item>
                        <TextareaItem
                            {...getFieldProps('faultWords')}
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
                            selectable={files.length < 4}
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
