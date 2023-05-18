import { NavLink } from 'react-router-dom'
import c from './styles.module.scss'
import { priceFormate } from '../../utils/price'
import { quantityFormate } from '../../utils/quantity'
import { API_URL } from '../../http'
import { PRICE_HINT, PRICE_HINT_SHORT } from '../../config'
import Notranslate from '../notranslate'

const ProductsListItem = ({data}) => {
    const {price, quantity, product} = data
    const {id, image, name} = product
    const totalPrice = price * quantity

    return (
        <div className={c.item}>
            <NavLink end to={'/product/' + id} className={c.name}>
                <div className={c.image}>{image ? <img src={API_URL + image} alt={name}/> : <div className={[c.icon, 'icon-image'].join(' ')}></div>}</div>
                <div className={c.text}>
                    <div className={c.title}><Notranslate>{name}</Notranslate></div>
                    <div className={c.label}>Цена за ед: {price ? priceFormate(price) : PRICE_HINT}</div>
                </div>
            </NavLink>
            <div className={c.quantity}>
                <div className={c.title}>{quantityFormate(quantity)}</div>
                <div className={c.label}>Кол-во</div>
            </div>
            <div className={c.price}>
                <div className={c.title}>{totalPrice ? priceFormate(totalPrice) : PRICE_HINT_SHORT}</div>
                <div className={c.label}>Стоимость</div>
            </div>
        </div>
    )
}

const ProductsList = ({items}) => {
    return (
        <div className={c.list}>
            {items.map(item => <ProductsListItem key={item.id} data={item}/>)}
        </div>
    )
}

export default ProductsList