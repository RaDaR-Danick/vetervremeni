import c from './styles.module.scss'
import Container from '../container'
import CartProducts from '../cartProducts'
import OrderForm from '../orderForm'
import CartInfo from '../cartInfo'
import Button from '../UI/button'

const CartBody = () => {
    return (
        <section className={c.cart}>
            <Container>
                <div className={c.inner}>
                    <div className={c.body}>
                        <div className={c.block}>
                            <h5>Товары в корзине</h5>
                            <CartProducts />
                        </div>
                        <div className={c.block} id="orderForm">
                            <h5>Форма заказа</h5>
                            <OrderForm/>
                        </div>
                    </div>
                    <div className={c.sidebar}>
                        <CartInfo
                            btn={<Button text="Оформить заказ" full={true} onClick={() => {document.getElementById('orderForm').scrollIntoView()}}/>}
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default CartBody