import MainSlider from "../components/mainSlider"
import CategoriesGrid from "../components/categoriesGrid"
import Bestsellers from "../components/bestsellers"
import AboutUs from "../components/aboutUs"
import HelpBlock from "../components/helpBlock"
import { Helmet } from "react-helmet"
import InstagramFeed from "../components/InstagramWidget/instagramWidget"
import Container from "../components/container"

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>Ветер времени</title>
                <meta name="description" content="Онлайн магазин часов"/>
            </Helmet>
            <MainSlider/>
            <CategoriesGrid/>
            <Bestsellers/>
            <AboutUs />
            <HelpBlock/>
			<InstagramFeed border="top" />
        </>
    )
}

export default HomePage