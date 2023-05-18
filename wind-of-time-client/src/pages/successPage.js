import MessageBlock from "../components/messageBlock"
import Button from "../components/UI/button"
import { Helmet } from "react-helmet"

const SuccessPage = () => {
    return (
        <>
            <Helmet>
                <title>Заявка отправлена - Ветер времени</title>
                <meta name="description" content="Онлайн магазин часов"/>
            </Helmet>
            <MessageBlock
                status="success"
                title="Заявка отправлена"
                text="Наши менеджеры свяжутся с вами в ближайшее время."
                btn={<Button text="На главную" btnStyle="outline" link="/"/>}
            />
        </>
    )
}

export default SuccessPage