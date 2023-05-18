const defaultState = {
	selected: null,
	loaded: false
}

const SET_CITY = 'SET_CITY'

const cityReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_CITY:
			return {...state, selected: action.payload, loaded: true}
		default:
			return state
	}
}

const setCityAction = (payload) => ({type: SET_CITY, payload})

export { cityReducer, setCityAction }