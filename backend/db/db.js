import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import dotenv from "dotenv";
dotenv.config();

const connectdb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${DB_NAME}`,
    );
    console.log(
      `Mongo db connected || Host : ${connectionInstance.connection.host} `,
    );
  } catch (error) {
    console.log("error while connected", error);
    process.exit(1)
  }
};

export default connectdb;
