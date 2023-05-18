import c from './styles.module.scss'
import Container from "../container"
import {NavLink} from "react-router-dom"
import { Fragment } from 'react'

const BreadcrumbsItem = ({text, icon, link}) => {
    const inner = icon ? <div className={[c.icon, 'icon-' + icon].join(' ')}></div> : <div className={c.text}>{text}</div>

    if(link) {
        return <NavLink end to={link} className={c.link}>{inner}</NavLink>
    } else {
        return <div className={c.link}>{inner}</div>
    }
}

const Breadcrumbs = ({path}) => {
    return null
    const length = path.length - 1
    return (
        <section className={c.breadcrumbs}>
            <Container>
                <nav className={c.inner}>
                    <BreadcrumbsItem icon="home" link="/"/>
                    {path.map((item, i) => {
                        return (
                            <Fragment key={i}>
                                <span className={[c.sep, 'icon-right'].join(' ')}></span>
                                <BreadcrumbsItem {...item} link={i === length ? '' : item.link}/>
                            </Fragment>
                        )
                    })}
                </nav>
            </Container>
        </section>
    )
}

export default Breadcrumbs