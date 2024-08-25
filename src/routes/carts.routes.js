import { Router } from "express";
import { verifyProductInCart } from "../middlewares/verifyProductInCart.middleware.js";
import { isUserCart } from "../middlewares/isUserCart.middleware.js";
import cartsControllers from "../controllers/carts.controllers.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import cartRepository from "../persistence/mongoDB/cart.repository.js";
import productRepository from "../persistence/mongoDB/product.repository.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

// RUTA PARA CREAR TODOS LOS CARRITOS QUE QUIERAS
router.post("/", cartsControllers.createCart);


//RUTA PARA CONSEGUIR UN CARRITO POR ID
router.get("/:cid", cartsControllers.getCartById);


// RUTA PARA AGREGAR PRODUCTOS DENTRO DE UN CARRITO
router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, isUserCart, cartsControllers.addProductToCart);

   
//RUTA PARA ELIMINAR PRODUCTO DENTRO DEL CARRITO
router.delete("/:cid/product/:pid",passportCall("jwt"), authorization("user"), checkProductAndCart,cartsControllers.deleteProductToCart);


// RUTA PARA ACTUALIZAR CANTIDAD DEL PRODUCTO        
router.put("/:cid/product/:pid",passportCall("jwt"), authorization("user"), checkProductAndCart, verifyProductInCart, cartsControllers.updateQuantityProductInCart);


//RUTA PARA ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO

router.delete("/:cid",passportCall("jwt"), authorization("user"), cartsControllers.clearProductsToCart)

//RUTA PARA HCER LA COMPRA
router.get("/:cid/purchase",passportCall("jwt"), authorization("user"), cartsControllers.purchaseCart);
          

export default router;




// OTRA RUTA PARA ELIMINAR PRODUCTO DENTRO DEL CARRITO actualizado con el Middleware

      // router.delete("/:cid/product/:pid", verifyProductInCart, async (req, res) => {
      //   try {
      //       const { cid, pid } = req.params;
      //       const cart = await cartDao.getById(cid);
            
      //       if (!cart) return res.status(404).json({ status: "Error", msg: `Carrito no encontrado con el id ${cid}` });
            
      //       const cartUpdate = await cartDao.deleteProductToCart(cid, pid); // Utilizamos el producto adjunto por el middleware
            
      //       res.status(200).json({ status: "success", payload: cartUpdate });
      //     } catch (error) {
      //       console.log(error);
      //       res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
      //     }
      // });


// OTRA RUTA PARA AGREGAR PRODUCTOS DENTRO DE UN CARRITO CON Middleware

// router.post("/:cid/product/:pid", verifyProductInCart, async (req, res) => {
//   try {
//       const { cid } = req.params;
//       // No es necesario buscar el producto nuevamente, ya que el middleware lo adjuntó a req.product
//       const product = req.product;
     
//       const cart = await cartDao.getById(cid);
//       if (!cart) return res.status(404).json({ status: "Error", msg: `Carrito no encontrado con el id ${cid}` });
     
//       // product.id es el objeto producto que adjuntó el middleware
//       const cartUpdate = await cartDao.addProductToCart(cid, product.id);
                                      
//       res.status(200).json({ status: "success", payload: cartUpdate });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
//     }
//   });      