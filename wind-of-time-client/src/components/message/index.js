import c from './styles.module.scss'

const MessageInner = ({text}) => {
    let textEl

    if(text) {
        textEl = <div className={c.text}>{text}</div>
    }

    return <div className={c.inner}>{textEl}</div>
}

const Message = (props) => {
    const { text = '', status = 'info', onClose = null } = props
    
    return (
        <div className={[c.wrapper, c[status]].join(' ')}>
            <div className={[c.icon, 'icon-' + status].join(' ')}></div>
            <MessageInner text={text}/>
            {onClose ? <div className={[c.closeBtn, 'icon-close'].join(' ')} onClick={onClose}></div> : null}
        </div>
    )
}

export default Message