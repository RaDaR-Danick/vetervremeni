import Button from "../components/UI/button"
import PageHeader from "../components/pageHeader"
import CartBody from "../components/cartBody"
import Breadcrumbs from "../components/breadcrumbs"
import { useSelector } from "react-redux"
import CartController from "../controllers/cartController"
import { Helmet } from "react-helmet"
import { useEffect } from "react"

const CartPage = () => {
    const { totalQuantity } = useSelector(store => store.cart)
    let count = '(пусто)'

    if(totalQuantity) {
        count = totalQuantity
        
        if(totalQuantity === 1) {
            count += ' товар'
        } else if (totalQuantity > 1 && totalQuantity < 5) {
            count += ' товара'
        } else {
            count += ' товаров'
        }

        count = `(${count})`
    }

    useEffect(() => {
        if(localStorage.getItem('cart')) {
            const added = JSON.parse(localStorage.getItem('cart'))
            if(added) {
                CartController.setCart(added)
            }
        }
    }, [])

    return (
        <>
            <Helmet>
                <title>Корзина - Ветер времени</title>
                <meta name="description" content="Онлайн магазин часов"/>
            </Helmet>
            <Breadcrumbs path={[
                {text: 'Корзина'}
            ]}/>
            <PageHeader
                title="Корзина"
                afterTitle={count}
                after={<Button beforeIcon="trash" text="Очистить корзину" btnStyle="outline" onClick={CartController.clearCart}/>}
            />
            <CartBody />
        </>
    )
}

export default CartPage