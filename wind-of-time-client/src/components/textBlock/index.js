import c from './styles.module.scss'
import Container from '../container'

const Block = ({image = '', alt= '', content = ''}) => {
    return (
        <div className={c.block}>
            {image ? <div className={c.image}><img src={image} alt={alt}/></div> : null}
            <div className={[c.content, 'margin__smaller'].join(' ')}>{content}</div>
        </div>
    )
}

const TextBlock = ({blocks}) => {
    return (
        <section className="sectionPadding__small">
            <Container>
                <div className={c.inner}>
                    {blocks.map( (item, index) => <Block key={index} {...item}/> )}
                </div>
            </Container>
        </section>
    )
}

export default TextBlock