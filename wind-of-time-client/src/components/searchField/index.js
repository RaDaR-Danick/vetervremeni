import { useState } from "react"
import Input from "../UI/input"
import { useNavigate } from "react-router-dom"
import { CloseMenu } from "../mobileMenu"
import ClickOutside from "../clickOutside"
import c from './styles.module.scss'
import ProductController from "../../controllers/productController"
import { NavLink } from "react-router-dom"
import { priceFormate, calcPrice } from "../../utils/price"
import { API_URL } from "../../http"
import { useSelector } from "react-redux"
import { PRICE_HINT } from "../../config"
import Notranslate from "../notranslate"

const ResultsItem = ({data, onClick}) => {
    const city = useSelector(store => store.city.selected)
    const { id, name, price, oldPrice, image } = data
    let quantity = 0

    if(data.product_availabilities.length) {
        for(let item of data.product_availabilities) {
            if(item.cityId === city) {
                quantity = item.quantity
            }
        }
    }

    return (
        <NavLink end to={'/product/' + id} className={c.item} onClick={onClick}>
            <div className={c.image}>
                {image ? <img src={API_URL + image} alt={name} /> : <div className={[c.noImage, 'icon-image'].join(' ')}></div>}
            </div>
            <div className={c.text}>
                <div className={c.title}><Notranslate>{name}</Notranslate></div>
                <div className={c.meta}>
                    <div className={c.price}>
                        {oldPrice ? <span className={c.oldPrice}>{priceFormate(oldPrice)}</span> : null}
                        {price ? priceFormate(price) : PRICE_HINT}
                    </div>
                    <div className={c.availability}>Наличие: {quantity ? 'есть' : 'нет'}</div>
                </div>
            </div>
        </NavLink>
    )
}

const SearchField = () => {
    const [value, setValue] = useState('')
    const [show, setShow] = useState(false)
    const [results, setResults] = useState([])
    const navigate = useNavigate()
    const { user, withoutDocuments } = useSelector(store => store.auth)

    let timer = null

    const valueChanged = async (value) => {
        if(timer !== null) {
            clearTimeout(timer)
            timer = null
        }

        if(value) {
            timer = setTimeout(async () => {
                const getProducts = await ProductController.getAll({
                    limit: 5,
                    search: value
                })

                setResults(getProducts.data.rows)
            }, 500)

            setShow(true)
        } else {
            setShow(false)
        }

        setValue(value)
    }

    const onProductClick = () => {
        setValue('')
        setShow('')
        setResults('')
        CloseMenu()
    }

    return (
        <ClickOutside onClick={() => {
            setShow(false)
        }}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    CloseMenu()
                    navigate(`/search/${value}`)
                }}
                className={c.form}
            >
                <Input
                    placeholder="Введите запрос"
                    icon="search"
                    value={value}
                    onChange={(e) => valueChanged(e.target.value)}
                />
                <div className={[c.results, show && results.length ? c.show : false].join(' ')}>
                    {
                        results.length ?
                        results.map(item => <ResultsItem key={item.id} data={calcPrice(item, user, withoutDocuments)} onClick={onProductClick}/>) : null
                    }
                </div>
            </form>
        </ClickOutside>
    )
}

export default SearchField