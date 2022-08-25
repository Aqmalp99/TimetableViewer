import mongoose from "mongoose";
import {compareSync, hashSync} from 'bcryptjs';

const StudentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        validate:{
            validate: username => username.doesNotExist({username}),
            message: "Username already exists"
        }
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
        
    }
})