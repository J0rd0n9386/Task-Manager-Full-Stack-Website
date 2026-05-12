import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
   {
  username:{
    type: String,
    lowercase: true,
    unique:true,
    trim:true,
    index: true

  },
  email:{
    type: String,
    required: true,
    lowercase: true,
    unique:true,
    trim:true
  },
  fullname:{
    type:String,
    required:true,
    trim: true,
    index: true

  },
  password:{
    type:String,
    required: [true, "Password is required"],
     trim: true,
     minlength: [6, "Password must be at least 6 characters"]


  },
  avatar:{
    type: String,
    required:true,
  },
  refreshToken:{
    type:String
    
  }


    },{timestamps:true})

  


UserSchema.methods.isPasswordCorrect = async function (password) {
  
return await bcrypt.compare(password , this.password)

}

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    //jwt.sign() is used to create a JWT token jisme 3 cheeze hoti hai
    {
      _id: this._id, //payload
      username: this.username, 
      fullname: this.fullname, //payload
    },
    process.env.ACCESS_TOKEN_SECRET, //secret key
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, //expiry time

    }
  );
};

UserSchema.methods.generateRefreshToken = function () {
   return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
     expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
   );
}

export const User = mongoose.model("User", UserSchema);
