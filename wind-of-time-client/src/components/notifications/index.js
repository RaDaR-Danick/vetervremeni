import c from './styles.module.scss'
import NotificationItem from '../notificationsItem'
import { useSelector } from 'react-redux'

const Notifications = () => {
    const notifs = useSelector(store => store.notif.notifs)

    return (
        <div className={c.notifications}>
            { notifs.map(item => <NotificationItem key={item.id} {...item}/>) }
        </div>
    )
}

export default Notifications