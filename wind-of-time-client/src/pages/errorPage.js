import NotFound from "../components/notFound"
import { Helmet } from "react-helmet"

const ErrorPage = () => {
    return (
        <>
            <Helmet>
                <title>Ошибка</title>
                <meta name="description" content="Ничего не найдено"/>
            </Helmet>
            <NotFound />
        </>
    )
}

export default ErrorPage