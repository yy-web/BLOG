import { firstPage } from '../common/firstPage'
import { pageSelect } from '../common/pageSelect'


export const firstPageAction = (user) =>{
    return firstPage(user)

}
export const pageSelectAction = (num) =>{
    return pageSelect(num)

}
