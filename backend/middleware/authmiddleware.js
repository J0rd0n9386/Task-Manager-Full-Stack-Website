import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";

const secretToken = process.env.ACCESS_TOKEN_SECRET;

const verifyJWT = asyncHandler(async (req, res, next) => {

  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Token is not present");
  }

  try {

    const decodedToken = jwt.verify(token, secretToken);

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;

    next();

  } catch (error) {

    throw new ApiError(401, "Invalid or Expired Token");
  }
});

export { verifyJWT };