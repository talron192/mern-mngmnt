const mongoose = require('mongoose');
const Shema = mongoose.Schema;

let LoginDetails= new Shema({
    userName:{
        type:String
    } ,
    password:{
        type:String
    } 

});

module.exports= mongoose.model('loginDetails',LoginDetails);