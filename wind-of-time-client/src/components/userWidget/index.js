import c from './styles.module.scss'
import Button from '../../components/UI/button'
import { setPopupAction, setEditPopupAction } from '../../store/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import DropdownBlock from '../dropdownBlock'
import AuthController from '../../controllers/authController'

const UserWidget = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(store => store.auth.isAuth)
    const user = useSelector(store => store.auth.user)

    if(isAuth) {
        const {name} = user

        return (
            <DropdownBlock items={[
                {
                    icon: 'edit',
                    text: 'Редактировать',
                    onClick: () => {
                        dispatch(setEditPopupAction(true))
                    }
                },
                {
                    icon: 'inbox',
                    text: 'Мои заказы',
                    link: '/orders',
                },
                {
                    icon: 'logout',
                    text: 'Выйти',
                    onClick: () => {
                        AuthController.logout()
                    }
                }
            ]}>
                <div className={c.wrapper}>
                    <div className={c.widget}>
                        <div className={c.widgetInner}>
                            <div className={[c.icon, 'icon-avatar'].join(' ')}></div>
                            <div className={c.name}>{name}</div>
                            <div className={[c.arrow, 'icon-select'].join(' ')}></div>
                        </div>
                    </div>
                </div>
            </DropdownBlock>
        )
    } else {
        return <Button text="Войти" onClick={() => {dispatch(setPopupAction(true))}}/>
    }
}

export default UserWidget