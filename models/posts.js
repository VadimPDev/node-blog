const {Schema,model} = require('mongoose')

const postsSchema = new Schema({
    title:{
        type:String,
        requierd:true
    },
    short:{
        type:String,
        requierd:true
    },
    full:{
        type:String,
        requierd:true
    },
    author:{
        type:String,
        requierd:true
    },
    img:{
        type:String,
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

module.exports = model('Posts',postsSchema)