import { useState } from 'react'
import c from './styles.module.scss'
import Quantity from '../UI/quantity'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EmptyBlock from '../emptyBlock'
import { priceFormate, calcPrice } from '../../utils/price'
import { API_URL } from '../../http'
import CartController from '../../controllers/cartController'
import { PRICE_HINT } from '../../config'
import Notranslate from '../notranslate'
import { quantityFormate } from '../../utils/quantity'

const SortLabel = ({ id, text, sort, sortDirection, setSort, setSortDirection }) => {
    const isActive = id === sort

    return (
        <div className={[c[id], c.label].join(' ')} onClick={() => {
            setSort(id)

            if (isActive) {
                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
            } else {
                setSortDirection('asc')
            }
        }}>
            <div className={c.text}>{text}</div>
            <div className={c.arrows}>
                <div className={[c.arrow, 'icon-up', isActive && sortDirection === 'asc' ? c.active : null].join(' ')}></div>
                <div className={[c.arrow, 'icon-down', isActive && sortDirection === 'desc' ? c.active : null].join(' ')}></div>
            </div>
        </div>
    )
}

const CartProductsItem = ({ data, city }) => {
    const { id, name, quantity, price, oldPrice, slug, image } = data
    let maxQuantity = 0
    let timer

    if(data.product_availabilities.length) {
        for(let item of data.product_availabilities) {
            if(item.cityId === city) {
                maxQuantity = item.quantity
            }
        }
    }

    return (
        <div className={c.item}>
            <div className={c.inner}>
                <NavLink end to={'/product/' + id} className={c.name}>
                    <div className={c.image}>
                        {image ? <img src={API_URL + image} alt={name} /> : <div className={[c.noImage, 'icon-image'].join(' ')}></div>}
                    </div>
                    <div className={c.textWrapper}>
                        <div className={c.title}><Notranslate>{name}</Notranslate></div>
                        <div className={c.vendor}>Артикул: {slug}</div>
                    </div>
                </NavLink>
                <div className={c.quantity}>
                    <Quantity
                        size="smaller"
                        value={quantity}
                        onChange={quantity => {
                            if(timer) {
                                timer = clearTimeout(timer)
                            }

                            timer = setTimeout(() => {
                                CartController.setQuantity(id, quantity)
                            }, 500)
                        }}
                        max={maxQuantity}
                    />
                </div>
                <div className={c.price}>
                    {oldPrice ? <span className={c.oldPrice}>{priceFormate(oldPrice)}</span> : null}
                    {price ? priceFormate(price) : PRICE_HINT}
                </div>
                <div className={c.action}>
                    <div 
                        className={[c.removeBtn, 'icon-close'].join(' ')}
                        onClick={() => {
                            CartController.removeItem(id)
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

const CartProducts = () => {
    const city = useSelector(store => store.city.selected)
    const [sort, setSort] = useState(null)
    const [sortDirection, setSortDirection] = useState(null)
    const { added, products } = useSelector(store => store.cart)
    const { user, withoutDocuments } = useSelector(store => store.auth)
    const sortLabels = [
        {
            id: 'name',
            text: 'Наименование'
        },
        {
            id: 'quantity',
            text: 'Количество'
        },
        {
            id: 'price',
            text: 'Цена'
        },
    ]
    let data = []

    for (let item of added) {
        const { id, quantity } = item

        if (products[id]) {
            const product = calcPrice(products[id], user, withoutDocuments)
            data.push({ ...product, quantity, price: product.price * quantity })
        }
    }

    if (sort) {
        data.sort((a, b) => {
            const aValue = sort === 'name' ? a[sort] : parseInt(a[sort])
            const bValue = sort === 'name' ? b[sort] : parseInt(b[sort])

            if (sortDirection === 'desc') {
                if (aValue < bValue)
                    return -1
                if (aValue > bValue)
                    return 1
                return 0
            } else {
                if (aValue < bValue)
                    return 1
                if (aValue > bValue)
                    return -1
                return 0
            }
        })
    }

    return (
        <div className={c.products}>
            <div className={c.header}>
                {sortLabels.map(label => <SortLabel key={label.id} {...label} sort={sort} setSort={setSort} sortDirection={sortDirection} setSortDirection={setSortDirection} />)}
            </div>
            <div className={c.body}>
                {
                    data.length ?
                        data.map(item => <CartProductsItem key={item.id} data={item} city={city} />)
                        : <EmptyBlock icon="error" text="Нет товаров" padding={true} />
                }
            </div>
        </div>
    )
}

export default CartProducts