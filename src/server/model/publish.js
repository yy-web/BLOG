import mongoose,{ Schema } from 'mongoose';
import moment from 'moment'
const ObjectId = mongoose.Schema.Types.ObjectId;
const date = new Date().getTime();

const PublishSchema = new Schema({
    user:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId ,ref:'User'},
    title:{type:String},
    content:{type:String},
    classify:{type:String},
    img:{type:String},
    date:{type:String,default:moment(date).format('YYYY-MM-DD')},
    times:{type:Number,default:0},
})

module.exports = mongoose.model('Publish',PublishSchema)
