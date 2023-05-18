import c from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setMenuAction } from '../../store/menuReducer'

const MobileMenuToggler = () => {
    const dispatch = useDispatch()
    const {show} = useSelector(store => store.menu)

    const toggle = () => {
        dispatch(setMenuAction(!show))
    }

    return (
        <div
            className={[c.mobileMenuToggler, show ? c.active : null].join(' ')}
            onClick={toggle}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default MobileMenuToggler