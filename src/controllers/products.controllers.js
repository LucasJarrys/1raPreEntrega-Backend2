import { request, response } from "express";
import productServices from "../services/product.services.js";


//CONTROLLER PARA OBTENER LOS PRODCUTOS
 const getAllProducts = async (req= request, res=response) => {
    try {
        const {limit, page, sort, category, status} = req.query; //Mandamos esas config para nuestra paginacion

        //CONFIGURAMOS EN CASO DE NO RECIBIR CONFIGURAMOS POR DEFAULT LO SIGUIENTE
        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
              price: sort=== "ascendente" ? 1 : -1
            },
            learn: true
        }

        // SI VIENE POR CATEGORIA
        if(category) {
            const products = await productServices.getAllProducts({category}, options);
            return res.status(200).json({status: "success", products});
        }

        if(status) {
            const products = await productServices.getAllProducts({status}, options);
            return res.status(200).json({status: "success", products});
        }

        const products = await productServices.getAllProducts({}, options);
        res.status(200).json({status: "success", products})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
 };

 //CONTROLLER PARA OBTENER PRODUCTO POR ID
const getProductById = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const product = await productServices.getProductById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

        res.status(200).json({status: "success", product})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
};

//CONTROLLER PARA ACTUALUIZAR PRODUCTO
const updateProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const productData = req.body
        const product = await productServices.updateProduct(pid, productData)
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

        res.status(200).json({status: "success", product})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
};

//CONTROLLER PARA CREAR UN PRODUCTO
const createProduct = async (req = request, res = response) => {
    try {
        const productData = req.body;
        const product = await productServices.createProduct(productData);


        res.status(201).json({status: "success", product})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
};

//CONTROLLER PARA ELIMINAR UN PRODUCTO
const deleteProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const product = await productServices.deleteProduct(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

        res.status(200).json({status: "success", msg: `El producto con el id ${pid} fue eliminado`});
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});
    }
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

