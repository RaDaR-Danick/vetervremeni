import { useDispatch, useSelector } from 'react-redux'
import { setEditPopupAction } from '../../store/authReducer'
import EditForm from "../editForm"
import Modal from "../modal"

const EditPopup = () => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.auth.editPopup)

    return (
        <>
            <Modal show={show} onClose={() => {dispatch(setEditPopupAction(false))}}>
                <EditForm/>
            </Modal>
        </>
    )
}

export default EditPopup