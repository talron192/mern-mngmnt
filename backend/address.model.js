const mongoose = require('mongoose');
const Shema = mongoose.Schema;

let Address= new Shema({
    houseAddress:{
        type:String
    } ,
    city:{
        type:String
    } ,
    postalCode:{
        type:String
    },
    poBox:{
        type:String
    } 
});

module.exports= mongoose.model('address',Address);