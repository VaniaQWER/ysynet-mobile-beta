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
                        }
                    </div>
                    <div className={'status'}>
                        {
                            :
                        }
                    </div>
                </div>
            </div>
            <Card.Body>
                <div className={'ysynet_card_content'}>
                        <div>
                                item.useStatus?item.useStatus.map((item,index)=>
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
