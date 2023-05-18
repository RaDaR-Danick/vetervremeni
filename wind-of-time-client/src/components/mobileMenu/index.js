import c from './styles.module.scss'
import { useSelector } from 'react-redux'
import Container from '../container'
import primaryMenu from '../../routes/primaryMenu'
import { NavLink } from 'react-router-dom'
import SelectCity from '../selectCity'
import ThemeSwitcher from '../themeSwitcher'
import UserWidgetMobile from '../userWidgetMobile'
import { dispatchStore } from "../../store"
import { setMenuAction } from '../../store/menuReducer'
import SearchField from '../searchField'
import Contacts from '../contacts'

const CloseMenu = () => {
    dispatchStore(setMenuAction(false))
}

const MobileMenu = () => {
    const {show} = useSelector(store => store.menu)

    return (
        <div className={[c.menu, show ? c.show : null].join(' ')}>
            <Container>
                <div className={c.menuInner}>
                    <SearchField />
                    <nav className={c.nav}>
                        <ul>
                            {
                                primaryMenu.map((link, index) => {
                                    return (
                                        <li key={index}>
                                            <NavLink end to={link.url} onClick={CloseMenu} className={({isActive}) => (isActive ? c.activeNavLink : null)}>{link.text}</NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>

                    <div className={c.user}>
                        <UserWidgetMobile />
                    </div>

                    <Contacts />

                    <div className={c.options}>
                        <ThemeSwitcher />
                        <SelectCity />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MobileMenu
export { CloseMenu }