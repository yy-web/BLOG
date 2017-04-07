import mongoose,{ Schema } from 'mongoose';
import moment from 'moment'
const ObjectId = mongoose.Schema.Types.ObjectId;
const date = new Date().getTime();

const CommentSchema = new Schema({
    user:{type:String},
    aId:{type:mongoose.Schema.Types.ObjectId ,ref:'Publish'},
    content:{type:String},
    icon:{type:String},
    date:{type:String,default:moment(date).format('YYYY-MM-DD')},
})

module.exports = mongoose.model('Comment',CommentSchema)
