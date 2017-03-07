import mongoose,{ Schema } from 'mongoose';

const PublishSchema = new Schema({
    uId:{type:String},
    title:{type:String},
    content:{type:String},
    classify:{type:String},
    date:{type:String},
    times:{type:String},
})

module.exports = mongoose.model('Publish',PublishSchema)
