import c from './styles.module.scss'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import sidebarMenu from '../../routes/sidebarMenu'

const SidebarNavigationLink = ({url, text, auth}) => {
    const { isAuth } = useSelector(store => store.auth)
    const show = auth ? auth && isAuth : true

    return show ? <li><NavLink end to={url} className={({isActive}) => (isActive ? c.activeNavLink : null)}>{text}</NavLink></li> : null
}

const SidebarNavigation = () => {
    return (
        <nav className={c.nav}>
            <ul>
                {sidebarMenu.map((item, i) => <SidebarNavigationLink key={i} {...item}/>)}
            </ul>
        </nav>
    )
}

export default SidebarNavigation