import React from 'react';
import { Card,List } from 'antd-mobile';
import PropTypes from 'prop-types';

const Item = List.Item;
const clickFunc = (item,onClick,e)=>{
    e.preventDefault();
    return onClick(item)
}
function showFixStatus(value){
    switch(value){
        case '10':
            return <span style={{color:'#ffbf00'}}>{'待接修'}</span>;
        case '30':
            return <span style={{color:'#28C7A0'}}>{'维修中'}</span>;
        case '50':
            return <span style={{color:'#000'}}>{'待验收'}</span>;
        case '80':
            return <span style={{color:'#f00'}}>{'已关闭'}</span>;
        default:
            break;
    }
}

const CardBody = ({ item, onClick}) => (
    <div onClick={clickFunc.bind(this, item, onClick)}>
        <Card full>
            <div className={'ysynet_card_header'}>
                <Item extra={showFixStatus(item.orderFstate)}>
                    <div>
                        <span className={'workNo'}>{item.rrpairOrder}</span>
                        {
                            item.rrpairType &&
                            <span className={'fixStatus'}>{item.rrpairType==='01'?'外修':'内修'}</span>
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
                        <p className={'address'}>
                            <span>{item.useDept?item.useDept:'--'}</span>
                            <span> | </span>
                            <span>{item.address?item.address:'--'}</span>
                        </p>
                        <p className={'property'}>
                            <span>申报人: </span>
                            <span>{item.rrpairUserName}</span>
                        </p>
                        <p className={'updateTime'}>
                            <span>更新时间: </span>
                            <span>{item.modifyTime}</span>
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