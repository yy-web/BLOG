import * as loginState from '../constant/actionsType'

export const loginStates = (type,user) =>{
    switch (type) {
      case 'isLogin':
          return{
            type:loginState.ISLOGIN,
            user
          };
      case 'isLogout':
            return{
              type:loginState.ISLOGOUT,
              user:''
            }
    }
}
