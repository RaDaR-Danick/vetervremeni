import { useEffect, useMemo, useState } from 'react'
import c from './styles.module.scss'
import Checkbox from '../UI/checkbox'
import PriceSlider from '../UI/priceSlider'
import Spinner from '../spinner'
import FiltersController from '../../controllers/filtersController'
import Button from '../UI/button'
import { useNavigate } from 'react-router-dom'

const FiltersGroup = ({ title, open = false, children, scroll = true }) => {
    const [isOpen, setIsOpen] = useState(open)

    return (
        <div className={[c.filtersGroup, isOpen ? c.show : null].join(' ')}>
            <div className={c.filtersGroupHeader} onClick={() => { setIsOpen(!isOpen) }}>
                <div className={c.text}>{title}</div>
                <div className={[c.arrow, 'icon-down'].join(' ')}></div>
            </div>
            <div className={[c.filtersGroupBody, scroll ? c.scroll : null].join(' ')}>{children}</div>
        </div>
    )
}

const CheckboxGroupItem = ({ data, checked = false, onChange = null }) => {
    return <Checkbox label={data.name} checked={checked} onChange={onChange} />
}

const CheckboxGroup = ({ data, applied, setApplied }) => {
    const { id, name } = data.data
    // const sort = [227098]
    let { children } = data

    let isOpen = false
    let checkboxes = []

    for (let item of Object.values(children)) {
        let checked = false

        if (applied[id] && applied[id].includes(item.id)) {
            checked = true
            isOpen = true
        }

        checkboxes.push(<CheckboxGroupItem key={item.id} data={item} checked={checked} onChange={(value) => {
            let newApplied = Object.assign(applied, {})

            if (!newApplied[id]) {
                newApplied[id] = []
            }

            if (value) {
                newApplied[id].push(item.id)
            } else {
                newApplied[id] = newApplied[id].filter(elem => elem !== item.id)

                if (!newApplied[id].length) {
                    delete newApplied[id]
                }
            }

            setApplied(newApplied)
        }} />)
    }

    return (
        <FiltersGroup title={name} open={isOpen}>{checkboxes}</FiltersGroup>
    )
}

const Filters = (props) => {
    const navigate = useNavigate()
    const { filters, setFilters, ids, min = 0, max = 0, setMin, setMax, archiveMin = 0, archiveMax = 0, setArchiveMin, setArchiveMax, updateArchive } = props
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const fetchData = async () => {
        const response = await FiltersController.getAll(ids, filters)
        const { minPrice, maxPrice, data } = response.data

        setArchiveMin(minPrice)
        setArchiveMax(maxPrice)
        setMin(min ? min : minPrice)
        setMax(max ? max : maxPrice)

        setData(data)
        setLoading(false)
    }
    const slider = useMemo(() => {
        return (
            <PriceSlider
                min={archiveMin}
                max={archiveMax}
                value={[Number(min) || 0, Number(max) || 0]}
                onChange={(value) => {
                    setMin(value[0])
                    setMax(value[1])
                }}
            />
        )
    }, [archiveMin, archiveMax, min, max])

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return <Spinner padding={true} />
    } else {
        return (
            <div className={c.filters}>
                <FiltersGroup title="Стоимость" open={true} scroll={false}>{slider}</FiltersGroup>
                {Object.values(data).map(item => {
                    return <CheckboxGroup key={item.data.id} data={item} applied={filters} setApplied={setFilters} />
                })}
                <div className={c.btns}>
                    <Button text="Применить" full={true} onClick={() => {
                        let params = []
                        let filtersString = []

                        if (Object.keys(filters).length) {
                            for (let key in filters) {
                                let value = filters[key]

                                filtersString.push(`${key}:${value.join(',')}`)
                            }

                            params.push(`filters=${filtersString.join(';')}`)
                        }

                        if (archiveMin !== min || archiveMax !== max) {
                            params.push(`min=${min}`)
                            params.push(`max=${max}`)
                        }

                        const url = '/products/?' + params.join('&')
                        navigate(url)

                        updateArchive()
                    }} />
                    <Button btnStyle="outline" full={true} text="Сбросить" onClick={() => {
                        const url = '/products/'
                        navigate(url)

                        setMin(null)
                        setMax(null)
                        setFilters({})
                    }}></Button>
                </div>
            </div>
        )
    }
}

export default Filters