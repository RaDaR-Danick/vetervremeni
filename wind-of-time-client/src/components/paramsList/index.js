import c from './styles.module.scss'

const Item = ({title, value, large}) => {
    return (
        <div className={[c.item, large ? c.large : null].join(' ')}>
            <div className={c.title}>{title}</div>
            <div className={c.line}></div>
            <div className={c.value}>{value}</div>
        </div>
    )
}

const ParamsList = ({items, two = false}) => {
    return (
        <div className={[c.list, two ? c.two : null].join(' ')}>
            <div className={c.inner}>
                {items.map((item, index) => <Item key={index} {...item}/>)}
            </div>
        </div>
    )
}

export default ParamsList