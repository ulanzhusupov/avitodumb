const productsRequested = () => {
    return {
        type: 'FETCH_PRODUCTS_REQUESTED'
    }
};

const productsLoaded = (products) => {
    return {
        type: 'FETCH_PRODUCTS_SUCCESS',
        newProducts: products
    }
};

const sellersLoaded = (sellers) => {
    return {
        type: 'FETCH_SELLERS_SUCCESS',
        newSellers: sellers
    }
};

const addFavoriteProduct = (product) => {
    return {
        type: 'ADD_FAVORITES',
        newFavorites: product
    }
};

export {
    productsRequested,
    productsLoaded,
    sellersLoaded,
    addFavoriteProduct
};