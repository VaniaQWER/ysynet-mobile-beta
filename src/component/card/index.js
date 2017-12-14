import React, { Component } from 'react';
import CardBody from './cardBody';
import PropTypes from 'prop-types';
import './style.css'

/**
 * @summary 卡片组件
 */
class CardItem extends Component{
    render(){
        const { data, onClick } = this.props;
        return data instanceof Array ? 
            <div className={'mb-16'}>
                {
                    data.map(item => (
                        <a className='ysynet_card_item' key={item.id}>
                          <CardBody item={item} onClick={onClick}/>
                        </a>
                      )) 
                }
            </div>
            :
            <a className='ysynet_Card_item' key={data.id}>
                           <CardBody item={data} onClick={onClick}/>
                        </a>
    }
}
CardItem.proptypes = {
    data: PropTypes.isRequired,
    onClick: PropTypes.func.isRequired,
}
export default CardItem;