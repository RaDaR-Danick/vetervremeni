import c from './styles.module.scss'
import Logo from '../../components/logo'
import CartBtn from '../../components/cartBtn'
import SearchField from '../../components/searchField'
import ThemeSwitcher from '../../components/themeSwitcher'
import SelectCity from '../../components/selectCity'
import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Container from '../../components/container'
import UserWidget from '../../components/userWidget'
import MobileMenuToggler from '../../components/mobileMenuToggler'
import MobileMenu from '../../components/mobileMenu'
import primaryMenu from '../../routes/primaryMenu'
import Contacts from '../../components/contacts'

const Header = () => {
    const topHeader = useRef()

    return (
        <>
            <header className={c.header} ref={topHeader}>
                <div className={c.topHeader}>
                    <Container>
                        <div className={c.topHeaderInner}>
                            <div className={c.logoWrapper}><Logo /></div>
                            <div className={c.citySelectWrapper}><SelectCity /></div>
                            <div className={c.searchInputWrapper}><SearchField/></div>
                            <div className={c.contacts}>
                                <Contacts />
                            </div>
                            <div className={c.rightBlock}>
                                <ThemeSwitcher/>
                                <UserWidget/>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
            
            <div className={c.bottomHeader}>
                <Container>
                    <div className={c.bottomHeaderInner}>
                        <nav>
                            <ul>
                                {
                                    primaryMenu.map((link, index) => {
                                        return (
                                            <li key={index}>
                                                <NavLink end to={link.url} className={({isActive}) => (isActive ? c.activeNavLink : null)}>{link.text}</NavLink>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </nav>
                        <div className={c.cartBtnWrapper}>
                            <CartBtn />
                        </div>
                    </div>
                </Container>
            </div>

            <div className={c.mobileHeader}>
                <Container>
                    <div className={c.mobileHeaderInner}>
                        <div className={c.menuBtnWrapper}>
                            <MobileMenuToggler/>
                        </div>
                        <div className={c.logoWrapper}><Logo /></div>
                        <div className={c.rightBlock}>
                            <div className={c.selectCityWrapper}>
                                <SelectCity />
                            </div>
                            <CartBtn />
                        </div>
                    </div>
                </Container>
            </div>

            <MobileMenu />
        </>
    )
}

export default Header