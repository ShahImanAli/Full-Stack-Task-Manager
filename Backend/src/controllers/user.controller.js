import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

//access token hum user ko bhee daitay hain lakin refresh token hum db mai store karkay bhee rakhte hain
const generateAccessandRefreshToken = async (userId) => {
  try {
    //user ka document aagaya hai
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    //user obj model mai refresh token add kiya hai inside refreshToken
    //refresh ko db mai save kiya hai
    user.refreshToken = refreshToken;
    //jb save karatay hai tou mongoose ky doosary model kick in hojate hai like password etc
    //iss liya hum validateBeforeSave ko false kar detay hain
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error in generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - not empty
  //check if user already exists
  //check for images , avatar
  //upload them to cloudinary , avatar
  //create user object , create entry in db
  //remove password and refresh token from response
  //check for user creation
  //return response

  //firstly get user details from frontend
  //form sy yah kisi json sy data aaraha hai tou woh aapko req.body mein mil jayega
  //url sy aisay nhi laitay hai
  const { name, email, password, confirmPassword } = req.body;

  // console.log("email: ", email);

  //user validation

  if (
    [name, email, password, confirmPassword].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError("All fields are required", 400);
  }

  //check if passwords match
  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  //check if user already exists

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  //create user object -> create entry in db

  const user = await User.create({
    fullname: name,
    email,
    password,
  });

  //check for user creation

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  //in .select we add the fields that we want to select but in our case we want to exclude
  // some fields so we add - before field name

  //agar user mil gaya from user._id tou kuch nhi karna warna error throw karna

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  //return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));

  //we passed 200 , createdUser and user registered successfully to ApiResponse class
  //b/c ApiResponse class mai yeh 3 parameters hain constructor ke andar as statusCode, data, message
});

const loginUser = asyncHandler(async (req, res) => {
  //req body -> data
  //user name , email
  //find the user
  //password check
  //access token , refresh token
  //send cookies
  //return response

  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //send cookies

  //by default koi bhee modify kar sakta hai cookies ko
  //lakin httpOnly true and secure true karne sy srif server sy modifiable hoti hai
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },

        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined, //also use $unset : { refreshToken: 1}
      },
    },
    {
      new: true, //return mai jo response mile woh new updated value hoogee
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  //user apna refresh token bhejta hai woh access kiya hai hum ny in incomingRefreshToken variable mai
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or not used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessandRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },

          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
};

//you can also use .populate instead of aggregation pipeline in
//getWatchHistory and getUserChannelProfile
