import { useState } from 'react'
import c from './styles.module.scss'

const Quantity = (props) => {
    const {value = 1, min = 1, max = 50, onChange, size = 'normal'} = props
    const [dynamicValue, setDynamicValue] = useState(value)

    const setValue = (value) => {
        value = Math.max(Math.min(Number(value) || min, max), min)

        setDynamicValue(value)
        
        if(onChange) {
            onChange(value)
        }
    }

    return (
        <div className={[c.quantity, c[size]].join(' ')}>
            <button className={c.btn} onClick={() => setValue(dynamicValue - 1)}>-</button>
            <input
                className={c.input}
                value={dynamicValue}
                onChange={e => setDynamicValue(e.target.value)}
                onBlur={e => setValue(e.target.value)}
            />
            <button className={c.btn} onClick={() => setValue(dynamicValue + 1)}>+</button>
        </div>
    )
}

export default Quantity