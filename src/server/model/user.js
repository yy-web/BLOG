import mongoose,{ Schema } from 'mongoose';

const UserSchema = new Schema({
    uId:{type:Number},
    userName:{type:String},
    password:{type:String},
})

module.exports = mongoose.model('User',UserSchema)
