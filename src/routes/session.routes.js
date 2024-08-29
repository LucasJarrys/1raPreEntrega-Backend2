import {Router} from "express";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import { createToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import userRepository from "../persistence/mongoDB/user.repository.js";
import sessionControllers from "../controllers/session.controllers.js";


const router = Router();

// RUTA PARA REGISTRAR USUARIO
router.post("/register", passportCall("register"), sessionControllers.createSession);

// RUTA GOOGLE
router.get("/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false,
  }), sessionControllers.createGoogleSession);

// RUTA PARA LOGUEAMOS USUARIO
router.post("/login", passportCall("login"), sessionControllers.loginSession );


router.get("/current", passportCall("current"), sessionControllers.getCurrentSession)






// VOY A UTILIZAR LA RUTA DE LOGIN
// router.post("/auth", async (req, res) => {  
//   try {
//     const { email, password } = req.body;
//     const user = await userRepository.getByEmail(email);
//     if (!user || !isValidPassword(user.password, password)) return res.status(401).json({ status: "error", msg: "User or email invalid" });

//     const token = createToken(user);

//     res.cookie("token", token, { httpOnly: true });
//     return res.status(200).json({ status: "ok", user, token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ status: "error", msg: "Internal server error" });
//   }
// });

export default router