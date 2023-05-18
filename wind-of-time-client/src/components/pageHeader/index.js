import c from './styles.module.scss'
import Container from '../container'

const PageHeader = ({title = '', afterTitle = '', after = null}) => {
    return (
        <div className={c.pageHeader}>
            <Container>
                <div className={c.inner}>
                    <h1 className={[c.title, 'h4'].join(' ')}>{title}{afterTitle ? <span> {afterTitle}</span> : null}</h1>
                    {after ? <div className={c.after}>{after}</div> : null}
                </div>
            </Container>
        </div>
    )
}

export default PageHeader