import { createStore, combineReducers } from 'redux'
import { authReducer } from './authReducer.js'
import { searchReducer } from './searchReducer.js'
import { cartReducer } from './cartReducer.js'
import { cityReducer } from './cityReducer.js'
import { menuReducer } from './menuReducer.js'
import { themeReducer } from './themeReducer.js'
import { notifReducer } from './notifReducer.js'

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    cart: cartReducer,
    city: cityReducer,
    menu: menuReducer,
    theme: themeReducer,
    notif: notifReducer,
})
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const dispatchStore = store.dispatch
const getStoreState = store.getState

export { dispatchStore, getStoreState }
export default store