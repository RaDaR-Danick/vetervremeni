import c from './styles.module.scss'
import { PHONE, CLEAR_PHONE, EMAIL } from '../../config'

const Contacts = () => {
    return (
        <div className={c.contacts}>
            <a href={'tel:+' + CLEAR_PHONE} className={c.contactsPhone}>{PHONE}</a>
            <a href={'mailto:' + EMAIL} className={c.contactsEmail}>{EMAIL}</a>
        </div>
    )
}

export default Contacts