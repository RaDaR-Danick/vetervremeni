import { ProductPage, HomePage, ArchivePage, CartPage, SuccessPage, OrdersPage, SearchPage, ErrorPage, GuaranteePage, DeliveryPage, AboutPage, ServicePage, OfferPage, MaguapayPage } from '../pages'
import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from 'react'
import { CloseMenu } from '../components/mobileMenu'

const AppRouter = () => {
    const location = useLocation()

    useEffect(() => {
        window.ym(92936221, 'hit', window.location.href)
        window.scrollTo(0, 0)
        CloseMenu()
    }, [location])

    return (
        <Routes>
            <Route path="/products" element={<ArchivePage/>}/>
            <Route path="/product/:slug" element={<ProductPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/success" element={<SuccessPage/>}/>
            <Route path="/maguapay/:id" element={<MaguapayPage/>}/>
            <Route path="/orders" element={<OrdersPage/>}/>
            <Route path="/search/:query" element={<SearchPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/guarantee" element={<GuaranteePage/>}/>
            <Route path="/delivery" element={<DeliveryPage/>}/>
            <Route path="/service" element={<ServicePage/>}/>
            <Route path="/offer" element={<OfferPage/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    )
}

export default AppRouter