import c from './styles.module.scss'

const EmptyBlock = (props) => {
    const {icon = 'error', text = '', size = 'primary', padding = false} = props

    return (
        <div className={[c.block, c[size], padding ? c.padding : null].join(' ')}>
            <div className={[c.icon, 'icon-' + icon].join(' ')}></div>
            <div className={c.text}>{text}</div>
        </div>
    )
}

export default EmptyBlock