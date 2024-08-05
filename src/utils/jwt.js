import jwt from "jsonwebtoken";
import envs from "../config/env.config.js";

export const createToken = (user) => {
  const { _id, email, role, cart } = user;
  const token = jwt.sign({_id, email, role, cart}, envs.JWT_SECRET_CODE, {expiresIn: "2m"});
  
  return token;
}

export const verifyToken = (token) => {
  try {

    const decoded = jwt.verify(token, envs.JWT_SECRET_CODE); //DECODIFICAMOS
    return decoded;
    
  } catch (error) {
    return null;
  }
}