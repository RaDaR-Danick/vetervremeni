import c from './styles.module.scss'
import ParamsList from '../paramsList'
import { useSelector, useDispatch } from 'react-redux'
import { priceFormate } from '../../utils/price'
import { quantityFormate } from '../../utils/quantity'
import Toggler from '../UI/toggler'
import { setWithoutDocumentsAction } from '../../store/authReducer'
import CartController from '../../controllers/cartController'

const CartInfo = ({btn = null}) => {
    const { totalQuantity, totalPrice, purePrice } = useSelector(store => store.cart)
    const { user, withoutDocuments } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    return (
        <div className={c.wrapper}>
            <div className={c.header}>
                <h5>Ваш заказ</h5>
            </div>
            <ParamsList items={[
                {title: 'Товаров к корзине', value: quantityFormate(totalQuantity)},
                {title: 'Товаров на сумму', value: priceFormate(purePrice)},
            ]}/>
            <hr />
            <ParamsList items={[{title: 'Итого', value: priceFormate(totalPrice), large: true}]}/>
            {
                user.wholesaler ?
                (
                    <>
                        <hr />
                        <Toggler
                            label="Заказать без документов"
                            checked={withoutDocuments}
                            onChange={
                                (value) => {
                                    dispatch(setWithoutDocumentsAction(value))
                                    CartController.updateCart()
                                }
                            }/>
                    </>
                ) : null
            }
            <hr />
            <div className={c.about}>
                <div className={c.text}>Доставка в городах Алматы и Астана осуществляется в течении 2/3 рабочих дней. По Казахстану от 3 до 5 рабочих дней.</div>
            </div>
            {btn}
        </div>
    )
}

export default CartInfo