import { request, response } from "express";
import cartServices from "../services/cart.services.js";
import ticketServices from "../services/ticket.services.js";

// CONTROLADOR PARA CREAR TODOS LOS CARRITOS QUE QUIERAS
const createCart = async (req = request, res = response) => {
    try {
        
        const cart = await cartServices.createCart();

        res.status(201).json({status: "success", cart});

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
};


//CONTROLADOR PARA CONSEGUIR UN CARRITO POR ID
const getCartById =  async (req = request, res = response) => {
    try {
        const {cid} = req.params
        const cart = await cartServices.getCartById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

        res.status(200).json({status: "success", cart});

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
};


// CONTROLADOR PARA AGREGAR PRODUCTOS DENTRO DE UN CARRITO
const addProductToCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
       
        const cartUpdate = await cartServices.addProductToCart(cid, pid);

        res.status(200).json({ status: "success", payload: cartUpdate });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
    };


//CONTROLADOR PARA ELIMINAR PRODUCTO DENTRO DEL CARRITO
const deleteProductToCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
        const cartUpdate = await cartServices.deleteProductToCart(cid, pid); //ELIMINAMOS EL PRODUCTO DEL CARRITO
                                          
        res.status(200).json({ status: "success", payload: cartUpdate });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
    };
    

// CONTROLADOR PARA ACTUALIZAR CANTIDAD DEL PRODUCTO  
const updateQuantityProductInCart =  async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params; //PASAMOS LOS ID POR PARAMETROS
        const {quantity} = req.body
       
        const cartUpdate = await cartServices.updateQuantityProductInCart(cid, pid, Number(quantity)); //AGREGAMOS LA QUANTITY QUE LE PASAMOS POR EL BODY
                                        
        res.status(200).json({ status: "success", payload: cartUpdate });
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
      }
    };


//CONTROLADOR PARA ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO    
const clearProductsToCart = async (req = request, res = response) => {
    try {
        const {cid} = req.params
        const cart = await cartServices.clearProductsToCart(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
  
        res.status(200).json({status: "success", cart});
  
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
  };    

const purchaseCart = async (req = request, res = response) => {
    try {
      const {cid} = req.params;
      const cart = await cartServices.getCartById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

        const total = await cartServices.purchaseCart(cid);
        const ticket = await ticketServices.createTicket(req.user.email, total);


        res.status(200).json({status: "success", ticket });

    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
  };      

export default {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductToCart,
    updateQuantityProductInCart,
    clearProductsToCart,
    purchaseCart
};  