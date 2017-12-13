import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { Supplier } from '../../constants';
import { createForm } from 'rc-form';
import SupplierWrapper from './supplierWrapper';
/**
 * @summary 供应商详情
 */

const SupplierFormWrapper = createForm()(SupplierWrapper);
class SupplierDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      supplier: Supplier
    }
  } 
  componentDidMount() {
    // 模拟ajax
    setTimeout(() => {
      this.setState({supplier: Supplier})
    }, 300);
  }
  render () {
    const { supplier } = this.state;
    return (
      <div>
        <NavBar
          className={'ysynet-header'}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >供应商详情
        </NavBar>
        <div className={'ysynet-content'}>
          <SupplierFormWrapper data={supplier}/>
        </div>
      </div>
    )
  }
}

export default SupplierDetail;