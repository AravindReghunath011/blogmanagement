import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            'Please fill a valid email address', 
          ],
    },
    password:{
        type:String,
        required:true
    },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
},{
    timestamps:true
})

const User = mongoose.model('User', userSchema);
export default User;