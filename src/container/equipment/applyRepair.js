import React, { Component } from 'react';
import { NavBar, Icon,Card,List, Switch, Radio, Button,ImagePicker,TextareaItem} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';

/**
 * @summary 资产档案列表 --详情1-报修申请
 */
const Item = List.Item;
const RadioItem = Radio.RadioItem;
class ApplyRepair extends Component {
    state = {
        files: [{
            url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
            id: '2121',
          }, {
            url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
            id: '2122',
          }],
        multiple: false,
        value: 0,
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
          files,
        });
    }
    radioOnChange =(value) =>{
        console.log('checkbox');
        this.setState({
          value,
        });
    }
    render(){
        const rowData = this.props.location.state;
        const { getFieldProps, getFieldError } = this.props.form;
        const data = [
            { value: 0, label: '一般' },
            { value: 1, label: '急' },
            { value: 2, label: '紧急' },
          ];
        const { files ,value} = this.state;
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
                            <Item extra= {data.map(i => (
                                    <RadioItem  key={i.value} checked={value === i.value} onChange={() => this.radioOnChange(i.value)}>{i.label}</RadioItem>  
                                    ))}>
          
                               紧急度    
                     
                            </Item>

                          
                            <Item
                            extra={<Switch color="#2395ff" {...getFieldProps('3', { initialValue: true, valuePropName: 'checked' })} />}
                            >故障现象</Item>
                            <Item>
                            <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 5}
                            multiple={this.state.multiple}
                            />
                            </Item>
                          
                         
                        </List>
                        <List renderHeader={() => '请填写备注'}>
                        <TextareaItem
                            {...getFieldProps('count', {
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