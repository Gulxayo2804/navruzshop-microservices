const moongose= require('mongoose');

const userSchema = moongose.Schema({
    name:{
        type:String,
        require : true,
        trim:true
    },
    email:{
        type:String,
        require : true,
        trim:true,
        unique : true
    },
    password:{
        type:String,
        require : true
    }
},{
    timestamps:true
})

module.exports = moongose.model('User', userSchema);