const defaultState = {
	value: '',
}

const SET_SEARCH = 'SET_SEARCH'

const searchReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_SEARCH:
			return {...state, value: action.payload}
		default:
			return state
	}
}

const setSearchAction = (payload) => ({type: SET_SEARCH, payload})

export {searchReducer, setSearchAction}