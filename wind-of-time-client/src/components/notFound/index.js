import c from './styles.module.scss'
import Container from '../container'
import img from '../../assets/images/tissot.webp'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
    return (
        <section className={c.section}>
            <Container>
                <div className={c.inner}>
                    <div className={c.number}>
                        <div className={c.symbol}>4</div>
                        <div className={c.image}><img src={img} alt="Страница не найдена"/></div>
                        <div className={c.symbol}>4</div>
                    </div>
                    <NavLink to="/" end className={c.link}>На главную</NavLink>
                </div>
            </Container>
        </section>
    )
}

export default NotFound