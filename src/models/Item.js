/*
* Title:  Item Model
* Description: Item Model related file
* Author: Saif Akib
* Date: 2021-01-10
*/

const { Schema, model } = require('mongoose')

const itemSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    cost : {
        type : Number,
        default : 0
    },
    quantity: String,
    isComplete: {
        type: Boolean,
        default: false
    }
});

const Item = model('Item', itemSchema);
module.exports = Item;

