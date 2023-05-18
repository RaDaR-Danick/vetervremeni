import c from './styles.module.scss'
import { NavLink } from 'react-router-dom'
import NotifController from '../../controllers/notifController'

const NotificationItem = (props) => {
    const {status = 'warning', title= '', text = '', link = '', id} = props

    const closeNotif = (e) => {
        e.preventDefault()
        
        NotifController.closeNotif(id)
    }
    
    const inner = (
        <div className={[c.inner, c[status]].join(' ')}>
            <div className={c.textWrapper}>
                { title ? <div className={c.title}>{title}</div> : null }
                { text ? <div className={c.text}>{text}</div> : null }
            </div>
            <div
                className={[c.close, 'icon-close'].join(' ')}
                onClick={closeNotif}
            ></div>
        </div>
    )

    if(link) {
        return <NavLink end to={link} className={c.item}>{inner}</NavLink>
    } else {
        return <div className={c.item}>{inner}</div>
    }
}

export default NotificationItem