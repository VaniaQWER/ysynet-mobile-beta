//import { userAction } from '../action';
import { updateUser } from '../action';
import { updateHeadImg } from '../action';
import { updateNumber } from '../action';
import { onLoad } from '../action';

//const { SET_USER } = userAction;
const { UPDATE_USER } = updateUser;
const { ON_LOAD } = onLoad;
const { UPDATE_HEADIMG} = updateHeadImg

const {UPDATE_NUMBER} = updateNumber

const user = {}

export default (state = user, action) => {
  switch(action.type) {
    // case SET_USER: {
    //   //TODO  保存用户信息
    //   return { ...action.result };
    // }
    case UPDATE_USER:{

      return {
        ...state,
        userName:action.text,
        
      }
    }
    case UPDATE_HEADIMG:{

      return {
        ...state,
        avatar:action.img,
        
      }
    }
    case UPDATE_NUMBER:{

      return {
        ...state,
        mobilePhone:action.number,
      }
    }
    
    case ON_LOAD:{
      return {
        ...action.data
      }
    }
    default: {
      return state;
    }
  }
}