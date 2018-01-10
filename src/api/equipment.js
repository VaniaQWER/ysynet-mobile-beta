import {_local} from './local';
export default {
    selectAssetsList: `${_local}/assetsRecordController/selectAssetsList`,
    selectAssetsRecordCount: `${_local}/assetsRecordController/selectAssetsRecordCount`,
    selectRrpairList: `${_local}/rrpairOrderController/selectRrpairList`,
    insertRrpair: `${_local}/rrpairOrderController/insertRrpair`,
    getPermission: `${_local}/test/permission`,
    FTP:'http://hsms.com.cn/ftp',//图片预览
    selectRrpairFstateNum: `${_local}/rrpairOrderController/selectRrpairFstateNum`,
    selectRrpairEvaluate:`${_local}/rrpairOrderController/selectRrpairEvaluate`,//维修单详情——查询 备注/评价
    updateRrpairCount:`${_local}/rrpairOrderController/updateRrpairContent`,//维修单详情——添加备注/评价
    updateRrpairFstate:`${_local}/rrpairOrderController/updateRrpairFstate`,//维修单详情——修改状态
    updateRrpairInfo:`${_local}/rrpairOrderController/updateRrpairInfo`,//维修单详情——修改维修工单信息
    updateRrpairType:`${_local}/rrpairOrderController/updateRrpairType`,//维修单详情——修改维修工单故障现象
    updateRrpairQuoredPrice:`${_local}/rrpairOrderController/updateRrpairQuoredPrice`,//维修单详情——修改预估费用
  }