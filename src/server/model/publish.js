import mongoose,{ Schema } from 'mongoose';
const PublishSchema = new Schema({
    user:{type:String},
    acticleId:{type:Number},
    title:{type:String},
    content:{type:String},
    classify:{type:String},
    date:{type:Date,default:Date.now()},
    times:{type:Number,default:0},
})

module.exports = mongoose.model('Publish',PublishSchema)
