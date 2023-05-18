import c from './styles.module.scss'
import Button from '../../components/UI/button'
import Logo from '../../components/logo'
import Container from '../../components/container'
import { SOCIAL, FOOTER } from '../../config'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    const Link = ({link, text}) => {
        return <li><NavLink end to={link}>{text}</NavLink></li>
    }

    const Col = ({links, title}) => {
        return (
            <div className={[c.col, c.nav].join(' ')}>
                <h6>{title}</h6>
                <nav>
                    <ul>
                        { links.map((item, i) => <Link key={i} {...item}/>) }
                    </ul>
                </nav>
            </div>
        )
    }

    return (
        <footer className={c.footer}>
            <Container>
                <div className={c.inner}>
                    <div className={c.col}>
                        <Logo />
                        <p>Если Ваша страсть – узнавать все новое, если Вы решительны и так же, как мы влюблены в часовую индустрию, добро пожаловать! В нашем интернет магазине Вы легко сможете выбрать модели по необходимому функционалу и оформлению.</p>
                        {/* <Button text="Подробнее" size="smaller" link="/about" btnStyle="outline" afterIcon="right"/> */}
                    </div>

                    { FOOTER.map((item, i) => <Col key={i} {...item}/>) }

                    <div className={c.col}>
                        <h6>Социальные сети</h6>
                        <div className={c.social}>
                            {
                                SOCIAL.length ?
                                SOCIAL.map((item, i) => {
                                    return <Button key={i} icon={item.icon} externalLink={item.link} btnStyle="outlineTheme"/>
                                }) : null
                            }
                        </div>
                        <div className={c.links}>
                            <a href="#">Политика конфиденциальности</a>
                            <NavLink to="/offer" end>Публичная оферта</NavLink>
                        </div>
                        <div className={c.copyright}>© {new Date().getFullYear()}. Все права защищены.</div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer