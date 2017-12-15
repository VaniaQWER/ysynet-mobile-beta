import React from 'react';
import { Card,List } from 'antd-mobile';
import PropTypes from 'prop-types';

const Item = List.Item;
const clickFunc = (item,onClick,e)=>{
    e.preventDefault();
    return onClick(item)
}
function showFixStatus(value){
    switch(value.TF_CLO_CODE){
        case '00':
            return <span style={{color:'#ffbf00'}}>{value.TF_CLO_NAME}</span>;
            break;
        case '01':
            return <span style={{color:'#28C7A0'}}>{value.TF_CLO_NAME}</span>;
            break;
        case '02':
            return <span style={{color:'#000'}}>{value.TF_CLO_NAME}</span>;
            break;
        case '03':
            return <span style={{color:'#f00'}}>{value.TF_CLO_NAME}</span>
            break;
        default:
            break;
    }
}

const CardBody = ({ item, onClick}) => (
    <div onClick={clickFunc.bind(this, item, onClick)}>
        <Card full>
            <div className={'ysynet_card_header'}>
                <Item extra={showFixStatus(item.WOStatus)}>
                    <div>
                        <span className={'workNo'}>{item.WONo}</span>
                        {
                            item.fixedType &&
                            <span className={'fixStatus'}>{item.fixedType}</span>
                        }
                    </div>
                </Item>
            </div>
            <Card.Body>
                <div className={'ysynet_card_content'}>
                        <div>
                            <span className={'title'}>{item.equipmentName}</span>
                            {
                                item.useStatus?item.useStatus.map((item,index)=>
                                 <span className={item.TF_CLO_CODE==='00'?'tag maintain':(item.TF_CLO_CODE==='01'?'tag out_maintain':'tag not_maintain')} key={index}>{item.TF_CLO_NAME}</span>
                                )
                                :
                                null
                            }
                        </div>
                    <div className={'detail'}>
                        <p className={'brand'}>
                            <span>{item.tfBrand?item.tfBrand:'--'}</span>
                            <span className={'line'}>|</span>
                            <span>{item.spec?item.spec:'--'}</span>
                        </p>
                        <p className={'address'}>
                            <span>{item.deptName?item.deptName:'--'}</span>
                            <span className={'adrCenter'}>{item.buildingName}</span>
                            <span>{item.floorName}</span>
                        </p>
                        <p className={'property'}>
                            <span>工单性质：</span>
                            <span>{item.WOProperty}</span>
                        </p>
                        <p className={'updateTime'}>
                            <span>最近更新时间：</span>
                            <span>{item.updateTime}</span>
                        </p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    </div>
)
CardBody.propTypes = {
    item: PropTypes.object.isRequired
  }
  
export default CardBody;