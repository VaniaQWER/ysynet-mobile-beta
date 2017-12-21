import React, { Component } from 'react';
import { NavBar, Icon, WhiteSpace, TextareaItem, ImagePicker, List, Checkbox,Toast, Accordion} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import { fetchData, compressImage } from '../../../utils/index';
import querystring from 'querystring';
import { Equipment } from '../../../api';
import './style.css'

const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
//故障现象
const checkboxOps = [
    { value: '部分功能失效', label: '部分功能失效', selected: 0 },
    { value: '开机后死机', label: '开机后死机', selected: 0 },
    { value: '性能指标偏离', label: '性能指标偏离', selected: 0 },
    { value: '不规则或偶发故障', label: '不规则或偶发故障', selected: 0 },
    { value: '其他', label: '其他', selected: 0 }
];
class Edit extends Component{
    state = {
        multiple:false,
        data: checkboxOps,
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
                let faultDescribe = '';
                const { data } = this.state;
                data.map((item,index)=>{
                    if(item.selected === 1){
                        faultDescribe +=item.value;
                        faultDescribe +='、';
                        return null;
                    };
                    return null;
                });
               faultDescribe = faultDescribe.substring(0,faultDescribe.length-1);
               console.log(faultDescribe,'原因')
                const baseData = this.props.location.state;
                let values = this.props.form.getFieldsValue();
                baseData.faultWords = values.faultWords;
                values.rrpairOrder = baseData.rrpairOrder;
                baseData.faultDescribe = values.faultDescribe = faultDescribe ? faultDescribe: baseData.faultDescribe;
                values.repairContentType = baseData.repairContentType;
                values.repairContentTyp = baseData.repairContentTyp;
                values.faultAccessory = this.state.submitFiles;
                console.log(values,'values');
                 fetchData({
                    url:Equipment.updateRrpairType,
                    body:querystring.stringify(values),
                    error: err=>{
                        console.log(err);
                    },
                    success: data=>{
                        if(data.status){
                            Toast.success('操作成功！',2,()=>{
                                hashHistory.push({pathname:'/equipment/equipmentDetail',state:baseData})
                            })
                        }
                    }
                }) 
            }else{
                Toast.fail('Validation failed');
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
            编辑故障描述
            </NavBar>
            <div className={'detail-content'}>
                <List>
                    <Accordion accordion openAnimation={{}} className="my-accordion">
                            <Accordion.Panel header={'故障现象'}>
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
