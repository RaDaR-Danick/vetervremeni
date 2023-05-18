import c from './styles.module.scss'
import { priceFormate } from '../../utils/price'
import Button from '../UI/button'
import IconsList from '../iconList'
import ParamsList from '../paramsList'
import Container from '../container'
import { API_URL } from '../../http'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import CartController from '../../controllers/cartController'
import { useSelector } from 'react-redux'
import { PRICE_HINT } from '../../config'
import Notranslate from '../notranslate'
import { quantityFormate } from '../../utils/quantity' 

const ProductInfo = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false)
    const city = useSelector(store => store.city.selected)
    const user = useSelector(store => store.auth.user)
    const options = {
        id: data.id,
        image: data.image ? API_URL + data.image : null,
        title: data.name,
        vendor: data.slug,
        quantity: 0,
        brand: data.brand,
        price: data.price,
        oldPrice: data.oldPrice,
        params: data.attributes
    }
    const discount = options.oldPrice ? 100 - Math.round((options.price / options.oldPrice) * 100) : 0

    if (data.product_availabilities.length) {
        for (let item of data.product_availabilities) {
            if (item.cityId === city) {
                options.quantity = item.quantity
            }
        }
    }

    return (
        <section className={c.productInfo}>
            <Container>
                <div className={c.inner}>
                    <div className={c.image}>
                        {options.image ? <img src={options.image} alt={options.title} /> : <div className={[c.noImage, 'icon-image'].join(' ')}></div>}
                    </div>
                    <div className={c.content}>
                        <div className={c.header}>
                            {options.brand ? <NavLink to={options.brand.link} className={c.brand}><Notranslate>{options.brand.name}</Notranslate></NavLink> : null}
                            <h1 className={[c.title, 'h3'].join(' ')}><Notranslate>{options.title}</Notranslate></h1>
                            <div className={c.meta}>
                                <div className={c.metaItem}>Наличие: {options.quantity ? <span>{user.wholesaler ? quantityFormate(options.quantity) : 'есть'}</span> : <span className="orangeTheme">нет</span>}</div>
                                <div className={c.metaItem}>Артикул: {options.vendor}</div>
                            </div>
                        </div>

                        <hr />

                        <div className={c.priceBlock}>
                            <div className={[c.subtitle, 'subtitle'].join(' ')}>Стоимость и покупка</div>

                            <div className={c.orderBlock}>
                                <div className={[c.price, !options.price ? c.small : null].join(' ')}>
                                    <div className={c.top}>
                                        {discount ? <div className={c.tag}>-{discount}%</div> : null}
                                        {options.oldPrice ? <span className={c.oldPrice}>{priceFormate(options.oldPrice)}</span> : null}
                                    </div>
                                    {options.price ? priceFormate(options.price) : PRICE_HINT}
                                </div>
                                {
                                    options.quantity ?
                                        <Button
                                            text="Добавить в корзину"
                                            loading={isLoading}
                                            onClick={async () => {
                                                setIsLoading(true)
                                                await CartController.addToCart(options.id)
                                                setIsLoading(false)
                                            }}
                                        /> :
                                        <Button text="Нет в наличии" disabled={true} />
                                }
                            </div>

                            <IconsList items={[
                                {
                                    icon: 'planet',
                                    text: 'Международная гарантия'
                                },
                                {
                                    icon: 'package',
                                    text: 'Бесплатная доставка'
                                },
                            ]} />
                        </div>

                        <hr />

                        <div className={c.options}>
                            <div className={[c.subtitle, 'subtitle'].join(' ')}>Характеристики</div>
                            <ParamsList items={options.params} />
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    )
}

export default ProductInfo