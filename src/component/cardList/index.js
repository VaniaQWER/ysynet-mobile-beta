import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardBody from './cardbody';
import CardBottom from './cardbottom';
import './style.css';

/**
 * @summary 卡片菜单组件
 */

class CardList extends Component {
  render () {
    const { data, onClick, subClick, style, footer } = this.props;
    return data.isArray ? 
      <div className={'mb-16'}>
        {
          data.map(item => (
            <a className='ysynet_listCard' key={item.id}>
              <CardBody item={item} onClick={onClick} subClick={subClick}/>
              {
                footer ? <CardBottom cardId={item.id}/> : null
              }
            </a>
          )) 
        } 
      </div>  : 
      <a className='ysynet_listCard' key={data.id} style={style}>
        <CardBody item={data} onClick={onClick} subClick={subClick}/>
        {
          footer ? <CardBottom cardId={data.id}/> : null
        }
      </a>
  }
}
CardList.proptypes = {
  data: PropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
  subClick: PropTypes.func
}
export default CardList;