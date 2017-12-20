import React, { Component } from 'react';
import { NavBar, Icon,Card,List, Switch, Button,ImagePicker,TextareaItem,Toast,Modal} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import { fetchData, compressImage } from '../../utils';
import querystring from 'querystring';
import { Equipment } from '../../api';
const ModalAlert = Modal.alert;
const operation = Modal.operation;

/**
 * @summary 资产档案列表 --详情1-报修申请
 */
const Item = List.Item;

class ApplyRepair extends Component {
    constructor(props) {
      super(props);
      const { state } = this.props.location;
      this.state = {
        files:   [],
        submitFiles:[],
        multiple: false,
        useFstate: state && state.useFstate ? state.useFstate === "00" || !state.useFstate ? false : true : true,
        spare: state &&  state.spare ? state.spare : true,
        urgentFlag: state && state.urgentFlag ? state.urgentFlag : 10,
        repairContentTyp: state && state.repairContentTyp ? state.repairContentTyp : "部分功能失效",  
        rowData: state ? state : {}
      }
    }
    componentDidMount() {
      const { query } = this.props.location;
      if (query.assetsRecord) {
        fetchData({
          url: `${Equipment.selectAssetsList}?assetsRecord=${query.assetsRecord}`,
          success: data => {
            if (data.status) {
              this.setState({rowData: data.result[0]})
            }
          }
        })
      }
    }

    //提交数据
    onSubmit = () => {
        this.props.form.validateFields({ force: true }, (error) => {
          if (!error) {
            const { rowData } = this.state;
            let values = this.props.form.getFieldsValue();
            values.useFstate = this.state.useFstate ? "01" : "00";
            values.spare = this.state.spare? "01" : "00";
            values.assetsRecord = rowData.assetsRecord;
            values.equipmentCode = rowData.equipmentCode;
            values.equipmentName = rowData.equipmentName;
            values.address = rowData.address;
            values.useDeptCode = rowData.useDeptCode;
            values.repairContentTyp = this.state.repairContentTyp;
            values.urgentFlag = this.state.urgentFlag;
            values.faultAccessory = this.state.submitFiles;
            console.log(values,"提交的数据");
            ModalAlert('报修', '是否确认报修？', [
              { text: '取消', style: 'default' },
              { text: '确定', onPress: () => {
                  //提交接口
                  fetchData({
                    url: Equipment.insertRrpair,
                    body: querystring.stringify(values),
                    error: err => {
                      console.log(err,'err')
                    },
                    success: data => {
                      if(data.status){
                        Toast.success('操作成功',2,()=>{
                            hashHistory.push({pathname: '/equipment/firstDetails',state: this.state.rowData})
                        })
                      }else{
                        Toast.fail(data.msg)
                      }
                    }
                  })
                 }
                
             }
           ]);
        }
      });
    }
    
    handUrgencyValue = (value) =>{
        switch(value){
            case 10:
                return <span style={{color:'#FA6268'}}>紧急</span>;
            case 20:
                return <span style={{color:'#F29736'}}>急</span>;
            case 30:
                return <span style={{color:'#20B78B'}}>一般</span>;
            default:
                break;
        }
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

    }

    selectUrgentFlag = () =>{
      operation([
        { text: '紧急', onPress: () => { this.setState({ urgentFlag:10 })} },
        { text: '急', onPress: () => { this.setState({ urgentFlag:20 })} },
        { text: '一般', onPress: () => { this.setState({ urgentFlag:30 })} },
      ])
    }
    selectFailure = () =>{
      operation([
        { text: '部分功能失效', onPress: () => { this.setState({ repairContentTyp:"部分功能失效"})} },
        { text: '开机后死机', onPress: () => { this.setState({ repairContentTyp:"开机后死机" })} },
        { text: '性能指标偏离', onPress: () => { this.setState({ repairContentTyp:"性能指标偏离"})} },
        { text: '不规则障碍', onPress: () => { this.setState({ repairContentTyp:"不规则障碍"})} },
        { text: '其他', onPress: () => { this.setState({ repairContentTyp:"其他"})} },
      ])
    }

    render(){
      const { getFieldProps } = this.props.form;
      const { files, rowData } = this.state;
      return this.props.children ||
        (
            <div>
                <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => hashHistory.push({pathname: '/equipment/firstDetails', state: this.state.rowData})}
                >报修申请
                </NavBar>
                <div className={'ysynet-content'}>
                  <Card 
                    full
                    onClick={() => hashHistory.push({pathname: `/equipment/firstDetails`})}
                  >
                    <Card.Body>
                      <p className="cardBodyList">编号: {rowData.equipmentCode}</p>
                      <p className="cardBodyList">地址: {rowData.address}</p>
                      <p className="cardBodyList">科室: {rowData.useDept}</p>
                    </Card.Body>
                  </Card>
                  <form>
                    <List renderHeader={() => '请填写反馈信息'}>
                      <Item
                        extra={<Switch color="#2395ff" onClick={(checked)=>{ this.setState({useFstate : checked})}} checked={this.state.useFstate}/>}
                      >使用状态</Item>
                      <Item
                      extra={<Switch color="#2395ff" onClick={(checked)=>{this.setState({spare : checked})}} checked={this.state.spare} />}
                      >是否有备用</Item>
                      <Item 
                        arrow="horizontal" 
                        multipleLine 
                        onClick={this.selectUrgentFlag}
                        extra={this.handUrgencyValue(this.state.urgentFlag)}
                      >紧急度</Item>
                      <Item arrow="horizontal" 
                      multipleLine 
                      onClick={this.selectFailure}
                      extra={this.state.repairContentTyp}
                      >
                        故障现象 
                      </Item>
                      <Item>
                      <ImagePicker
                      files={files}
                      onChange={this.onChange}
                      onImageClick={(index, fs) => console.log(index, fs)}
                      selectable={files.length < 4}
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