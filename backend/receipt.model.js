const mongoose = require('mongoose');
const Shema = mongoose.Schema;

let Receipt= new Shema({
    customer:{
        type:{},
        ref:'customer'
        
    },
    RecipetDate:{
        type:String
    },
    description:{
        type:String
    },
    discount:{
        type:String
    },
    paidType:{
        type:Number
    },
    priceBeforeVAT:{
        type:Number
    },
    hourTariff:{
        type:Number
    },
    priceAfterDiscount:{
        type:String
    }
});

module.exports= mongoose.model('receipt',Receipt);