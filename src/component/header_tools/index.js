import React, { Component } from 'react';
import { HEADER_TOOLS } from '../../constants';
import { Grid } from 'antd-mobile'

class HeaderTools extends Component {
  render () {
    const { columnNum, onClick, hasLine } = this.props;
    return (
      <Grid
        data={HEADER_TOOLS}
        columnNum={ columnNum || 4 }
        onClick={ onClick }
        hasLine={ hasLine || false }
      />
    )
  }
}
export default HeaderTools;