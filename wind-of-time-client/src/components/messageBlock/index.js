import c from './styles.module.scss'
import Container from '../container'

const MessageBlock = ({status = 'info', title, text, btn}) => {
    return (
        <section className={c.block}>
            <Container>
                <div className={c.inner}>
                    <div className={[c.icon, c[status], 'icon-' + status].join(' ')}></div>
                    <div className={c.title}>{title}</div>
                    <div className={c.text}>{text}</div>
                    {btn ? <div className={c.btnWrapper}>{btn}</div> : null}
                </div>
            </Container>
        </section>
    )
}

export default MessageBlock