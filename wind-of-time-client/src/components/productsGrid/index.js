import c from './styles.module.scss'
import Container from '../container'
import { useState } from 'react'
import ProductController from '../../controllers/productController'
import { useEffect } from 'react'
import EmptyBlock from '../emptyBlock'
import Spinner from '../spinner'
import Product from '../product'
import Button from '../UI/button'

const ProductsGrid = ({params}) => {
    const [loading, setLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [limit] = useState(20)
    const [pages, setPages] = useState(1)

    const fetchData = async () => {
        setLoading(true)
        setBtnLoading(true)
        const products = await ProductController.getAll({...params, limit, page})
        const {rows, pages} = products.data
        setData(rows)
        setPages(pages)
        setPage(1)
        setLoading(false)
        setBtnLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [params])

    const loadMore = async () => {
        setBtnLoading(true)
        const products = await ProductController.getAll({...params, limit, page: page + 1})
        const {rows, pages} = products.data

        setData([...data, ...rows])
        setPages(pages)
        setPage(page + 1)
        setBtnLoading(false)
    }

    return (
        <section className={c.section}>
            <Container>
                <div className={c.inner}>
                    {
                        loading ?
                        <Spinner padding={true}/> :
                        data.length ?
                        <>
                            <div className={c.grid}>
                                {data.map(item => <Product key={item.id} data={item}/>)}
                            </div>
                            {page < pages ? <div className={c.loadMoreWrapper}><Button text="Загрузить еще" beforeIcon="loading" loading={btnLoading} onClick={loadMore}/></div> : null}
                        </> :
                        <EmptyBlock icon="error" text="Ничего не найдено" padding={true}/>
                    }
                </div>
            </Container>
        </section>
    )
}

export default ProductsGrid