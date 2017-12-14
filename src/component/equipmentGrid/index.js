import React, { Component } from 'react';
import { Grid } from 'antd-mobile'

class EquipmentGrid extends Component {
  render () {
    const { columnNum, onClick, hasLine,renderItem,itemStyle } = this.props;
    return (
      <Grid
        data={this.props.data}
        columnNum={ columnNum || 4 }
        onClick={ onClick }
        hasLine={ hasLine }
        renderItem={ renderItem }
        itemStyle ={ itemStyle }
      />
    )
  }
}

export default EquipmentGrid;