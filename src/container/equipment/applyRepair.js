import React, { Component } from 'react';
import { NavBar, Icon,Card,List, Switch, Button,ImagePicker,TextareaItem,Toast} from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import { fetchData } from '../../utils';
import querystring from 'querystring';
import { Equipment } from '../../api';

/**
 * @summary 资产档案列表 --详情1-报修申请
 */
const Item = List.Item;

class ApplyRepair extends Component {
    constructor(props) {
      super(props);
      const { state } = this.props.location;
      this.state = {
        files: [],
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
          let values = this.props.form.getFieldsValue();
          values.useFstate = this.state.useFstate ? "01" : "00";
          values.spare = this.state.spare? "01" : "00";
          values.assetsRecord = this.props.location.state.assetsRecord;
          values.equipmentCode = this.props.location.state.equipmentCode;
          values.equipmentName = this.props.location.state.equipmentName;
          values.address = this.props.location.state.address;
          values.useDeptCode = this.props.location.state.useDeptCode;
          values.repairContentTyp = this.state.repairContentTyp;
          values.urgentFlag = this.state.urgentFlag;
          values.faultAccessory = this.state.files.length === 1 ? this.state.files[0].url : null;
          console.log(values,"提交的数据");
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
                      hashHistory.push({pathname: '/equipment/firstDetails',state:this.props.location.state})
                  })
                }else{
                  Toast.fail('操作成功',data.msg)
                }
              }
            })  
        } 
      });
    }
    
    handUrgencyValue = (value) =>{
      if(this.state.urgentFlag=== 30){
        return "一般"
      }else if(this.state.urgentFlag=== 20){
        return "急"
      }else if(this.state.urgentFlag=== 10 ){
        return "紧急"
      }
    }

    onChange = (files, type, index) => {
      console.log(files, type, index);
      this.setState({ files });
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
                onLeftClick={() => hashHistory.push({pathname: '/equipment/firstDetails',state:this.props.location.state})}
                >报修申请
                </NavBar>
                <div className={'ysynet-content'}>
                  <Card 
                    full
                    onClick={() => hashHistory.push({pathname: `/equipment/firstDetails`})}
                  >
                    <Card.Body>
                      <p className="cardBodyList">编号: {rowData.equipmentCode}</p>
                      <p className="cardBodyList">科室: {rowData.address}</p>
                    </Card.Body>
                  </Card>
                  <form>
                    <List renderHeader={() => '请填写反馈信息'}>
                      <Item
                        extra={<Switch color="#2395ff" onClick={(checked)=>{ this.setState({useFstate : checked})}} checked={this.state.useFstate}/>}
                      >状态</Item>
                      <Item
                      extra={<Switch color="#2395ff" onClick={(checked)=>{this.setState({spare : checked})}} checked={this.state.spare} />}
                      >是否有备用</Item>
                      <Item 
                        arrow="horizontal" multipleLine 
                        onClick={() => hashHistory.push({pathname: '/equipment/urgency',state:{...this.props.location.state,urgentFlag:this.state.urgentFlag,useFstate:this.state.useFstate,spare:this.state.spare}})}
                        extra={this.handUrgencyValue(this.state.urgentFlag)}
                      >紧急度</Item>
                      <Item arrow="horizontal" multipleLine 
                      onClick={() => hashHistory.push({pathname: '/equipment/failure',state:{...this.props.location.state,repairContentTyp:this.state.repairContentTyp,useFstate:this.state.useFstate,spare:this.state.spare}})}
                      extra={this.state.repairContentTyp}
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