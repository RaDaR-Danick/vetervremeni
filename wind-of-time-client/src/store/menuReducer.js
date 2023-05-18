const defaultState = {
	show: false,
}

const SET_MENU = 'SET_MENU'

const menuReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_MENU:
			return {...state, show: action.payload}
		default:
			return state
	}
}

const setMenuAction = (payload) => ({type: SET_MENU, payload})

export {menuReducer, setMenuAction}