import c from './styles.module.scss'
import { NavLink } from 'react-router-dom'

const DropdownItem = ({icon = null, text = '', link = null, onClick = null, active = false}) => {
    const inner = (
        <div className={c.itemInner}>
            {icon ? <div className={[c.icon, 'icon-' + icon].join(' ')}></div> : ''}
            {text ? <div className={c.text}>{text}</div> : null}
        </div>
    )

    if(link) {
        return <NavLink end to={link} className={[c.item, active ? c.active : null].join(' ')}>{inner}</NavLink>
    } else {
        return <div className={[c.item, active ? c.active : null].join(' ')} onClick={onClick}>{inner}</div>
    }
}

const Dropdown = (props) => {
    const {items} = props

    return (
        <div className={c.dropdown}>
            {items.map((item, index) => <DropdownItem key={index} {...item}/>)}
        </div>
    )
}

export default Dropdown