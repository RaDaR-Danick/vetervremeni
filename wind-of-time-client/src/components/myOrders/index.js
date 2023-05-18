import { useSelector } from "react-redux"
import EmptyBlock from "../emptyBlock"
import CartController from "../../controllers/cartController"
import { useEffect, useState } from "react"
import Spinner from "../spinner"
import OrdersList from "../ordersList"

const MyOrders = () => {
    const { isAuth, user } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const fetchData = async () => {
        const getData = await CartController.userOrders(user.id)

        setData(getData.data.data)
        setLoading(false)
    }

    useEffect(() => {
        if(isAuth) {
            fetchData()
        }
    }, [isAuth])

    if(isAuth) {
        if(loading) {
            return <Spinner padding={true}/>
        } else {
            return <OrdersList data={data}/>
        }
    } else {
        return <EmptyBlock icon="lock" padding={true} text="Вы не авторизованы"/>
    }
}

export default MyOrders