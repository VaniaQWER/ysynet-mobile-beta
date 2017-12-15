import React, { Component } from 'react';
import { NavBar, Icon,Card,List, Switch, Button,ImagePicker,TextareaItem} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';

/**
 * @summary 资产档案列表 --详情1-报修申请
 */
const Item = List.Item;

class ApplyRepair extends Component {
    state = {
        files: [],
        multiple: false,
        urgency:this.props.location.state.urgency || 10,
        failure:this.props.location.state.failure || "部分功能失效", 
     
    }
    //提交数据
    onSubmit = () => {
        this.props.form.validateFields({ force: true }, (error) => {
          if (!error) {
            let values = this.props.form.getFieldsValue();
            values.urgency = this.state.urgency;
            values.failure = this.state.failure;
            values.imageUrl = this.state.files.length === 1 ? this.state.files[0].url : null;
            console.log(values,"提交的数据");
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
        const { getFieldProps, getFieldError } = this.props.form;
   
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
                            <p className="cardBodyList">编号: {rowData.number}</p>
                            <p className="cardBodyList">品牌: {rowData.tfBrandName}</p>
                            <p className="cardBodyList">科室: {rowData.address}</p>
                        </Card.Body>
                    </Card>
                    <form>
                        <List
                            renderHeader={() => '请填写反馈信息'}
                            renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
                        >
                            <Item
                            extra={<Switch color="#2395ff" {...getFieldProps('1', { initialValue: true, valuePropName: 'checked' })} />}
                            >状态</Item>
                            <Item
                            extra={<Switch color="#2395ff" {...getFieldProps('2', { initialValue: true, valuePropName: 'checked' })} />}
                            >是否有备用</Item>
                            <Item arrow="horizontal" multipleLine 
                            onClick={() => hashHistory.push({pathname: '/equipment/urgency',state:{...this.props.location.state,urgency:this.state.urgency}})}
                            >
                               紧急度 
                            </Item>

                          
                            <Item arrow="horizontal" multipleLine 
                            onClick={() => hashHistory.push({pathname: '/equipment/failure',state:{...this.props.location.state,failure:this.state.failure}})}
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
                            {...getFieldProps('tfmark', {
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