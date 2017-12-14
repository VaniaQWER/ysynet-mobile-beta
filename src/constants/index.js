// 头部工具栏
export const HEADER_TOOLS = [
  { icon: require('../assets/scan.svg'), text: '扫一扫' },
  { icon: require('../assets/myorder.svg'), text: '我的订单' },
  { icon: require('../assets/shoppingcar.svg'), text: '购物车' },
  { icon: require('../assets/setting.svg'), text: '设置' }
]

// 公司产品介绍
export const MAIN_TOOLS = [
  { icon: require('../assets/invoice.svg'), text: '发票', link: '/invoice' },
  { icon: require('../assets/auditing.svg'), text: '订单审核' },
  { icon: require('../assets/equipment.svg'), text: '设备', link: '/equipment' },
  { icon: require('../assets/balance.svg'), text: '余额' },
  { icon: require('../assets/more.svg'), text: '更多' }
]

export const FOOTER_TOOLS = [
  { 
    bg: require('../assets/home.svg'), 
    activeBg: require('../assets/home_active.svg'),
    text: '主页',
    selectedTab: 'home',
    link: '/'
  }, { 
    bg: require('../assets/order.svg'), 
    activeBg: require('../assets/order_active.svg'),
    text: '我的订单',
    selectedTab: 'order',
    link: '/order'
  },  { 
    bg: require('../assets/delivery.svg'), 
    activeBg: require('../assets/delivery_active.svg'),
    text: '送货单',
    selectedTab: 'delivery',
    link: '/delivery'
  },  { 
    bg: require('../assets/user.svg'), 
    activeBg: require('../assets/user_active.svg'),
    text: '我的',
    selectedTab: 'profile',
    link: '/profile'
  },
]

// 公告推送
export const Notice = [
  { 
    img: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png', 
    abstract: '免于进行临床试验的体外诊断试剂临床评价资料基本要求（试行）'
  },
  { 
    img: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png', 
    abstract: '特朗普提名礼来前总裁为新任卫生部长'
  },
  { 
    img: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png', 
    abstract: '国家卫计委：大型医疗设备“引导配置国产”，这类设备或将爆发！'
  },
  { 
    img: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png', 
    abstract: '国产药械巨头和大三甲联手！冲破进口围剿！'
  },
];

// 我的订单Mock数据
export const OrderList = [
  {id: 1, supplierId: 1, productname: '一次性切口牵开固定器(套)', price: 203500.00, address: '外科楼四楼', total: 6, logo: '',
   datetime: '2017-11-16 11:58:26', status: '已完成', more: true, supplyname: '致新康乐医疗供应链(武汉)管理有限公司'},
  {id: 2, supplierId: 2, productname: '起搏电极导线', price: 22740.00, address: '内科一号楼15楼', total: 2, logo: '',
  datetime: '2017-11-16 10:51:26', status: '已完成', more: true, supplyname: '武汉裕百恒商贸有限公司'},
  {id: 3, supplierId: 3, productname: '无菌手术刀片', price: 840.00, address: '协和医院综合楼2号楼3楼医学工程科库房', total: 1, logo: '',
  datetime: '2017-11-15 17:43:21', status: '已完成', more: true, supplyname: '武汉骏龙医疗器械有限公司'},
  {id: 4, supplierId: 4, productname: '植入式心脏起搏器', price: 170640.00, address: '二级库房结算', total: 2, logo: '',
  datetime: '2017-11-15 17:43:04', status: '已完成', more: true, supplyname: '武汉裕百恒商贸有限公司'},
  {id: 5, supplierId: 5, productname: '起搏电极导线(商品名：IsoFlex)', price: 1005936.00, address: '二级库房结算', total: 12, logo: '',
  datetime: '2017-11-15 17:43:03', status: '已完成', more: true, supplyname: '九州通医疗器械集团有限公司'},
  {id: 6, supplierId: 6, productname: '药物洗脱冠脉支架系统(商品名：Xience Prime)', price: 386400.00, address: '二级库房结算', total: 10, logo: '',
  datetime: '2017-11-15 17:43:03', status: '待确认', more: true, supplyname: '嘉事嘉成医疗器械武汉有限公司'},
  {id: 7, supplierId: 7, productname: '墨盒-EPSON', price: 1470.00, address: '协和医院综合楼2号楼3楼医学工程科库房', total: 2, logo: '',
  datetime: '2017-11-15 08:46:48', status: '待确认', more: true, supplyname: '武汉百英商贸有限公司'},
  {id: 8, supplierId: 8, productname: '一次性使用离心带式血液成分分离器(商品名：COBE Spectra)', price: 19800.00, address: '协和医院综合楼2号楼3楼医学工程科库房', total: 1, logo: '',
  datetime: '2017-11-15 08:46:47', status: '已完成', more: true, supplyname: '泰尔茂比司特医疗产品贸易(上海)有限公司'},
  {id: 9, supplierId: 9, productname: '止血海绵', price: 3300.00, address: '外科大楼3楼手术室', total: 1, logo: '',
  datetime: '2017-11-14 08:35:33', status: '已完成', more: true, supplyname: '湖北天地人医药有限公司'},
  {id: 10, supplierId: 10, productname: '一次性使用体外引流袋', price: 880.00, address: '协和医院综合楼2号楼3楼医学工程科库房', total: 1, logo: '',
  datetime: '2017-11-13 18:06:42', status: '已完成', more: true, supplyname: '武汉亿衡商贸有限公司'},
  {id: 11, supplierId: 11, productname: '预冲式冲管注射器', price:  9541.80, address: '外科楼17楼', total: 1, logo: '',
  datetime: '2017-11-13 16:53:01', status: '已完成', more: true, supplyname: '山东威高集团医用高分子制品股份有限公司武汉分公司'},
]

// 查询条件
export const SearchCondition = [{
  id: 1,
  title: '时间',
  key: 'datetime',
  conditions: [
    {text: '当天', type: 1},
    {text: '十天', type: 2},
    {text: '一月', type: 3},
    {text: '一月之外', type: 4}
  ]
}, {
  id: 2,
  title: '状态',
  key: 'status',
  conditions: [
    {text: '待确认', type: 1},
    {text: '备货中', type: 2},
    {text: '交易完成', type: 3},
    {text: '全部', type: 4}
  ]
}, {
  id: 3,
  title: '订单类型',
  key: 'type',
  conditions: [
    {text: '普耗', type: 1},
    {text: '结算', type: 2},
    {text: '备货', type: 3},
    {text: '手术', type: 4},
    {text: '全部', type: 5}
  ]
}, {
  id: 4,
  title: '库房',
  conditions: [
    {text: '采购中心库房', type: 1, selected: true},
    {text: '器材库', type: 2},
    {text: '西区器材库', type: 3}
  ]
}]

// 订单详情Mock数据
export const Details = {
  orderId: 1,
  orderNo: 'GK12345678',
  type: 2, // 1 普耗   2手术
  orderMan: '萌萌的拖鞋酱',
  recevier: '冯斯特洛夫斯基',
  phoneNo: 13888888888,
  address: '医技楼一楼',
  orderTime: '2017-11-21 14:44:17',
  expectTime: '2017-11-28 14:44:17',
  status: '完成',
  supplierId: 1,
  supplierName: '国药控股湖北有限公司',
  totalPrice: 37535.60,
  details: [
    { id: 1, name: '药物洗脱冠脉支架系统', spec: '4.0mm*15mm', model: 'ERES40015X', price: 14848.8, amount: 1, send: 1, no_send: 0, package: '袋'},
    { id: 2, name: '快速交换球囊扩张导管', spec: '2.0mm*20mm', model: 'SPL20020X', price: 3977, amount: 1, send: 1, no_send: 0, package: '1根/袋' },
    { id: 3, name: '药物洗脱冠脉支架系统', spec: '2.25mm*24mm', model: 'ERES22524X', price: 14848.8, amount: 1, send: 1, no_send: 0, package: '袋' },
    { id: 4, name: '快速交换球囊扩张导管', spec: '4.5mm*15mm', model: 'NCSP4515X', price: 3861, amount: 1, send: 1, no_send: 0, package: '袋' },
  ],
  patient: {
    visitNo: 'JZ880088',
    patientName: '海沃德',
    gender: '男',
    operName: '小腿骨折修复手术',
    operTime: '2017-10-19',
    brand: 'BUMA',
    remark: '2017年10月18日，在NBA揭幕战上（客场对阵骑士队），登场5分钟、得到2分1板的海沃德因伤退赛，之后确诊为脚踝脱臼+胫骨骨折。'
  },
  packageId: 100,
  package: {
    implant: 100,
    sterilization: 10,
    tool: 15,
    total: 3
  }
}

// 手术包详情Mock数据
export const Operbag = [
  {text: '钢板', total: 12},
  {text: '针', total: 10},
  {text: '螺钉', total: 12},
  {text: '棒子', total: 3},
  {text: '接头', total: 31},
  {text: '螺帽', total: 12},
  {text: '杆子', total: 12},
  {text: '钛网', total: 3},
  {text: '其他', total: 4},
  {text: '克氏针', total: 5},
  {text: '钛缆', total: 12},
  {text: '融合器', total: 12},
  {text: '肋骨板', total: 3},
  {text: '假体', total: 12},
  {text: '灭菌', total: 3},
  {text: '工具', total: 3},
  {text: '其他', total: 12, children: [
    {text: '电钻', total: 12},
    {text: '摆锯', total: 10},
    {text: '横联', total: 12},
    {text: '骨凿', total: 3},
    {text: '骨锤', total: 31},
    {text: '骨锉', total: 12},
    {text: '关节旋入器', total: 12},
    {text: '测深器', total: 3}
  ]}
]

// 发票详情
export const Invoice = [
  { id: 1, supplierName: '武汉德加医疗科技有限责任公司', invoiceNo: '05085547', invoiceCode: 4200163350, amount: '112500.0000', billDate: '2017-12-08', status: '待验收'},
  { id: 2, supplierName: '武汉侑佳商贸有限公司', invoiceNo: '55483969', invoiceCode: 4200164320, amount: '55500.0000', billDate: '2017-12-08', status: '验收通过'},
  { id: 3, supplierName: '武汉凯信医疗设备有限公司', invoiceNo: '58028034', invoiceCode: 4200164320, amount: '6140.0000', billDate: '2017-12-08', status: '验收不通过'},
  { id: 4, supplierName: '湖北妮康医疗器械有限公司', invoiceNo: '51024619', invoiceCode: 4200164320, amount: '12996.0000', billDate: '2017-12-08', status: '验收通过'},
  { id: 5, supplierName: '苏州新区明基高分子医疗器械有限公司', invoiceNo: '07116775', invoiceCode: 3200164350, amount: '36490.0000', billDate: '2017-12-08', status: '待验收'},
];

export const Status = {
  '验收通过': 'success',
  '验收不通过': 'error',
  '待验收': 'waiting',
  '已完成': 'success',
  '待确认': 'waiting'
}

// 供应商详情
export const Supplier = {
  supplierName: '石嘴山优供应商公司',
  orgCode: '200001',
  alias: '石嘴山',
  status: '正常',
  address: '河北',
  topLevel: '',
  corporation: '张全蛋',
  companyType: '',
  registeredCapital: '300000.00',
  contacts: '李小花',
  phone: '186012345678',
  card1: '',
  card2: '',
  card3: '',
  card4: ''
}
//设备
export const EquipmentData = {
  archivesTotal: '13',
  contractTotal: '2',
  Repair: {
    Status:[
      {TF_CLO_CODE:"00",TF_CLO_NAME:"待维修",text:'83',icon: require('../assets/repair00.svg') },
      {TF_CLO_CODE:"01",TF_CLO_NAME:"维修中",text:'1',icon: require('../assets/repair01.svg') },
      {TF_CLO_CODE:"02",TF_CLO_NAME:"待验收",text:'0',icon: require('../assets/repair02.svg') },
      {TF_CLO_CODE:"03",TF_CLO_NAME:"已关闭",text:'2',icon: require('../assets/repair03.svg') }
    ]
  },
  AccusationMgt: {
    Status:[
      {TF_CLO_CODE:"00",TF_CLO_NAME:"待完成",text:'1',icon: require('../assets/repair00.svg') },
      {TF_CLO_CODE:"01",TF_CLO_NAME:"已完成",text:'1',icon: require('../assets/repair01.svg') },
    ]
  }
}
// 工单列表信息
export const WorkOrder = [
  {
    id:1,
    WONo:'20171106',
    fixedType:'外修',
    WOStatus:{TF_CLO_CODE:'00',TF_CLO_NAME:'待接修'},
    useStatus:[{TF_CLO_CODE:'00',TF_CLO_NAME:'在保'},{TF_CLO_CODE:'01',TF_CLO_NAME:'出保'}],
    equipmentName:'医用全自动电子血压计',
    tfBrand:'德国西门子',
    spec:'12...',
    deptName:'信息科',
    buildingName:'马会楼',
    floorName:'-1楼',
    WOProperty:'故障维修',
    updateTime:'2017-10-16 11:15'
  },
  {
    id:2,
    WONo:'20171110',
    fixedType:'',
    useStatus:[{TF_CLO_CODE:'02',TF_CLO_NAME:'停机'}],
    WOStatus:{TF_CLO_CODE:'01',TF_CLO_NAME:'已接修'},
    equipmentName:'打印机',
    tfBrand:'',
    spec:'',
    deptName:'信息科',
    buildingName:'新版测试楼',
    floorName:'2楼',
    WOProperty:'暂无',
    updateTime:'2017-10-19 12:09'
  }
]


