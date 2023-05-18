import c from './styles.module.scss'
import Button from '../UI/button'
import Input from '../UI/input'
import Spinner from '../spinner'
import Container from '../container'
import { useEffect, useState } from "react"
import MaguapayController from '../../controllers/maguapayController'
import { MaskedRange } from 'imask'
import ProductsList from '../productsList'
import ParamsList from '../paramsList'
import { quantityFormate } from '../../utils/quantity'
import { priceFormate } from '../../utils/price'
import Message from '../message'
import MessageBlock from '../messageBlock'

const Form = ({id, order}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [cardHolder, setCardHolder] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardDate, setCardDate] = useState('')
    const [cardSecret, setCardSecret] = useState('')
    const { price, quantity, createdAt, cart_products, discount } = order

    const sendOrder = async (e) => {
        e.preventDefault()
        
        if(cardHolder && cardNumber.length === 16 && cardDate.length === 4 && cardSecret.length === 3) {
            setIsLoading(true)

            const cardMonth = cardDate.substring(0, 2)
            const cardYear = cardDate.substring(2, 4)
            const create = await MaguapayController.create({id, cardHolder, cardNumber, cardMonth, cardYear, cardSecret})

            if(create.url) {
                window.location.href = create.url
            } else {
                setError('Произошла неизваестная ошибка')
                setIsLoading(false)
            }
        } else {
            setError('Заполните форму корректно')
        }
    }

    return (
        <div className={c.formWrapper}>
            <form className={[c.form, 'margin__smaller'].join(' ')}>
                <h6>Форма оплаты</h6>
                {error ? (<div className={c.full}><Message status="error" text={error} onClose={() => setError('')}/></div>) : null}
                <div className={c.formInner}>
                    <div className={c.full}>
                        <Input
                            label="Имя на карте"
                            placeholder="Введите имя"
                            value={cardHolder}
                            name="cc-name"
                            onChange={(e) => {setCardHolder(e.target.value.toUpperCase())}}
                            size="larger"
                        />
                    </div>
                    <div className={c.full}>
                        <Input
                            label="Номер карты"
                            placeholder="Введите номер карты"
                            value={cardNumber}
                            size="larger"
                            name="cc-number"
                            mask={{
                                unmask: true,
                                onAccept: (value) => {
                                    setCardNumber(value)
                                },
                                mask: '0000-0000-0000-0000',
                                lazy: false
                            }}
                        />
                    </div>
                    <div className={c.half}>
                        <Input
                            label="Дата"
                            placeholder="Дата"
                            value={cardDate}
                            size="larger"
                            name="cc-exp"
                            center={true}
                            mask={{
                                unmask: true,
                                onAccept: (value) => {
                                    setCardDate(value)
                                },
                                lazy: false,
                                mask: 'MM/YY',
                                blocks: {
                                    YY: {
                                        mask: '00',
                                    },
                                    MM: {
                                        mask: MaskedRange,
                                        from: 1,
                                        to: 12
                                    },
                                }
                            }}
                        />
                    </div>
                    <div className={c.half}>
                        <Input
                            label="CVC"
                            placeholder="CVC"
                            value={cardSecret}
                            center={true}
                            name="cc-csc"
                            size="larger"
                            type="password"
                            mask={{
                                unmask: true,
                                onAccept: (value) => {
                                    setCardSecret(value)
                                },
                                mask: '000',
                            }}
                        />
                    </div>
                    <div className={c.full}>
                        <Button
                            size="larger"
                            full={true}
                            text="Оплатить"
                            onClick={sendOrder}
                            loading={isLoading}
                        />
                    </div>
                </div>
            </form>
            <div className={c.products}>
                <h6 className={c.title}>Товары в заказе</h6>
                <ProductsList items={cart_products}/>
                <div className={c.list}>
                    <h6 className={c.title}>Данные заказа</h6>
                    <ParamsList
                        items={[
                            {
                                title: 'Дата',
                                value: new Date(createdAt).toLocaleDateString()
                            },
                            {
                                title: 'Количество',
                                value: quantityFormate(quantity)
                            },
                            {
                                title: 'Скидка',
                                value: discount + '%'
                            },
                            {
                                title: 'Цена',
                                large: true,
                                value: priceFormate(price)
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

const MaguapayOrderForm = ({id}) => {
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(0)
    const [order, setOrder] = useState(null)

    const fetchData = async () => {
        const check = await MaguapayController.check(id)
        const { status, order } = check

        setOrder(order)
        setStatus(status)
        setLoading(false)
    }

    useEffect(
        () => {
            fetchData()
        },
        []
    )

    const Content = () => {
        if(status === 0) {
            return <Form id={id} order={order}/>
        } else if (status === -1) {
            return (
                <MessageBlock
                    status="error"
                    title="Ошибка"
                    text="Такого заказа не существует."
                    btn={<Button text="На главную" btnStyle="outline" link="/"/>}
                />
            )
        } else if (status === 1) {
            return (
                <MessageBlock
                    status="success"
                    title="Заказ оплачен"
                    text="Наши менеджеры свяжутся с вами в ближайшее время."
                    btn={<Button text="На главную" btnStyle="outline" link="/"/>}
                />
            )
        }
    }

    return (
        <section className={c.section}>
            <Container>
                <div className={c.inner}>
                    {
                        loading ? <Spinner /> : <Content />
                    }
                </div>
            </Container>
        </section>
    )
}

export default MaguapayOrderForm