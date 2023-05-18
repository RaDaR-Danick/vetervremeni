import DefaultPage from "../components/defaultPage"
import MyOrders from "../components/myOrders"
import { Helmet } from "react-helmet"

const OrdersPage = () => {
    return (
        <>
            <Helmet>
                <title>Мои заказы - Ветер времени</title>
                <meta name="description" content="Онлайн магазин часов"/>
            </Helmet>
            <DefaultPage
                title="Мои заказы"
                bread={[
                    {
                        text: 'Мои заказы',
                        link: '/orders'
                    }
                ]}
            >
                <MyOrders />
            </DefaultPage>
        </>
    )
}

export default OrdersPage