const initialState = {
    products: [],
    sellers: [],
    favorites: [],
    loading: false,
    error: null
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_PRODUCTS_REQUESTED': {
            return {
                ...state,
                loading: true
            }
        }
        case 'FETCH_PRODUCTS_SUCCESS': {
            return {
                ...state,
                products: [
                    ...state.products,
                    action.newProducts
                ]
            }
        }
        case 'FETCH_SELLERS_SUCCESS': {
            return {
                ...state,
                sellers: [
                    ...state.sellers,
                    action.newSellers
                ]
            }
        }
        case 'ADD_FAVORITES': {
            return {
                ...state,
                favorites: [
                    ...state.favorites,
                    action.newFavorites
                ]
            }
        }
    }
}

export default rootReducer;