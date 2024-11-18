import jwt from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
import config from "../config"; // Import the configuration

const verifyToken = (token, secret) => {
  if (!token || token === undefined) {
    throw new Error("Token not provided");
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Error verifying token:", error);
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    } else {
      throw new Error("Token verification failed");
    }
  }
};

const hashPassword = async (password) => {
  return await hash(password, 12);
};

const verifyPassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};

const verifyAccessToken = (token) => {
  return verifyToken(token, config.accessTokenSecretKey);
};

const generateAccessToken = (data) => {
  const token = jwt.sign(data, config.accessTokenSecretKey, {
    expiresIn: "60s",
  });
  return token;
};

const generateRefreshToken = (data) => {
  const token = jwt.sign(data, config.refreshTokenSecretKey, {
    expiresIn: "15d",
  });
  return token;
};

const validateEmail = (email) => {
  const pattern = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
  return pattern.test(email);
};

const validatePhone = (phone) => {
  const phonePattern =
    /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?[\d-.\s]{5,15}$/;
  return phonePattern.test(phone);
};

const validatePassword = (password) => {
  const minLength = 5;

  let errors = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long.`);
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors: errors,
    };
  } else {
    return {
      valid: true,
      errors: [],
    };
  }
};

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePhone,
  validatePassword,
  verifyToken,
};
