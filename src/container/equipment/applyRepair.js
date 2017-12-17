import React, { Component } from 'react';
import { NavBar, Icon,Card,List, Switch, Button,ImagePicker,TextareaItem} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import { fetchData } from '../../utils';

/**
 * @summary 资产档案列表 --详情1-报修申请
 */
const Item = List.Item;

class ApplyRepair extends Component {
    state = {
        files: [],
        multiple: false,
        urgentFlag:this.props.location.state.urgentFlag || 10,
        repairContentTyp:this.props.location.state.repairContentTyp || "部分功能失效", 
     
    }
    //提交数据
    onSubmit = () => {
        this.props.form.validateFields({ force: true }, (error) => {
          if (!error) {
            let values = this.props.form.getFieldsValue();
            values.equipmentCode = this.props.location.state.equipmentCode || "不知道设备编号是什么";
            values.equipmentName = this.props.location.state.equipmentName || "不知道设备名称是什么";
            values.address = this.props.location.state.address||"不知道地址是什么";
            values.useDept = this.state.useDeptCode||"不知道科室是什么";
            values.repairContentTyp = this.state.repairContentTyp;
            values.faultAccessory = this.state.files.length === 1 ? this.state.files[0].url : null;
            console.log(values,"提交的数据");
            //提交接口
            fetchData({
                url: 'rrpairOrderController/insertRrpair',
                error: err => {
                  console.log(err,'err')
                },
                success: data => {
                  if(data.status){
                    alert("保修成功!")
                    hashHistory.push({pathname: '/equipment/firstDetails',state:this.props.location.state})
                  }
                }
              })  
          } else {
            alert('Validation failed');
          }
        });
      }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({ files });
    }

    render(){
        const rowData = this.props.location.state;
        const { getFieldProps } = this.props.form;
   
        const { files } = this.state;
        return this.props.children ||
        (
            <div>
                <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/firstDetails',state:this.props.location.state})}
                >报修申请
                </NavBar>
                <div className={'ysynet-content'}>
                    <Card full
                    onClick={() => hashHistory.push({pathname: `/equipment/firstDetails`})}
                    >
                        <Card.Body>
                            <p className="cardBodyList">编号: {rowData.equipmentCode}</p>
                            <p className="cardBodyList">科室: {rowData.address}</p>
                        </Card.Body>
                    </Card>
                    <form>
                        <List
                            renderHeader={() => '请填写反馈信息'}
                        >
                            <Item
                            extra={<Switch color="#2395ff" {...getFieldProps('useFstate', { initialValue: true, valuePropName: 'checked' })} />}
                            >状态</Item>
                            <Item
                            extra={<Switch color="#2395ff" {...getFieldProps('spare', { initialValue: true, valuePropName: 'checked' })} />}
                            >是否有备用</Item>
                            <Item arrow="horizontal" multipleLine 
                            onClick={() => hashHistory.push({pathname: '/equipment/urgency',state:{...this.props.location.state,urgentFlag:this.state.urgentFlag}})}
                            >
                               紧急度 
                            </Item>

                          
                            <Item arrow="horizontal" multipleLine 
                            onClick={() => hashHistory.push({pathname: '/equipment/failure',state:{...this.props.location.state,repairContentTyp:this.state.repairContentTyp}})}
                            >
                               故障现象 
                            </Item>
                            <Item>
                            <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 1}
                            multiple={this.state.multiple}
                            />
                            </Item>
                          
                         
                        </List>
                        <List renderHeader={() => '请填写备注'}>
                        <TextareaItem
                            {...getFieldProps('faultWords', {
                            initialValue: '补充说明...',
                            })}
                            rows={5}
                            count={100}
                        />
                        </List>
   
                         <Button type="primary" style={{marginTop:'16px'}}   onClick={this.onSubmit}>报修</Button>
                
                        </form>
                </div>
                
            </div>
        )
    }
}

const BasicApplyRepair = createForm()(ApplyRepair);
export default BasicApplyRepair;