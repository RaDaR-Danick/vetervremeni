const defaultState = {
	added: [],
    products: {},
    totalQuantity: 0,
    purePrice: 0,
    totalPrice: 0,
    discount: 0
}

const SET_ADDED = 'SET_ADDED'
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_QUANTITY = 'SET_QUANTITY'
const SET_PRICE = 'SET_PRICE'
const SET_PURE_PRICE = 'SET_PURE_PRICE'
const SET_DISCOUNT = 'SET_DISCOUNT'

const cartReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_ADDED:
			return {...state, added: action.payload}
		case SET_PRODUCTS:
			return {...state, products: action.payload}
		case SET_QUANTITY:
			return {...state, totalQuantity: action.payload}
        case SET_PRICE:
            return {...state, totalPrice: action.payload}
        case SET_PURE_PRICE:
            return {...state, purePrice: action.payload}
        case SET_DISCOUNT:
            return {...state, discount: action.payload}
		default:
			return state
	}
}

const setAddedAction = (payload) => ({type: SET_ADDED, payload})
const setProductsAction = (payload) => ({type: SET_PRODUCTS, payload})
const setQuantityAction = (payload) => ({type: SET_QUANTITY, payload})
const setPriceAction = (payload) => ({type: SET_PRICE, payload})
const setPurePriceAction = (payload) => ({type: SET_PURE_PRICE, payload})
const setDiscountAction = (payload) => ({type: SET_DISCOUNT, payload})

export { cartReducer, setAddedAction, setProductsAction, setQuantityAction, setPriceAction, setPurePriceAction, setDiscountAction }