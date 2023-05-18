import c from '../input/styles.module.scss'

const Select = (props) => {
    const {value = '', items = [], disabled = false, onChange = null} = props
    const options = items.map(({value, text}) => {
        return <option key={value} value={value}>{text}</option>
    })

    return (
        <div className={c.wrapper}>
            <div className={[c.afterIcon, 'icon-select'].join(' ')}></div>
            <select
                value={value}
                className={c.input}
                disabled={disabled}
                onChange={(e) => {
                    if(onChange) {
                        onChange(e.target.value)
                    }
                }}
            >{options}</select>
        </div>
    )
}

export default Select