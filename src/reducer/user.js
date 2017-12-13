import { userAction } from '../action';
const { SET_USER } = userAction;

const user = {

}

export default (state = user, action) => {
  switch(action.type) {
    case SET_USER: {
      //TODO  保存用户信息
      return { ...action.result };
    }
    default: {
      return state;
    }
  }
}