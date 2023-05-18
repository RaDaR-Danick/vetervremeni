const defaultState = {
	notifs: [],
}

const ADD_NOTIF = 'ADD_NOTIF'
const CLOSE_NOTIF = 'CLOSE_NOTIF'

const notifReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_NOTIF:
			return {...state, notifs: [...state.notifs, action.payload]}
		case CLOSE_NOTIF:
			return {...state, notifs: state.notifs.length ? state.notifs.filter( item => item.id != action.payload ) : []}
		default:
			return state
	}
}

const addNotifAction = (payload) => ({type: ADD_NOTIF, payload})
const closeNotifAction = (payload) => ({type: CLOSE_NOTIF, payload})

export {notifReducer, addNotifAction, closeNotifAction}