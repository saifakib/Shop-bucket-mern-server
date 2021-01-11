/*
* Title:  Suggetion Model
* Description: Create Suggetion Model related file
* Author: Saif Akib
* Date: 2021-01-10
*/

const { Schema, model } = require('mongoose')

const suggetionSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    count : {
        type : Number,
        default : 0
    }
})

const Suggetion = model('Suggetion', suggetionSchema);
module.exports = Suggetion;

