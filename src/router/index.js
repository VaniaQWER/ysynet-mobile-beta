import { loginCheck } from '../utils';
import { hashHistory } from 'react-router';
export const routes =  {
  childRoutes: [
    {
      path: '/',//主页
      component: require('../container/home').default,
      onEnter: (nextState, replace, next) => {
        loginCheck().then(
          data => {
            if (data.status) {
              next();
            } else {
              hashHistory.push({pathname: '/login'})
            }
          },
          err => {
            console.log(err)
          }
        )
        next();
      }
    },
    {
      path: '/login',//登录页
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../container/login').default)
        }, 'login')
      }
    },
    {
      path: '/product',//产品
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../container/product').default)
        }, 'product')
      }
    },
    {
      path: '/equipment',//设备
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../container/equipment').default)
        }, 'equipment')
      },
      childRoutes: [
        {
          path: '/equipment/equipmentRepaire',//设备维修单
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/repair').default)
            }, '/equipment/equipmentRepaire')
          }
        },
        {
          path: '/equipment/equipmentDetail',//设备详情
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/repair/details').default)
            }, '/equipment/equipmentDetail')
          }
        },
        {
          path: '/equipment/troubleEdit',//设备详情
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/repair/edit').default)
            }, '/equipment/troubleEdit')
          }
        },
        //编辑 故障描述
        {
          path: '/equipment/editTroubdesc',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/repair/editTroubdesc').default)
            }, '/equipment/editTroubdesc')
          }
        },
        //编辑现象选择
        {
          path: '/equipment/troublSelect',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/repair/troubleSelect').default)
            }, '/equipment/troublSelect')
          }
        },
        //故障原因 选择
        {
          path: '/equipment/selectCause',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/repair/selectCause').default)
            }, '/equipment/selectCause')
          }
        },
        //添加备注
        {
          path: '/equipment/addRemark',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/repair/remark').default)
            }, '/equipment/addRemark')
          }
        },
        //预估费用
        {
          path: '/equipment/estimateFee',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/repair/EstimateFee').default)
            }, '/equipment/estimateFee')
          }
        },
        //编辑工单信息
        {
          path: '/equipment/editOrder',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/repair/editOrderInfo').default)
            }, '/equipment/editOrder')
          }
        },
        { 
          path: '/equipment/list',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/list').default)
            }, 'equipment/list')
          }
        },
        { 
          path: '/equipment/firstDetails',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/firstDetails').default)
            }, 'equipment/firstDetails')
          }
        },
        { 
          path: '/equipment/secondDetails',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/secondDetails').default)
            }, 'equipment/secondDetails')
          }
        },
        { 
          path: '/equipment/applyRepair',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/applyRepair').default)
            }, 'equipment/applyRepair')
          }
        },
        { 
          path: '/equipment/repairList',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/repairList').default)
            }, 'equipment/repairList')
          }
        },
        //紧急度
        { 
          path: '/equipment/urgency',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/urgency').default)
            }, 'equipment/urgency')
          }
        },
        //故障现象
        { 
          path: '/equipment/failure',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/failure').default)
            }, 'equipment/failure')
          }
        },
        { 
          path: '/equipment/applyMaintain',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/applyMaintain').default)
            }, 'equipment/applyMaintain')
          }
        },
        { 
          path: '/equipment/repairRecord',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/repairRecord').default)
            }, 'equipment/repairRecord')
          }
        },
        { 
          path: '/equipment/maintainRecord',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/maintainRecord').default)
            }, 'equipment/maintainRecord')
          }
        },
        { 
          path: '/equipment/do',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/equipment/do').default)
            }, 'equipment/do')
          }
        }
      ]

    },
    {
      path: '/profile',//用户
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../container/profile').default)
        }, 'profile')
      },
      onEnter: (nextState, replace, next) => {
        next();
      },
      childRoutes: [
        { 
          path: '/profile/user',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/profile/user').default)
            }, 'profile/user')
          }
        }
      ]  
    },
    {
      path: '/order',//订单
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../container/order').default)
        }, 'order')
      },
      childRoutes: [
        { 
          path: '/order/:id',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/order/detail').default)
            }, 'order/detail')
          }
        }, { 
          path: '/order/:id/:packageId',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/order/operdetail').default)
            }, 'order/operdetail')
          }
        }, { 
          path: '/order/:id/:packageId/:other',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/order/operother').default)
            }, 'order/operother')
          }
        }
      ]
    },
    {
      path: '/supplier',//订单
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../container/supplier').default)
        }, 'supplier')
      },
      childRoutes: [
        { 
          path: '/supplier/:id',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/supplier/detail').default)
            }, 'supplier/detail')
          },
        }
      ]
    },
    {
      path: '/delivery',//送货单
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../container/delivery').default)
        }, 'delivery')
      }
    },
    {
      path: '/invoice',//查询页面
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../container/invoice').default)
        }, 'invoice')
      },
      childRoutes: [
        { 
          path: '/invoice/:id',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('../container/invoice/detail').default)
            }, 'invoice/detail')
          },
        }
      ]
    }, 
    {
      path: '/search',//查询页面
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../container/search').default)
        }, 'search')
      }
    }
  ]
}