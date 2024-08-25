import { Router } from "express";
import { checkProductData } from "../middlewares/checkPorductData.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import productsControllers from "../controllers/products.controllers.js";
import productRepository from "../persistence/mongoDB/product.repository.js";


const router = Router();

// RUTA PARA BUSCAR POR LAS DISTINTAS CONFIGURACION QUE CREAMOS
router.get("/", passportCall("jwt"), authorization("user"), productsControllers.getAllProducts);


// RUTA PARA CONSEGUIR UN PRODUCTO POR ID
router.get("/:pid", productsControllers.getProductById );

// RUTA PARA CREAR PRODUCTOS DESDE EL BODY
router.post("/",passportCall("jwt") , authorization("admin"), checkProductData, productsControllers.createProduct);


// RUTA PARA ACTUALIZAR LOS PRODUCTOS DESDE EL BODY BUSCADO POR ID
router.put("/:pid", authorization("admin"), productsControllers.updateProduct);

// RUTA PARA ELIMINAR UN PRODUCTO
router.delete("/:pid", authorization("admin"), productsControllers.deleteProduct);


export default router;

