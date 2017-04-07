import * as loginState from '../constant/actionsType'

export const loginStates = (type,user,icon) =>{
    switch (type) {
      case 'isLogin':
          return{
            type:loginState.ISLOGIN,
            user,
            icon
          };
      case 'isLogout':
            return{
              type:loginState.ISLOGOUT,
              user
            }
    }
}
