const defaultState = {
	user: {},
    isAuth: false,
    popup: false,
	editPopup: false,
	withoutDocuments: false
}

const SET_USER = 'SET_USER'
const SET_AUTH = 'SET_AUTH'
const SET_POPUP = 'SET_POPUP'
const SET_EDIT_POPUP = 'SET_EDIT_POPUP'
const SET_WITHOUT_DOCUMENTS = 'SET_WITHOUT_DOCUMENTS'

const authReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_USER:
			return {...state, user: action.payload}
		case SET_AUTH:
			return {...state, isAuth: action.payload}
		case SET_POPUP:
			return {...state, popup: action.payload}
		case SET_EDIT_POPUP:
			return {...state, editPopup: action.payload}
		case SET_WITHOUT_DOCUMENTS:
			return {...state, withoutDocuments: action.payload}
		default:
			return state
	}
}

const setUserAction = (payload) => ({type: SET_USER, payload})
const setAuthAction = (payload) => ({type: SET_AUTH, payload})
const setPopupAction = (payload) => ({type: SET_POPUP, payload})
const setEditPopupAction = (payload) => ({type: SET_EDIT_POPUP, payload})
const setWithoutDocumentsAction = (payload) => ({type: SET_WITHOUT_DOCUMENTS, payload})

export {authReducer, setUserAction, setAuthAction, setPopupAction, setEditPopupAction, setWithoutDocumentsAction}