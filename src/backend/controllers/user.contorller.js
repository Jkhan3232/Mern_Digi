import { asyncHandler } from "../utils/AsyncHandaler.js";
import { ApiError, handleErrorResponse } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { options } from "../utils/JWT_option.js";
import { generateAccessAndRefereshTokens } from "../utils/JWT.token.js";
import {
  sendEmail,
  forgotPasswordMailgenContent,
} from "../utils/SmtpValidation.js";
import { UserLoginType } from "../servers/constant.js";
import CryptoJS from "crypto-js";

// Endpoint to register a new user
const registerUser = asyncHandler(async (req, res) => {
  try {
    // Destructure fullName, email, username, and password from request body
    const { fullName, email, username, password, phone } = req.body;

    // Check if any of the fields are empty
    if (
      [fullName, email, username, password, phone].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    // Check if the user with the provided email or username already exists
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }

    // Create a new user with the provided details
    const user = await User.create({
      fullName,
      phone,
      email,
      password,
      username: username.toLowerCase(),
    });

    // Find the created user and remove sensitive information before sending the response
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    // Return a success response with the created user details
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Login endPoint
const loginUser = asyncHandler(async (req, res) => {
<<<<<<< HEAD
  try {
    const { email, username, password } = req.body;
  
    if (!username && !email) {
      throw new ApiError(400, "Username or email is required");
    }
  
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
  
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }
  
    if (user.loginType !== UserLoginType.EMAIL_PASSWORD) {
      // If user is registered with some other method, we will ask him/her to use the same method as registered.
      // This shows that if user is registered with methods other than email password, he/she will not be able to login with password. Which makes password field redundant for the SSO
      throw new ApiError(
        400,
        "You have previously registered using " +
          user.loginType?.toLowerCase() +
          ". Please use the " +
          user.loginType?.toLowerCase() +
          " login option to access your account."
      );
    }
  
    // Compare the incoming password with hashed password
    const isPasswordValid = await user.isPasswordCorrect(password);
  
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }
  
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
    );
  
    // get the user document ignoring the password and refreshToken field
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
=======
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  if (user.loginType !== UserLoginType.EMAIL_PASSWORD) {
    throw new ApiError(
      400,
      "You have previously registered using " +
        user.loginType?.toLowerCase() +
        ". Please use the " +
        user.loginType?.toLowerCase() +
        " login option to access your account."
    );
  }

  // Compare the incoming password with hashed password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  // get the user document ignoring the password and refreshToken field
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
>>>>>>> 6078971ecc8945df8f77bba823288e291170a78b
    );
  
    // TODO: Add more options to make cookie more secure and reliable
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options) // set the access token in the cookie
      .cookie("refreshToken", refreshToken, options) // set the refresh token in the cookie
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken }, // send access and refresh token in response if client decides to save them by themselves
          "User logged in successfully"
        )
      );
  } catch (error) {
    // res.send(error.message);
    handleErrorResponse(error, res);
  }
});

// Endpoint to log out a user
const logoutUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, { user: user.username }, "User logged Out"));
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Endpoint to refresh access token using refresh token
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request: Refresh token is missing");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token: User not found");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Endpoint to change user's current password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Endpoint to get current user details
const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, req.user, "Current user fetched successfully")
      );
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Endpoint to update user's account details
const updateAccountDetails = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;

    if (!fullName || !email || !phone) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { $set: { fullName, email, phone } },
      { new: true }
    ).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Account details updated successfully"));
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Endpoint to send reset password link to user's email
const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User does not exists", []);
    }

    const { unHashedToken, hashedToken, tokenExpiry } =
      user.generateTemporaryToken();

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = tokenExpiry;
    await user.save({ validateBeforeSave: false });

    await sendEmail({
      email: user?.email,
      subject: "Password reset request",
      mailgenContent: forgotPasswordMailgenContent(
        user.username,
        `${req.protocol}://${req.get(
          "host"
        )}/api/v1/users/reset-password/${unHashedToken}`
      ),
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          "Password reset mail has been sent on your mail id"
        )
      );
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Endpoint to set new password and reeset old password
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    let hashedToken = CryptoJS.SHA256(resetToken).toString(CryptoJS.enc.Hex);

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new ApiError(489, "Token is invalid or expired");
    }

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Export all endpoint
export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  resetPassword,
  forgotPassword,
};
