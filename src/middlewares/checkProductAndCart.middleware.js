import { request, response } from "express";
import cartServices from "../services/cart.services.js";
import productRepository from "../persistence/mongoDB/product.repository.js";

export const checkProductAndCart = async (req = request, res = response, next) => {
    const { cid, pid } = req.params;
        const product = await productRepository.getById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: `Producto no encontrado con el id ${pid}` });
        const cart = await cartServices.getCartById(cid);
         
        if (!cart) return res.status(404).json({ status: "Error", msg: `Carrito no encontrado con el id ${cid}` });

        next();
};
