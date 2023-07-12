import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is Required!"],
        trim:true
    },
    slug:{
        type:String,
        required:[true,"Slug is Required!"],
        unique:true,
        trim:true
    },
    subTitle:{
        type:String,
        required:[true,"Sub Title is Required!"],
        trim:true
    },
    category:{
        type:String,
        required:[true,"Category is Required!"],
        trim:true
    },
    desc:{
        type:String,
        required:[true,"Description is Required!"],
        trim:true
    },
    metaDesc:{
        type:String,
        required:[true,"Meta Description is Required!"],
        trim:true
    },
    avatar:{
        type:String,
        required:[true,"Avatar is Required!"],
        trim:true
    },
    avatarAlt:{
        type:String,
        required:[true,"Avatar Alternate Text is Required!"],
        trim:true
    },
    authorID:{
        type:String,
        required:[true,"Author ID is Required!"],
        trim:true
    },
},{timestamps:true})

export default mongoose.models?.blog || mongoose.model("blog",blogSchema) 
