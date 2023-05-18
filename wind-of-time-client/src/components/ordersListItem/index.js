import c from './styles.module.scss'
import Button from '../UI/button'
import { priceFormate } from '../../utils/price'
import { quantityFormate } from '../../utils/quantity'
import ProductsList from '../productsList'
import { useEffect, useState } from 'react'
import CartController from '../../controllers/cartController'
import { useSelector } from 'react-redux'
import MaguapayController from '../../controllers/maguapayController'

const Meta = ({icon, text}) => {
    return (
        <div className={c.metaItem}>
            <span className={[c.icon, 'icon-' + icon].join(' ')}></span>
            <span className={c.text}>{text}</span>
        </div>
    )
}

const OrdersListItem = ({data}) => {
    const {id, price, quantity, comment, address, phone, createdAt, cart_products, type} = data
    const [show, setShow] = useState(false)
    const [download, setDownload] = useState(false)
    const user = useSelector(store => store.auth.user)
    const meta = [
        {
            icon: 'calendar-solid',
            text: new Date(createdAt).toLocaleDateString()
        },
        {
            icon: 'place-solid',
            text: address
        },
        {
            icon: 'phone-solid',
            text: phone
        },
        {
            icon: 'inbox-solid',
            text: quantityFormate(quantity)
        },
    ]
    const [payBtn, setPayBtn] = useState(null)

    const downloadFile = async () => {
        setDownload(true)
        await CartController.download(id, user.id)
        setDownload(false)
    }

    const checkMagua = async () => {
        const check = await MaguapayController.check(id)
        
        if(check.status === 0) {
            setPayBtn(
                <Button
                    text="Оплатить"
                    link={`/maguapay/${id}`}
                />
            )
        }
    }

    useEffect(() => {
        if(type === 'maguapay') {
            checkMagua()
        }
    }, [])

    return (
        <div className={c.order}>
            <div className={c.info}>
                <div className={c.content}>
                    <div className={c.title}><span>#{id} - </span>{priceFormate(price)}</div>
                    {comment ? <div className={c.comment}>{comment}</div> : null}
                    <div className={c.meta}>
                        <div className={c.line}>
                            {
                                meta.map((item, i) => item.text ? <Meta key={i} {...item}/> : null)
                            }
                        </div>
                    </div>
                    {show ? <div className={c.productsList}><ProductsList items={cart_products}/></div> : null}
                    <div className={c.btns}>
                        <Button text={show ? 'Скрыть' : 'Показать'} size="smaller" btnStyle="outline" onClick={() => {setShow(!show)}}/>
                        <Button text="Скачать" size="smaller" disabled={download} onClick={downloadFile}/>
                        { payBtn }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersListItem