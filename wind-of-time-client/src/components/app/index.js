import '../../styles/global.scss'
import Header from '../../layouts/header'
import Footer from '../../layouts/footer'
import { BrowserRouter as Router } from "react-router-dom"
import AppRouter from '../../routes'
import AuthPopup from '../authPopup'
import EditPopup from '../editPopup'
import Notifications from '../notifications'
import { useEffect } from 'react'
import AuthController from '../../controllers/authController'
import CartController from '../../controllers/cartController'
import CityController from '../../controllers/cityController'
import ThemeController from '../../controllers/themeController'

const App = () => {
    useEffect(() => {
        if(localStorage.getItem('token')) {
            AuthController.checkAuth()
        }

        if(localStorage.getItem('city')) {
            CityController.setCity(Number(localStorage.getItem('city')))
        } else {
            CityController.setCity(1)
        }

        if(localStorage.getItem('cart')) {
            const added = JSON.parse(localStorage.getItem('cart'))
            if(added) {
                CartController.setCart(added)
                CartController.checkAvailability(added)
            }
        }

        if(localStorage.getItem('theme')) {
            ThemeController.setTheme(localStorage.getItem('theme'))
        }

        // window.addEventListener('storage', e => {
        //     const {newValue, key} = e

        //     if(key === 'cart')
        //         CartController.setCart(newValue ? JSON.parse(newValue) : null, false)
        // })
    })

    return (
        <Router>
            <Header/>
            <AppRouter/>
            <Footer />
            <AuthPopup/>
            <EditPopup />
            <Notifications/>
        </Router>
    )
}

export default App