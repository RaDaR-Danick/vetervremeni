import c from './styles.module.scss'
import image1 from '../../assets/images/man.webp'
import image2 from '../../assets/images/woman.webp'
import image3 from '../../assets/images/catalog.webp'
import Button from '../UI/button'
import Container from '../container'
import { NavLink } from 'react-router-dom'

const CategoriesGridCard = (props) => {
    const {image = '', title = '', text = '', link = ''} = props

    return (
        <NavLink end to={link} className={c.card}>
            <div className={c.image}><img src={image} alt={title}/></div>
            <div className={c.content}>
                <div className={c.title}>{title}</div>
                <div className={c.text}>{text}</div>
                <Button text="Подробнее" btnStyle="bg" size="small"/>
            </div>
        </NavLink>
    )
}

const CategoriesGrid = () => {
    const data = [
        {
            image: image1,
            title: 'Мужские часы',
            text: 'Мы предлагаем широкий ассортимент мужских моделей от традиционных классических до инновационных спортивных.',
            link: '/products/?filters=225418:225536'
        },
        {
            image: image2,
            title: 'Женские часы',
            text: 'Наши женские часы являются идеальным аксессуаром, который подчеркивает очарование и шарм любой женщины. Часы для любого случая и характера.',
            link: '/products/?filters=225418:225421'
        },
        {
            image: image3,
            title: 'Каталог часов',
            text: 'В нашем каталоге лучшие часы в плане дизайна, качества и функциональности от ведущих мировых производителей.',
            link: '/products'
        },
    ]

    return (
        <section className="sectionPadding__small bottom">
            <Container>
                <div className={c.inner}>
                    {data.map((item, i) => {
                        return <CategoriesGridCard key={i} {...item}/>
                    })}
                </div>
            </Container>
        </section>
    )
}

export default CategoriesGrid