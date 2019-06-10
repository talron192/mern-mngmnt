const mongoose = require('mongoose');
const Shema = mongoose.Schema;

let Customer= new Shema({
    fullName:{
        type:String
    } ,
    email:{
        type:String
    } ,
    gender:{
        type:String
    },
    _id:{
        type:Number
    } ,
    date:{
        type:String
    }, 
    issueDate:{
        type:String
    }, 
    houseNumber:{
        type:String
    }, 
    phoneNumber:{
        type:String
    }, 
    fax:{
        type:String
    },
    actionType:{
        type:String
    },
    matiralStatus:{
        type:String
    },
    sourceArrival:{
        type:String
    },
    address:{
        type:{},
        ref:'address'
        
    },
    pathFolder:{
        type:String
    } 

});

module.exports= mongoose.model('customer',Customer);