import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import productManager from "./persistence/fileSystem/productManager.js";
import { connectMongoDB } from "./config/mongoDB.config.js";
import session from "express-session";
import envs from "./config/env.config.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";




const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); // INDICA EL MOTOR DE LA PLANTILLA
app.set("views", __dirname + "/views"); // INDICAMOS EN QUE RUTA SE ENCUENTRAN LAS VISTAS
app.set("view engine", "handlebars"); // INDICAMOS CON QUE MOTOR VAMOS A UTILIZAR LAS VISTAS
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: envs.SECRET_CODE, // palabra secreta
    resave: true, // Mantiene la session activa, si esta en false la session se cierra en un cierto tiempo
    saveUninitialized: true, // Guarda la session
  })
);
app.use(cors());


initializePassport();
app.use(passport.initialize());
app.use(passport.session());



// RUTAS API
app.use("/api", routes);

// RUTA DE LAS VISTAS
app.use("/", viewsRoutes)

const httpServer = app.listen(envs.PORT, () => {
    console.log(`Server listen to port ${envs.PORT}`);
});


// Configuramos socket
export const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Nuevo usuario Conectado");
  const products = await productManager.getProductos();
  io.emit ("products",  products );
});