/*
* Title:  Bucket Model
* Description: Bucket Model related file
* Author: Saif Akib
* Date: 2021-01-10
*/

const { Schema, model } = require('mongoose')

const bucketSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        default: 0
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
},
    { timestamp: true }
);

const Bucket = model('Bucket', bucketSchema);
module.exports = Bucket;

