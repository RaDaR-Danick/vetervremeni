import c from './styles.module.scss'
import Input from '../input'
import { useState } from 'react'
import { priceFormate } from '../../../utils/price'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { replaceAll } from '../../../utils/string'

const PriceSlider = ({min, max, value, onChange = null}) => {
    const minVal = value[0]
    const maxVal = value[1]
    const [minInput, setMinInput] = useState(priceFormate(minVal))
    const [maxInput, setMaxInput] = useState(priceFormate(maxVal))

    const clearValue = (value, type) => {
        let filtredValue = Number(replaceAll(value, /[^0-9]/gm, '')) || 0
        let res = [minVal, maxVal]

        if(type === 'min') {
            res[0] = Math.max(Math.min(maxVal, filtredValue), min)
        } else if (type === 'max') {
            res[1] = Math.min(Math.max(minVal, filtredValue), max)
        }

        setMinInput(priceFormate(res[0]))
        setMaxInput(priceFormate(res[1]))
        onChange(res)
    }

    return (
        <div className={c.sliderWrapper}>
            <div className={c.inputs}>
                <Input value={minInput} size="small" onChange={(e) => {setMinInput(e.target.value)}} onBlur={(e) => {clearValue(e.target.value, 'min')}}/>
                <div className={c.inputsSep}>-</div>
                <Input value={maxInput} size="small" onChange={(e) => {setMaxInput(e.target.value)}} onBlur={(e) => {clearValue(e.target.value, 'max')}}/>
            </div>
            <Slider
                range={true}
                defaultValue={[minVal, maxVal]}
                min={min}
                max={max}
                onAfterChange={(value) => {
                    setMinInput(priceFormate(value[0]))
                    setMaxInput(priceFormate(value[1]))
                    onChange(value)
                }}
            />
            <div className={c.labels}>
                <div className={c.label}>{priceFormate(min)}</div>
                <div className={c.label}>{priceFormate(max)}</div>
            </div>
        </div>
    )
}

export default PriceSlider