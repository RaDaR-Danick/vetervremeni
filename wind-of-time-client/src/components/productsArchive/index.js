import c from './styles.module.scss'
import Product from '../product'
import Button from '../UI/button'
import Filters from '../filters'
import Container from '../container'
import { useEffect, useState } from 'react'
import ProductController from '../../controllers/productController'
import Spinner from '../spinner'
import EmptyBlock from '../emptyBlock'
import { scrollToTop } from '../../utils/scroll'
import { useSelector } from 'react-redux'
import { calcPrice } from '../../utils/price'

const ProductsArchive = (props) => {
    const city = useSelector(store => store.city.selected)
    const { user } = useSelector(store => store.auth)
    const { onCountUpdate, sort, show, setShow } = props
    const [loading, setLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [min, setMin] = useState(null)
    const [max, setMax] = useState(null)
    const [archiveMin, setArchiveMin] = useState(0)
    const [archiveMax, setArchiveMax] = useState(0)
    const [ids, setIds] = useState([])
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const searchParams = new URL(window.location.href).searchParams
    const [inited, setInited] = useState(false)
    let startFilters = {}
    let sortOptions = [['createdAt', 'asc']]

    if (searchParams && !inited) {
        const min = searchParams.get('min')
        const max = searchParams.get('max')
        const filters = searchParams.get('filters')

        if (min) {
            setMin(min)
        }

        if (max) {
            setMax(max)
        }

        if (filters) {
            let newFilters = {}
            const explodedFilters = filters.split(';')

            for (let filter of explodedFilters) {
                let item = filter.split(':')
                let values = item[1].split(',')
                newFilters[item[0]] = values.map(value => Number(value))
            }

            startFilters = newFilters
        }

        setInited(true)
    }

    const [filters, setFilters] = useState(startFilters)

    if (sort === 'price_asc') {
        sortOptions = [['price', 'asc'], ['createdAt', 'asc']]
    } else if (sort === 'price_desc') {
        sortOptions = [['price', 'desc'], ['createdAt', 'asc']]
    }

    const updateArchive = async () => {
        setShow(false)
        setLoading(true)
        fetchData()
        scrollToTop()
    }

    const loadMore = async () => {
        setBtnLoading(true)
        const city = Number(localStorage.getItem('city')) || 0
        const getProducts = await ProductController.getAll({
            filters,
            min,
            max,
            sort: sortOptions,
            page: page + 1,
            city
        })
        const { rows } = getProducts.data

        setPage(page + 1)
        setProducts([...products, ...rows])
        setBtnLoading(false)
    }

    const fetchData = async () => {
        const city = Number(localStorage.getItem('city')) || 0
        const getProducts = await ProductController.getAll({
            filters,
            min,
            max,
            sort: sortOptions,
            city
        })
        const { rows, pages, count, ids } = getProducts.data

        setPage(1)
        setProducts(rows)
        setPages(pages)
        setLoading(false)
        setBtnLoading(false)
        onCountUpdate(count)
        setIds(ids)
    }

    useEffect(() => {
        updateArchive()
    }, [filters, sort, city])

    return (
        <section className={c.archive}>
            {!show ? <div className={[c.toggleFilters, 'icon-filters'].join(' ')} onClick={() => { setShow(true) }}></div> : null}

            <Container>
                <div className={c.inner}>
                    <div className={c.sidebar}>
                        <div className={[c.mobileFilters, show ? c.show : null].join(' ')}>
                            <div className={c.mobileFiltersHeader}>
                                <Container>
                                    <div className={c.mobileFiltersHeaderInner}>
                                        <div className="h4">Фильтры</div>
                                        <Button icon="close" btnStyle="outline" size="smaller" onClick={() => { setShow(false) }} />
                                    </div>
                                </Container>
                            </div>
                            <div className={c.mobileFiltersBody}>
                                <Container>
                                    <div className={c.mobileFiltersBodyInner}>
                                        {
                                            loading ? <Spinner padding={true} /> :
                                                <Filters
                                                    filters={filters}
                                                    setFilters={setFilters}
                                                    ids={ids}
                                                    min={min}
                                                    max={max}
                                                    setMin={setMin}
                                                    setMax={setMax}
                                                    archiveMin={archiveMin}
                                                    archiveMax={archiveMax}
                                                    setArchiveMin={setArchiveMin}
                                                    setArchiveMax={setArchiveMax}
                                                    updateArchive={updateArchive}
                                                />
                                        }
                                    </div>
                                </Container>
                            </div>
                        </div>
                    </div>
                    <div className={c.body}>
                        {
                            loading ? <Spinner padding={true} /> :
                                (
                                    products.length ? (
                                        <>
                                            <div className={c.productsGrid}>
                                                {products.map(item => <Product key={item.id} data={calcPrice(item, user)} />)}
                                            </div>
                                            {page < pages ? <div className={c.loadMoreWrapper}><Button text="Загрузить еще" beforeIcon="loading" loading={btnLoading} onClick={loadMore} /></div> : null}
                                        </>
                                    ) : <EmptyBlock icon="inbox" text="Ничего не найдено" padding={true} />
                                )
                        }
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default ProductsArchive