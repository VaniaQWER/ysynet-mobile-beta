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
      path: '/equipment',//产品
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../container/equipment').default)
        }, 'equipment')
      }
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