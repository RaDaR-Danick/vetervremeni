import c from './styles.module.scss'

const Item = ({icon, text}) => {
    return (
        <div className={c.item}>
            <div className={[c.icon, 'icon-' + icon].join(' ')}></div>
            <div className={c.text}>{text}</div>
        </div>
    )
}

const IconsList = ({items}) => {
    return (
        <div className={c.list}>
            {items.map((item, index) => <Item key={index} {...item}/>)}
        </div>
    )
}

export default IconsList