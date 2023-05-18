import c from './styles.module.scss'
import EmptyBlock from '../emptyBlock'
import OrdersListItem from '../ordersListItem'

const OrdersList = ({data}) => {
    if(data.length) {
        return (
            <section className={c.list}>
                {data.map(item => <OrdersListItem key={item.id} data={item}/>)}
            </section>
        )
    } else {
        return <EmptyBlock icon="inbox" padding={true} text="Нет заказов"/>
    }
}

export default OrdersList