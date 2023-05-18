import Input from "../UI/input"
import Button from "../UI/button"
import EmptyBlock from "../emptyBlock"
import Message from "../message"
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react"
import Switcher from "../UI/switcher"
import AuthController from "../../controllers/authController"
import { setEditPopupAction, setPopupAction } from "../../store/authReducer"

const EditForm = () => {
    const dispatch = useDispatch()
    const {isAuth, user} = useSelector(state => state.auth)
    const [type, setType] = useState('info')
    const [tabs] = useState([
        {
            key: 'info',
            text: 'Информация'
        },
        {
            key: 'password',
            text: 'Пароль'
        },
    ])
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState('')
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const send = async (e) => {
        e.preventDefault()

        if(type === 'info') {
            if(
                !nameError &&
                !emailError &&
                name &&
                email
            ) {
                setLoading(true)
                const response = await AuthController.changeData(name, email)
                
                if(response.success) {
                    dispatch(setEditPopupAction(false))
                } else {
                    setLoading(false)
                    setError(response.message)
                }
            }
        } else if (type === 'password') {
            if(
                !passwordError &&
                !confirmPasswordError &&
                password &&
                confirmPassword
            ) {
                setLoading(true)
                const response = await AuthController.changePassword(password)
                
                if(response.success) {
                    dispatch(setEditPopupAction(false))
                    dispatch(setPopupAction(true))
                } else {
                    setLoading(false)
                    setError(response.message)
                }
            }
        }
    }

    if(!isAuth) {
        return <EmptyBlock icon="lock" text="Вы не авторизованы"/>
    } else {
        return (
            <form className="margin__smaller">
                <h4>Редактировать</h4>
                <Switcher
                    full={true}
                    grow={true}
                    value={type}
                    variants={tabs}
                    onChange={value => setType(value)}
                />
                {error ? <Message text={error} status="error" onClose={() => setError('')}/> : null}

                {
                    type === 'info' ?
                    <div className="margin__small">
                        <Input
                            icon="avatar"
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                            placeholder="Введите имя"
                            required={true}
                            validation={{
                                type: 'name',
                                onChange: (error) => {setNameError(error)}
                            }}
                        />
                        <Input
                            icon="email"
                            type="email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            placeholder="Введите email"
                            required={true}
                            validation={{
                                type: 'email',
                                onChange: (error) => {setEmailError(error)}
                            }}
                        />  
                    </div> :
                    <div className="margin__small">
                        <Input
                            icon="lock"
                            type="password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            placeholder="Введите пароль"
                            required={true}
                            validation={{
                                type: 'password',
                                onChange: (error) => {setPasswordError(error)}
                            }}
                        />
                        <Input
                            icon="lock"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                            placeholder="Повторите пароль"
                            required={true}
                            validation={{
                                type: 'confirmPassword',
                                password: password,
                                onChange: (error) => {setConfirmPasswordError(error)}
                            }}
                            description="Пароль должен содержать не менее 8 символов, латинские буквы и цифры."
                        />    
                    </div>
                }

                <Button
                    text="Сохранить"
                    full={true}
                    loading={loading}
                    onClick={send}
                />
            </form>
        )
    }
}

export default EditForm