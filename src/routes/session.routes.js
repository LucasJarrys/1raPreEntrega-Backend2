import {Router} from "express";
import userDao from "../dao/mongoDB/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import { createToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passport.middleware.js";



const router = Router();

router.post("/register", passportCall("register"), async (req, res) => {
    try {
        
        res.status(201).json({status: "OK", msg: "User create"});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", msg: "Internal server Error"});
    }
});

//GOOGLE
router.get("/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false,
  }), async (req, res) => {
    try {
       
      return res.status(200).json({status: "OK", payload: req.user})

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", msg: "Internal server Error"});
    }
});

router.post("/login", passportCall("login"), async (req, res) => {
    try {
      const token = createToken(req.user); // CREAMOS NUESTRO TOKEN
      res.cookie("token", token, { httpOnly: true });
      
      return res.status(200).json({status: "OK", payload: req.user})

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "error", msg: "Internal server Error"});
    }
});




router.get("/current", passportCall("current"), async (req, res) => {

    res.status(200).json({status: "OK", user: req.user})
})


export default router