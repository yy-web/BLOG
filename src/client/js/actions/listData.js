import * as list from '../constant/actionsType'

const listData = (data) =>{
        return{
          type:list.LISTDATA,
          data
        };
}
export default listData
