import cartRepository from "../persistence/mongoDB/cart.repository.js";
import productRepository from "../persistence/mongoDB/product.repository.js";

//  PARA CREAR TODOS LOS CARRITOS QUE QUIERAS
const createCart = async () => {
    return await cartRepository.create();
}


// PARA CONSEGUIR UN CARRITO POR ID
const getCartById = async (cid) => {
    return await cartRepository.getById(cid);
}


//  PARA AGREGAR PRODUCTOS DENTRO DE UN CARRITO
const addProductToCart = async (cid, pid) => {
   return await cartRepository.addProductToCart(cid, pid);
}


// PARA ELIMINAR PRODUCTO DENTRO DEL CARRITO
const deleteProductToCart = async (cid, pid) => {
   return await cartRepository.deleteProductToCart(cid, pid);
}
    

//  PARA ACTUALIZAR CANTIDAD DEL PRODUCTO  
const updateQuantityProductInCart = async (cid, pid, quantity) => {
    return await cartRepository.updateQuantityProductInCart(cid, pid, quantity);
} 


// PARA ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO    
const clearProductsToCart = async (cid) => {
    return await cartRepository.clearProductsToCart(cid);
}   

//HACEMOS LA COMPRA
const purchaseCart = async (cid) => {
    const cart = await cartRepository.getById(cid);
    let total = 0;
    const productsWithOutStock = [];
    

    for( const productCart of cart.products) { //USAMOS UN CICLO FOR PORQUE VAMOS A GACER UN CHEQUEO ASINCRONICO 
        const product = await productRepository.getById(productCart.product);

        if (product.stock >= productCart.quantity){
            total += product.price * productCart.quantity;
            await productRepository.update(product._id, {stock: product.stock - productCart.quantity});

        } else {
            productsWithOutStock.push(productCart);
        }

        await cartRepository.update(cid, {products: productsWithOutStock});
    }

    return total;

}

export default {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductToCart,
    updateQuantityProductInCart,
    clearProductsToCart,
    purchaseCart
};  

