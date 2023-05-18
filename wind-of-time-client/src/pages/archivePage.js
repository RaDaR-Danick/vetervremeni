import { useState } from "react"
import PageHeader from "../components/pageHeader"
import ProductsArchive from "../components/productsArchive"
import Breadcrumbs from "../components/breadcrumbs"
import { Helmet } from "react-helmet"
import ArchiveSort from "../components/archiveSort"

const ArchivePage = () => {
    const [show, setShow] = useState(false)
    const [count, setCount] = useState(0)
    const [sort, setSort] = useState(localStorage.getItem('sort') || '')

    let countLabel = count

    if (count == 1) {
        countLabel += ' товар'
    } else if (count > 1 && count < 5) {
        countLabel += ' товара'
    } else {
        countLabel += ' товаров'
    }

    return (
        <>
            <Helmet>
                <title>Каталог товаров - Ветер времени</title>
                <meta name="description" content="Онлайн магазин часов" />
            </Helmet>
            <Breadcrumbs path={[
                { text: 'Каталог' }
            ]} />
            <PageHeader
                title="Каталог товаров"
                afterTitle={count ? `(${countLabel})` : null}
                after={<ArchiveSort sort={sort} setSort={setSort} setShow={setShow} />}
            />
            <ProductsArchive onCountUpdate={setCount} sort={sort} show={show} setShow={setShow} />
        </>
    )
}

export default ArchivePage