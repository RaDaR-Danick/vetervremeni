import c from './styles.module.scss'
import Button from '../../components/UI/button'
import { setPopupAction, setEditPopupAction } from '../../store/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import AuthController from '../../controllers/authController'
import { NavLink } from 'react-router-dom'
import { CloseMenu } from '../mobileMenu'

const UserWidgetMobile = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(store => store.auth.isAuth)
    const user = useSelector(store => store.auth.user)

    if(isAuth) {
        const {name, email} = user

        return (
            <div className={c.userBlock}>
                <div className={c.user}>
                    <div className={[c.icon, 'icon-avatar'].join(' ')}></div>
                    <div className={c.text}>
                        <div className={c.name}>{name}</div>
                        <div className={c.email}>{email}</div>
                    </div>
                    <Button
                        icon="logout"
                        btnStyle="outline"
                        onClick={() => {
                            AuthController.logout()
                        }}
                    />
                </div>
                <div
                    className={c.item}
                    onClick={() => {
                        dispatch(setEditPopupAction(true))
                    }}
                >
                    <div className={[c.icon, 'icon-edit'].join(' ')}></div>
                    <div className={c.text}>Редактировать</div>
                </div>
                <NavLink end to="/orders" onClick={CloseMenu} className={c.item}>
                    <div className={[c.icon, 'icon-inbox'].join(' ')}></div>
                    <div className={c.text}>Мои заказы</div>
                </NavLink>
            </div>
        )
    } else {
        return <Button text="Авторизация" onClick={() => {dispatch(setPopupAction(true))}} full={true}/>
    }
}

export default UserWidgetMobile