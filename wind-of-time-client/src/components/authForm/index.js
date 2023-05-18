import { useState } from "react"
import Input from "../UI/input"
import Button from "../UI/button"
import c from './styles.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setPopupAction } from "../../store/authReducer"
import AuthController from "../../controllers/authController"
import Message from "../message"

const LoginFields = ({email, setEmail, setEmailError, password, setPassword, setPasswordError, setTypeAction, onClick, loading = false}) => {
    return (
        <>
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
                description="Пароль должен содержать не менее 8 символов, латинские буквы и цифры."
            />
            <div className="margin__small">
                <Button text="Войти" full={true} onClick={onClick} loading={loading}/>
                <div className={c.alt}>Ещё нет аккаунта? <span className="styledLink" onClick={() => {setTypeAction('register')}}>Регистрация</span>.</div>
            </div>
        </>
    )
}

const RegisterFields = ({name, setName, setNameError, email, setEmail, setEmailError, password, setPassword, setPasswordError, setTypeAction, onClick, loading = false}) => {
    return (
        <>
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
                description="Пароль должен содержать не менее 8 символов, латинские буквы и цифры."
            />
            <div className="margin__small">
                <Button text="Регистрация" full={true} onClick={onClick} loading={loading}/>
                <div className={c.alt}>Уже есть аккаунт? <span className="styledLink" onClick={() => {setTypeAction('login')}}>Авторизация</span>.</div>
            </div>
        </>
    )
}

const AuthForm = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [type, setType] = useState(isAuth ? 'logged' : 'login')
    const titles = {
        login: 'Авторизация',
        register: 'Регистрация',
        restore: 'Восстановление пароля',
        logged: 'Вы уже авторизованы'
    }

    const setTypeAction = (newType) => {
        setType(newType)
    }

    const clearError = () => {
        setError('')
    }

    const loginSend = async (e) => {
        e.preventDefault()

        if(!emailError && !passwordError && email && password) {
            setLoading(true)
            const login = await AuthController.login(email, password)

            setLoading(false)
            if(login.success) {
                dispatch(setPopupAction(false))
            } else {
                setError(login.message)
            }
        }

    }

    const logoutSend = async (e) => {
        e.preventDefault()
        await AuthController.logout()
        dispatch(setPopupAction(false))
    }

    const registerSend = async (e) => {
        e.preventDefault()

        if(!emailError && !passwordError && !nameError && email && password && name) {
            setLoading(true)
            const login = await AuthController.register(name, email, password)

            setLoading(false)
            if(login.success) {
                dispatch(setPopupAction(false))
            } else {
                setError(login.message)
            }
        }

    }

    const loginFields = LoginFields({email, setEmail, emailError, setEmailError, password, setPassword, setPasswordError, setTypeAction, onClick: loginSend, loading})
    const registerFields = RegisterFields({name, setName, setNameError, email, setEmail, setEmailError, password, setPassword, setPasswordError, setTypeAction, onClick: registerSend, loading})
    const fields = (
        <>
            <div className={type === 'login' ? 'margin__smaller' : c.hidden}>{loginFields}</div>
            <div className={type === 'register' ? 'margin__smaller' : c.hidden}>{registerFields}</div>
        </>
    )

    return (
        <form className={c.form}>
            <h4 className={c.title}>{titles[type]}</h4>
            {error ? <Message text={error} status="error" onClose={clearError}/> : null}
            { type === 'logged' ? <Button text="Выйти" full={true} onClick={logoutSend}/> : fields }
        </form>
    )
}

export default AuthForm