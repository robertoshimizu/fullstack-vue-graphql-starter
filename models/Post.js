// We are defining the schema of the Post database in MongoDB
// We are going to call it: PostSchema

const mongoose= require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    categories:{
        type:[String],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    likes:{
        type:Number,
        default:0
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    messages:[{
        messageBody:{
            type:String,
            required:true
        },
        messageDate:{
            type:Date,
            default:Date.now
        },
        messageUser:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        }
    }]
});

// Finally we will inject the Schema in the variable 'Post' that we will construct the context of the 
// ApolloServer in server.js

module.exports = mongoose.model('Post', PostSchema);