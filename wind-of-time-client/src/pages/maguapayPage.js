import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import PageHeader from "../components/pageHeader"
import MaguapayOrderForm from "../components/maguapayOrderForm"

const MaguapayPage = () => {
    const params = useParams()
    const id = parseInt(params.id)

    return (
        <>
            <Helmet>
                <title>Оплата заказа - Ветер времени</title>
                <meta name="description" content="Онлайн магазин часов"/>
            </Helmet>
            <PageHeader
                title={`Оплата заказа #${id}`}
            />
            <MaguapayOrderForm id={id}/>
        </>
    )
}

export default MaguapayPage