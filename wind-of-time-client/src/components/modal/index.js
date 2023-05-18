import c from './styles.module.scss'
import Button from '../UI/button'

const Modal = ({show = false, children = null, onClose = null}) => {
    if(show) {
        return (
            <div className={[c.modal, c.show].join(' ')}>
                <div className={c.blackboard} onClick={onClose}></div>
                <div className={c.wrapper}>
                    <div className={c.content}>
                        <div className={c.closeBtn}>
                            <Button icon="close" size="small" btnStyle="grey" onClick={onClose}/>
                        </div>
                        <div className={c.inner}>{children}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default Modal