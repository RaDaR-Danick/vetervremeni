import c from './styles.module.scss'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { priceFormate } from '../../utils/price'
import { CloseMenu } from '../mobileMenu'

const CartBtn = () => {
    const cart = useSelector(store => store.cart)

    return (
        <NavLink end to="/cart" className={c.cartBtn} onClick={CloseMenu}>
            <div className={[c.cartBtnIcon, 'icon-cart'].join(' ')} data-count={cart.totalQuantity}></div>
            <div className={c.cartBtnText}>
                <div className={c.cartBtnTitle}>Ваша корзина</div>
                <div className={c.cartBtnTotal}>{priceFormate(cart.totalPrice)}</div>
            </div>
        </NavLink>
    )
}

export default CartBtn