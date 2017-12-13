/**
 * @file 获取用户信息
 */

export const SET_USER = 'SET_USER';

export const set_user = (user) => ({
  type: SET_USER,
  user
})

//模拟 后台交互获取菜单以及用户信息
export const setUserMapper = user => ( 
  dispatch => (
    dispatch(set_user(user))
  )
)  