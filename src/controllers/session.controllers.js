import { request, response } from "express";

import { createToken } from "../utils/jwt.js";



const createSession =  async (req= request, res= response) => {
    try {
        
        res.status(201).json({status: "OK", msg: "User create"});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", msg: "Internal server Error"});
    }
};

const createGoogleSession =  async (req= request, res= response) => {
    try {
       
      return res.status(200).json({status: "OK", payload: req.user})

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", msg: "Internal server Error"});
    }
};

const loginSession = async (req= request, res= response) => {
    try {
      const token = createToken(req.user); // CREAMOS NUESTRO TOKEN
      res.cookie("token", token, { httpOnly: true });
      
      return res.status(200).json({status: "OK", payload: req.user})

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", msg: "Internal server Error"});
    }
};

const getCurrentSession =  async (req= request, res= response) => {

    res.status(200).json({status: "OK", user: req.user})
};

export default {
    createSession,
    createGoogleSession,
    loginSession,
    getCurrentSession
}