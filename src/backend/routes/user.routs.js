import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  forgotPassword,
  resetPassword,
} from "../controllers/user.contorller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../vaidators/validate.js";

import {
  userForgotPasswordValidator,
  userLoginValidator,
  userChangeCurrentPasswordValidator,
  userRegisterValidator,
  userResetForgottenPasswordValidator,
} from "../vaidators/user.validate.js";

const router = Router();

// Endpoint to register a new user
// router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/register").post(userRegisterValidator(), registerUser);
// Endpoint to log in a user
router.route("/login").post(loginUser);
// router.route("/login").post(userLoginValidator(), loginUser);

// Endpoint to log out a user
router.route("/logout").post(verifyJWT, logoutUser);
// Endpoint to refresh access token
router.route("/refresh-token").post(refreshAccessToken);
// Endpoint to change user's current password
router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword
  );
// Endpoint to get current user details
router.route("/current-user").get(verifyJWT, getCurrentUser);
// Endpoint to update user's account details
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
// Endpoint to send reset password link to user's email
router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPassword);
router
  .route("/reset-password/:resetToken")
  .post(userResetForgottenPasswordValidator(), validate, resetPassword);

export default router;
