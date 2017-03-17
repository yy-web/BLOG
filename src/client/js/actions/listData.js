import * as list from '../constant/actionsType'

const listData = (type,data) =>{
    switch (type) {
      case 'showData':
          return{
            type:list.LISTDATA,
            data 
          };
    }
}
export default listData
