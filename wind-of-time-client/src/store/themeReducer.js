const defaultState = {
	value: 'light',
}

const SET_THEME = 'SET_THEME'

const themeReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_THEME:
			return {...state, value: action.payload}
		default:
			return state
	}
}

const setThemeAction = (payload) => ({type: SET_THEME, payload})

export {themeReducer, setThemeAction}