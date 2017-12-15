import React, { Component } from 'react';
import { NavBar, Icon, WhiteSpace, TextareaItem, ImagePicker ,ActionSheet,List, Menu } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import './style.css'
const Item = List.Item;

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  }, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
  }];
class Edit extends Component{
    state = {
        clicked:'none',
        files: data,
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
          files,
        });
      };
      onAddImageClick = (e) => {
        e.preventDefault();
        this.setState({
          files: this.state.files.concat({
            url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
            id: '3',
          }),
        });
      };
    showActionSheet = ()=>{
        const BUTTONS = ['部分功能失效', '开机后死机', '其他','性能指标偏离','不规则或偶发故障', '确认'];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          //cancelButtonIndex: BUTTONS.length - 1,
          title: '故障现象(可多选)',
          //message: '',
          maskClosable: true,
          'data-seed': 'logId',
        },
        (buttonIndex) => {
            console.log(buttonIndex,'index')
          this.setState({ clicked: BUTTONS[buttonIndex] });
        });
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
                    <Item arrow='horizontal' onClick={this.showActionSheet}>
                        故障现象
                    </Item>
                </List>
                <WhiteSpace size='md' />
                <List>
                    <TextareaItem
                        {...getFieldProps('note3')}
                        autoHeight
                        rows={3}
                        labelNumber={5}
                        />
                </List>
                <WhiteSpace size='md' />
                <List>
                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 5}
                    multiple={this.state.multiple}
                    />
                </List>
            </div>
        </div>)
    }
}
const BasicInputExampleWrapper = createForm()(Edit);
export default BasicInputExampleWrapper;
