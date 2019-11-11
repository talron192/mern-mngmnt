const mongoose = require('mongoose');
const Shema = mongoose.Schema;

let LoginDetails= new Shema({
    _id:{
        type:Number
    } ,
    password:{
        type:String
    } 

},{collection: 'loginDetails'});

module.exports= mongoose.model('loginDetails',LoginDetails);