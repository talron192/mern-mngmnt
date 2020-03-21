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
    customer_id:{
        type:Number
    } ,
    _id:{
        type:Number
    } ,
    date:{
        type:String
    }, 
    age:{
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
    mortgageAdviceType:{
        type:String
    },
    matiralStatus:{
        type:String
    },
    sourceArrival:{
        type:String
    },
    status:{
        type:String
    },
    anotherContact:{
        type:{},
        ref:'anotherContact'
        
    },
    address:{
        type:{},
        ref:'address'
        
    },
    event:{
        type:[],
        ref:'event'
        
    },
    processStatus:{
        type:[],
        ref:'processStatus'
        
    },
    customerType:{
        type:String
    },
    pathFolder:{
        type:String
    } 

});

module.exports= mongoose.model('customer',Customer);