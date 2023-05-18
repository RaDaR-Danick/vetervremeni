import c from './styles.module.scss'

const Switcher = (props) => {
    const options = {
        classes: [c.switcher],
        inner: null
    }
    const {value = '', variants = [], size = 'normal', onChange = null, full = false, grow = false} = props
    const active = value

    if(full) {
        options.classes.push(c.full)
    }

    options.classes.push(c[size])
    options.inner = variants.map((item, index) => {
        const {key, text, icon} = item
        const itemInner = icon ? <span className={[c.icon, 'icon-' + icon].join(' ')}></span> : <span className={c.text}>{text}</span>
        let itemClasses = [c.item, key === value ? c.active : null, grow ? c.grow : null]

        return (
            <div
                className={itemClasses.join(' ')}
                key={key}
                onClick={() => {
                    if(onChange && key !== active) {
                        onChange(key)
                    }
                }}
            >{itemInner}</div>
        )
    })

    return (
        <div className={options.classes.join(' ')}>
            <div className={c.innerWrapper}>
                {options.inner}
            </div>
        </div>
    )
}

export default Switcher