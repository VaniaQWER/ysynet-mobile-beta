import React from 'react';
import PropTypes from 'prop-types';
const clickFunc = (item, onClick, subClick, event) => {
  event.preventDefault();
  const className = event.target.className;
  switch (className) {
    case 'card-avatar':
      return subClick(item.supplierId);
    case 'content':
      return subClick(item.supplierId);
    case '':
      return onClick(item.key);
    default:
      return onClick(item.key);
  }
}

/**
 * @summary 卡片栏Body
 */
const CardBody = ({ item, onClick, subClick }) => (
  <div className={'card-body'} onClick={clickFunc.bind(this, item, onClick, subClick)}>
    <div className={'card-content'}>
      <div className={'card-head'}>
        <div className={'title'}>
          <p className={'name'}>
            <span className={'content'}> { item.title } </span>
          </p>
          <p className={'status'} style={{backgroundImage: `url(${require('../../assets/result_'+ item.watermark + '.svg')})`}}>
          </p>
        </div>
        <p className={'datetime'}>{ item.subTitle }</p>
      </div>
      <div className={'card-detail'}>
        <p className={'detail'}>
        { item.content }
        </p>
        <p className={'price'}>{ item.extra }</p>
      </div>
    </div>
  </div>  
)

CardBody.propTypes = {
  item: PropTypes.object.isRequired
}

export default CardBody;
// { item.watermark }