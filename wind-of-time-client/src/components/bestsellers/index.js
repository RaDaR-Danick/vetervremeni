import ProductsSlider from "../productsSlider"
import { useSelector } from "react-redux"
import Spinner from "../spinner"

const Bestsellers = () => {
    const { selected, loaded } = useSelector(store => store.city)
    
    if(!loaded) {
        return <Spinner padding={true}/>
    } else {
        return <ProductsSlider city={selected} title="Рекомендуем посмотреть" params={{rand: true}}/>
    }
}

export default Bestsellers