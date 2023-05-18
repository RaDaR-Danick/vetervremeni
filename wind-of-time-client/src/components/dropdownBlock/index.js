import c from './styles.module.scss'
import Dropdown from '../dropdown'

const DropdownBlock = ({items, children}) => {
    const dropdown = <Dropdown items={items}/>

    return (
        <div className={c.block}>
            <div className={c.content}>{children}</div>
            <div className={c.dropdown}>{dropdown}</div>
        </div>
    )
}

export default DropdownBlock