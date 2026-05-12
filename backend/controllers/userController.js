import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
dotenv.config();

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not Found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message || "Error creating tokens");
  }
};

//register user //login // logout// profile// update profile// delete profile

const registerUser = asyncHandler(async (req, res) => {
  console.log("SECRET:", process.env.ACCESS_TOKEN_SECRET);
  const { email, password, fullname, username } = req.body;

  if (!email || !password || !fullname) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already Exist");
  }
  const hashedPassword = await bcrypt.hash(password, 10);



 
  let createdUser = user.toObject();
  delete createdUser.password;

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(201, {
        success: true,
        message: "User registered successfully",
        user: createdUser,
        accessToken,
        refreshToken,
      }),
    );
});
//////////////////////////////////////////////////////////////////////////////////

const updateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath);

  if (!uploadedAvatar) {
    throw new ApiError(500, "Avatar upload failed");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: uploadedAvatar.secure_url || uploadedAvatar.url,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
      },
      "Avatar updated successfully"
    )
  );
});
//////////////////////////////////////////////////////////////////////////////////////////////////
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Please enter all fields");
  }
  let user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Cannot find user");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  user = user.toObject();
  delete user.password;

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user,
          accessToken,
          refreshToken,
        },
        "Login successful",
      ),
    );
});
//////////////////////////////////////////////////////////////////////////////////

const profile = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, {
      user: req.user,
    }),
  );
});

///////////////////////////////////////////////////////////////////////////////////

const Logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json(new ApiResponse(200, {}, "Logout successful"));
});

const verifyUser = asyncHandler(async(req,res)=>{
  return res.status(200).json({Auth:true , user: req.user});
})

export { registerUser, Login, Logout, profile,verifyUser,updateAvatar };
