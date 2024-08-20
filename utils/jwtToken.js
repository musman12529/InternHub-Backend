export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Ensures the cookie is accessible only by the web server
    secure: true,  // Sends the cookie over HTTPS in production
    sameSite: "None", // Allows cross-domain cookies
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
