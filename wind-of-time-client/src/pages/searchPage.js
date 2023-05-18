import { useParams } from "react-router-dom"
import PageHeader from "../components/pageHeader"
import ProductsGrid from "../components/productsGrid"
import { Helmet } from "react-helmet"

const SearchPage = () => {
    const {query} = useParams()

    return (
        <>
            <Helmet>
                <title>Поиск по запросу: {query} - Ветер времени</title>
                <meta name="description" content="Онлайн магазин часов"/>
            </Helmet>
            <PageHeader
                title="Поиск по запросу: "
                afterTitle={query}
            />
            <ProductsGrid params={{
                search: query
            }}/>
        </>
    )
}

export default SearchPage