
export const respProductDto = (product) => {
    return {
        tittle: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
    };
};