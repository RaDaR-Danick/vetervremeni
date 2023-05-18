import c from './styles.module.scss'
import Container from '../container'
import Button from '../UI/button'
import { priceFormate } from '../../utils/price'
import { API_URL } from '../../http'
import { useSelector } from 'react-redux'
import CartController from '../../controllers/cartController'
import { useState } from 'react'
import { PRICE_HINT } from '../../config'
import Notranslate from '../notranslate'

const ProductInfoRow = ({data}) => {
    const [isLoading, setIsLoading] = useState(false)
    const city = useSelector(store => store.city.selected)
    const options = {
        id: data.id,
        image: data.image ? API_URL + data.image : null,
        title: data.name,
        vendor: data.slug,
        quantity: 0,
        price: data.price,
        oldPrice: data.oldPrice,
    }

    if(data.product_availabilities.length) {
        for(let item of data.product_availabilities) {
            if(item.cityId === city) {
                options.quantity = item.quantity
            }
        }
    }

    return (
        <section className={c.section}>
            <Container>
                <div className={c.inner}>
                    <div className={c.info}>
                        {options.image ? <div className={c.image}><img src={options.image} alt={options.title}/></div> : null}
                        <div className={c.text}>
                            <div className={c.name}><Notranslate>{options.title}</Notranslate></div>
                            <div className={c.meta}>
                                <div className={c.metaItem}>Наличие: {options.quantity ? <span>есть</span> : <span className="orangeTheme">нет</span>}</div>
                                <div className={[c.metaItem, c.hideMobile].join(' ')}>Артикул: {options.vendor}</div>
                            </div>
                        </div>
                    </div>
                    <div className={c.price}>
                        { options.oldPrice ? <span className={c.oldPrice}>{priceFormate(options.oldPrice)}</span> : null }
                        { options.price ? priceFormate(options.price) : PRICE_HINT }
                    </div>
                    {options.quantity ?
                    <Button 
                        text="Добавить"
                        loading={isLoading}
                        onClick={async () => {
                            setIsLoading(true)
                            await CartController.addToCart(options.id)
                            setIsLoading(false)
                        }}
                    />
                    : <Button text="Нет в наличии" disabled size="smaller"/>}
                </div>
            </Container>
        </section>
    )
}

export default ProductInfoRow