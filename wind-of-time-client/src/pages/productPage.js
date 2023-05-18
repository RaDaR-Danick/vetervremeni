import ProductInfo from "../components/productInfo"
import ProductsSlider from "../components/productsSlider"
import ProductInfoRow from "../components/productInfoRow"
import { useEffect, useState } from "react"
import Spinner from "../components/spinner"
import EmptyBlock from "../components/emptyBlock"
import ProductController from "../controllers/productController"
import { useParams } from "react-router-dom"
import { scrollToTop } from "../utils/scroll"
import Breadcrumbs from "../components/breadcrumbs"
import HelpBlock from "../components/helpBlock"
import { calcPrice } from "../utils/price"
import { useSelector } from "react-redux"
import { Helmet } from "react-helmet"

const ProductPage = () => {
    const [loading, setLoaing] = useState(true)
    const [data, setData] = useState(null)
    const {slug} = useParams()
    const breadPath = data ? [{text: 'Каталог', link: '/products'}, {text: data.name}] : [{text: 'Каталог', link: '/products'}]
    const bread = <Breadcrumbs path={breadPath}/>
    const { user, withoutDocuments } = useSelector(store => store.auth)

    const fetchData = async () => {
        setLoaing(true)
        const response = await ProductController.getOne(slug)
        const {data, success} = response

        if(success) {
            setData(calcPrice(data, user, withoutDocuments)) 
        }

        setLoaing(false)
    }

    useEffect(() => {
        fetchData()
        scrollToTop()
    }, [slug, user])

    if(loading) {
        return (<>{bread}<Spinner padding={true}/></>)
    } else {
        return data.id ? (
            <>
                <Helmet>
                    <title>Купить {data.name}</title>
                </Helmet>
                {bread}
                <ProductInfo data={data}/>
                <ProductInfoRow  data={data}/>
                <HelpBlock border="bottom"/>
                <ProductsSlider
                    params={{
                        filters: data.brand ? {[data.brand.filterId]: [data.brand.valueId]} : null,
                        exception: [data.id],
                        rand: true
                    }}
                    title="Также рекомендуем"
                />
            </>
        ) :
        <>
            <Helmet>
                <title>Товар не найден</title>
            </Helmet>
            <EmptyBlock icon="error" text="Товар не найден" padding={true}/>
        </>
    }
}

export default ProductPage