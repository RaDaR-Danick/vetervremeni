import c from './styles.module.scss'
import { priceFormate } from '../../utils/price'
import { API_URL } from '../../http'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PRICE_HINT } from '../../config'
import Notranslate from '../notranslate'

const Product = ({ data }) => {
    const city = useSelector(store => store.city.selected)
    const options = {
        image: data.image ? API_URL + data.image : null,
        title: data.name,
        price: data.price,
        oldPrice: data.oldPrice,
        link: `/product/${data.id}`,
        quantity: 0
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
        <NavLink end to={options.link} target="_blank" className={c.product}>
            <div className={c.image}>
                {discount ? <div className={c.tag}>-{discount}%</div> : null}
                {options.image ? <img src={options.image} loading="lazy" alt={options.title} /> : <div className={[c.noImage, 'icon-image'].join(' ')}></div>}
            </div>
            <div className={c.title}><Notranslate>{options.title}</Notranslate></div>
            {
                options.quantity ?
                    <div className={c.price}>
                        {options.oldPrice ? <div className={c.oldPrice}>{priceFormate(options.oldPrice)}</div> : null}
                        <div className={c.currentPrice}>{options.price ? priceFormate(options.price) : PRICE_HINT}</div>
                    </div> :
                    <div className={c.notAvailabel}>Нет в наличии</div>
            }
        </NavLink>
    )
}

export default Product