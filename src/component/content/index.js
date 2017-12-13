import React, { Component } from 'react';
import { MAIN_TOOLS } from '../../constants';
import { Grid } from 'antd-mobile'

class ContentTools extends Component {
  render () {
    const { columnNum, onClick, hasLine } = this.props;
    return (
      <Grid
        data={MAIN_TOOLS}
        columnNum={ columnNum || 4 }
        onClick={ onClick }
        hasLine={ hasLine }
      />
    )
  }
}

export default ContentTools;