import * as commentAction from '../constant/actionsType'

const comment = (commentData) =>{
    return{
        type:commentAction.COMMENT,
        commentData
    }
}
export default comment;
