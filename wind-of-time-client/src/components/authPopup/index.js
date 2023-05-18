import { useDispatch, useSelector } from 'react-redux'
import { setPopupAction } from '../../store/authReducer'
import Modal from '../modal'
import AuthForm from '../authForm'

const AuthPopup = () => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.auth.popup)

    return (
        <>
            <Modal show={show} onClose={() => {dispatch(setPopupAction(false))}}>
                <AuthForm/>
            </Modal>
        </>
    )
}

export default AuthPopup