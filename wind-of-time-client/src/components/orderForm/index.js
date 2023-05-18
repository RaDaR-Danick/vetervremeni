import c from './styles.module.scss'
import Input from '../UI/input'
import Switcher from '../UI/switcher'
import { useState } from 'react'
import Button from '../UI/button'
import Checkbox from "../UI/checkbox"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Message from '../message'
import CartController from '../../controllers/cartController'
import { useNavigate } from 'react-router-dom'
import { replaceAll } from '../../utils/string'

const OrderForm = () => {
    const { totalQuantity, added } = useSelector(store => store.cart)
    const { isAuth, user, withoutDocuments } = useSelector(store => store.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [name, setName] = useState(localStorage.getItem('orderName') || '')
    const [phone, setPhone] = useState(localStorage.getItem('orderPhone') || '')
    const [address, setAddress] = useState(localStorage.getItem('orderAddress') || '')
    const [comment, setComment] = useState('')
    const [agree, setAgree] = useState('')
    const [type, setType] = useState('')
    const [types] = useState([
        {
            key: '',
            text: 'Наличные'
        },{
            key: 'maguapay',
            text: 'Картой'
        }
    ])
    const [nameError, setNameError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [agreeError, setAgreeError] = useState(false)

    const navigate = useNavigate()

    const onSend = async (e) => {
        e.preventDefault()

        if(!nameError && !phoneError && !agreeError && name && phone && agree) {
            const data = {name, phone, address, comment, added, withoutDocuments, type}
            data.phone = replaceAll(data.phone, /[^0-9]/gm, '')

            if(isAuth) {
                data.id = user.id
            }

            setIsLoading(true)
            const send = await CartController.send(data)

            if(send.success) {
                await CartController.clearCart()

                localStorage.setItem('orderName', name)
                localStorage.setItem('orderPhone', phone)
                localStorage.setItem('orderAddress', address)

                if(type === 'maguapay') {
                    navigate('/maguapay/' + send.id)
                } else {
                    navigate('/success')
                }
            } else {
                setIsLoading(false)
                setError(send.message)
            }
            
        } else {
            if(!agree) {
                setAgreeError(true)
            }
        }
    }

    return (
        <form className={c.form}>
            {error ? (<div className={c.full}><Message status="error" text={error} onClose={() => setError('')}/></div>) : null}
            {
                types.length ?
                <div className={c.full}>
                    <Switcher
                        variants={types}
                        value={type}
                        onChange={(value) => {
                            setType(value)
                        }}
                        grow={true}
                        full={true}
                    />
                </div> : null
            }
            <Input
                label="Ваше имя"
                required={true}
                placeholder="Введите имя"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
                icon="avatar"
                validation={{
                    type: 'name',
                    onChange: (error) => {setNameError(error)}
                }}
            />

            <Input
                label="Номер телефона"
                required={true}
                placeholder="Введите номер"
                value={phone}
                onChange={(e) => {setPhone(e.target.value)}}
                icon="phone"
                validation={{
                    type: 'phone',
                    onChange: (error) => {setPhoneError(error)}
                }}
            />

            <div className={c.full}>
                <Input
                    label="Адрес доставки"
                    placeholder="Введите адрес"
                    value={address}
                    icon="place"
                    onChange={(e) => {setAddress(e.target.value)}}
                />
            </div>

            <div className={c.full}>
                <Input
                    label="Комментарии к заказу"
                    placeholder="Введите комментарии"
                    value={comment}
                    icon="chat"
                    onChange={(e) => {setComment(e.target.value)}}
                />
            </div>

            <div className={c.full}>
                <Checkbox
                    required={true}
                    value={agree}
                    error={agreeError}
                    onChange={value => {
                        setAgreeError(false)
                        setAgree(value)
                    }
                }>Я принимаю условия <NavLink end to="privacy-policy">политики конфиденциальности</NavLink>.</Checkbox>
            </div>

            <div className={c.full}>
                {totalQuantity ? <Button text="Отправить заявку" full={true} onClick={onSend} loading={isLoading}/> : <Button text="Корзина пуста" full={true} disabled={true}/>}
            </div>

        </form>
    )
}

export default OrderForm