import DefaultPage from "../components/defaultPage"
import TextWrapper from "../components/textWrapper"
import { Helmet } from "react-helmet"

const DeliveryPage = () => {
    return (
        <>
            <Helmet>
                <title>Доставка и оплата - Ветер времени</title>
                <meta name="description" content="Онлайн магазин часов"/>
            </Helmet>
            <DefaultPage
                title="Доставка и оплата"
                bread={[
                    {
                        text: 'Доставка и оплата',
                        link: '/delivery'
                    }
                ]}
            >
                <TextWrapper>
                    <h6>Алматы и Астана</h6>
                    <p>Доставка в городах Алматы и Астана осуществляется в течении 2/3 рабочих дней.</p>
                    <br />
                    <h6>Самовывоз</h6>
                    <p><b>Алматы</b> - Розыбакиева 247 ТРЦ Мега АЛМАТА </p>
                    <p>САМОВЫВОЗ С ПУНКТА ВЫДАЧИ - МУКАНОВА 70</p>
                    <br />
                    <h6>Доставка по Казахстану</h6>
                    <p>Доставка по Казахстану осуществляется от 3 до 5 рабочих дней.</p>
                    <br />
                    <h6>Способы оплаты</h6>
                    <ul>
                        <li>Kaspi Pay/Kaspi Qr</li>
                        <li>Visa /Master Card</li>
                        <li>Наличные</li>
                    </ul>
                </TextWrapper>
            </DefaultPage>
        </>
    )
}

export default DeliveryPage