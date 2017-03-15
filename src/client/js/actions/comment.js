import * as comment from '../constant/actionsType'

const comment = (type,commentData) =>{
    return{
        type:comment.COMMENT,
        commentData
    }
}
export default comment;
