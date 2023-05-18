import c from './styles.module.scss'
import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import CityController from '../../controllers/cityController'
import DropdownBlock from '../dropdownBlock'

const SelectCity = () => {
    const [cities, setSities] = useState([])
    const city = useSelector(store => store.city.selected)
    const selected = useMemo(() => {

        if(cities.length) {
            if(city) {
                for(let item of cities) {
                    if(item.id == city) {
                        return item
                    }
                }
            } else {
                return cities[0]
            }
        }
        
        return {id: '', name: 'Загрузка'}
    }, [city, cities])

    const fetchData = async () => {
        const getCities = await CityController.getAll()
        let newCities = []

        for(let item of getCities.data) {
            const {id, name} = item
            newCities.push({id, name})
        }

        setSities(newCities)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <DropdownBlock
            items={cities.map(item => {
                const itemObj = {}

                itemObj.text = item.name
                itemObj.active = item.id === city
                itemObj.onClick = () => {
                    CityController.setCity(item.id)
                }

                return itemObj
            })}
        >
            <div className={c.selectCity}>
                <div className={c.currentCity}>
                    <div className={[c.icon, 'icon-place'].join(' ')}></div>
                    <div className={c.text}>{selected.name}</div>
                    <div className={[c.arrow, 'icon-select'].join(' ')}></div>
                </div>
            </div>
        </DropdownBlock>
    )
}

export default SelectCity