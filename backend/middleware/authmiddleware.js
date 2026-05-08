import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";

const secretToken = process.env.ACCESS_TOKEN_SECRET;

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Token is not present");
  }

  const decodedToken = jwt.verify(token, secretToken);
   console.log("Secret:", process.env.ACCESS_TOKEN_SECRET)

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  req.user = user;
  next();
});

export { verifyJWT };
