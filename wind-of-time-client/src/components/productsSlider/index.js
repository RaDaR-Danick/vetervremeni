import c from './styles.module.scss'
import Button from '../UI/button'
import { useEffect, useRef, useState } from 'react'
import Product from '../product'
import Spinner from '../spinner'
import EmptyBlock from '../emptyBlock'
import Container from '../container'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper'
import 'swiper/css'
import ProductController from '../../controllers/productController'
import { useSelector } from 'react-redux'
import { calcPrice } from '../../utils/price'

const ProductsSlider = (props) => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const prevBtn = useRef()
    const nextBtn = useRef()
    const scrollbar = useRef()
    const options = {}
    const {title, params = {}, link = '', city} = props
    const { user, withoutDocuments } = useSelector(store => store.auth)

    if(!params.limit) {
        params.limit = 15
    }
    options.title = title

    if(city) {
        params.city = city
    }

    const fetchData = async () => {
        const response = await ProductController.getAll(params)

        if(response.success) {
            setProducts(response.data.rows)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [city])

    return (
        <section className="sectionPadding__small">
            <Container>
                {
                    loading ? <Spinner/> :
                    products.length ?
                    <div className={c.inner}>
                        <div className={c.header}>
                            <div className={[c.title, 'h2'].join(' ')}>{options.title}</div>
                            <div className={c.rightHeader}>
                                {link ? (
                                    <>
                                        <Button text="Смотреть все" afterIcon="right" btnStyle="outline" link={link}/>
                                        <div className={c.sep}></div>
                                    </>
                                ) : null}
                                <div className={c.arrows}>
                                    <Button ref={prevBtn} icon="arrow-left" btnStyle="outline"/> 
                                    <Button ref={nextBtn} icon="arrow-right" btnStyle="outline"/>  
                                </div>
                            </div>
                        </div>
                        <div className={c.sliderWrapper}>
                            <div ref={scrollbar} className={c.scrollbar}></div>
                            <Swiper
                                slidesPerView={2}
                                modules={[Navigation, Scrollbar]}
                                navigation={{
                                    prevEl: prevBtn.current,
                                    nextEl: nextBtn.current,
                                }}
                                onBeforeInit={(swiper) => {
                                    swiper.params.navigation.prevEl = prevBtn.current
                                    swiper.params.navigation.nextEl = nextBtn.current
                                    swiper.params.scrollbar.el = scrollbar.current
                                }}
                                scrollbar={{
                                    el: scrollbar,
                                    dragClass: c.scrollbarDrag,
                                    horizontalClass: c.scrollbarLine,
                                    draggable: true
                                }}
                                spaceBetween={24}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2
                                    },
                                    1200: {
                                        slidesPerView: 5
                                    },
                                }}
                            >
                                {products.map(item => <SwiperSlide key={item.id}><Product data={calcPrice(item, user, withoutDocuments)}/></SwiperSlide>)}
                            </Swiper>
                        </div>
                    </div> :
                    <EmptyBlock icon="error" text="Ничего не найдено"/>
                }
            </Container>
        </section>
    )
}

export default ProductsSlider