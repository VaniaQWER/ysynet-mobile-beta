import {_local} from './local';
export default {
  loginCheck: `${_local}/login/userLogin`,
  logout: `${_local}/login/sessionTimeout`,
  sessionCheck: `${_local}/login/sessionIsExists`,
  unbind:`${_local}/user/unbindWechat`, //微信解绑
  updateUser:`${_local}/user/updateUser`, //修改用户信息
  modifyUserPwd:`${_local}/user/modifyUserPwd`, //修改密码

  GETUSERINFO: `${_local}/login/getUserInfo`,//获取用户信息
  //地址模块
  FINDADDRSBYUSER: `${_local}/storage/findAddrsByUser`,//查询库房列表
  UPDATEADDR: `${_local}/storage/updateAddr`,//编辑地址
  ADDSTORAGEADDR: `${_local}/storage/addAddrsByStorageGuid`,//库房新增地址
  DEPTADDADDR: `${_local}/departmentController/addAddrsByDeptGuid`,//科室新增地址
  FINDMYDEPT: `${_local}/departmentController/findDeptsByUser`,//当前用户所属科室
  FINDMYStORAGE: `${_local}/storage/findStorageByUser`,//当前用户所属库房
  DELETEADDR: `${_local}/storage/deleteAddr`,//删除地址
  // 消息模块
  GETMYMESSAGELIST: `${_local}/messageController/getMessageList`,//我的消息列表
  UPDATEMSGREADFSTATE: `${_local}/messageController/changeMessageReadfstate`,//消息已读未读状态更改
  
}