import React from 'react';
import { Card } from 'antd-mobile';
import PropTypes from 'prop-types';

const clickFunc = (item,onClick,e)=>{
    e.preventDefault();
    return onClick(item.id)
}

const CardBody = ({ item, onClick}) => (
    <div onClick={clickFunc.bind(this, item, onClick)}>
        <Card full>
            <div className={'ysynet_card_header'}>
                <div className={'header_con'}>
                    <div className={'workNo'}>
                        <span>{item.WONo}</span>
                        {
                            item.fixedType &&
                            <span className={'fixStatus'}>{item.fixedType}</span>
                        }
                    </div>
                    <div className={'status'}>
                        {
                            item.WOStatus.TF_CLO_CODE==='00'?<span style={{color:'#ffbf00'}}>{item.WOStatus.TF_CLO_NAME}</span>
                            :
                            <span style={{color:'#3dbd7d'}}>{item.WOStatus.TF_CLO_NAME}</span>
                        }
                    </div>
                </div>
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