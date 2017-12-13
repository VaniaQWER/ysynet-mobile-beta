import React, { Component } from 'react';
import { List, TextareaItem } from 'antd-mobile';
class SupplierWrapper extends Component {
  componentDidMount() {
    // const { data } = this.props;
    //this.props.form.setFieldsValue(data);
  }
  render () {
    const { getFieldProps } = this.props.form;
    const { data } = this.props;
    return (
      <List>
        <TextareaItem
          {...getFieldProps('supplierName', {
            initialValue: data.supplierName
          })}
          title="供应商"
          editable={false}
        />
        <TextareaItem
          {...getFieldProps('orgCode', {
            initialValue: data.orgCode
          })}
          title="机构代码"
          editable={false}
        />
        <TextareaItem
          {...getFieldProps('alias', {
            initialValue: data.alias
          })}
          title="简称"
          editable={false}
        />
        <TextareaItem
          {...getFieldProps('status', {
            initialValue: data.status
          })}
          title="状态"
          editable={false}
        />
        <TextareaItem
          {...getFieldProps('address', {
            initialValue: data.address
          })}
          title="省市区"
          editable={false}
        />
        <TextareaItem
          {...getFieldProps('topLevel', {
            initialValue: data.topLevel
          })}
          title="上级单位"
          editable={false}
        />
        <TextareaItem
          {...getFieldProps('corporation', {
            initialValue: data.corporation
          })}
          title="法人代表"
          editable={false}
        />
        <TextareaItem
          {...getFieldProps('companyType' , {
            initialValue: data.companyType
          })}
          title="企业类型"
          editable={false}
        />
        <TextareaItem
          {...getFieldProps('registeredCapital', {
            initialValue: data.registeredCapital
          })}
          title="注册资本"
          editable={false}
        />
        <TextareaItem
          {...getFieldProps('contacts', {
            initialValue: data.contacts
          })}
          title="联系人"
          editable={false}
        />
        <TextareaItem
          {...getFieldProps('phone', {
            initialValue: data.phone
          })}
          title="联系电话"
          editable={false}
        />
        <TextareaItem
          title="营业执照"
          editable={false}
          onClick={() => alert(12345)}
        />
      </List> 
    )
  }
}

export default SupplierWrapper;