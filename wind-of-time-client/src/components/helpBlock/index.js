import c from './styles.module.scss'
import Container from '../container'
import Button from '../UI/button'
import img from '../../assets/images/help.webp'
import { WHATSAPP } from '../../config'

const HelpBlock = ({border = null}) => {
    return (
        <section className={[c.section, border ? c[border] : null].join(' ')}>
            <Container>
                <div className={c.inner}>
                    <div className={c.content}>
                        <div className={c.subtitle}>Помощь покупателям</div>
                        <div className={c.title}>Не можете выбрать?</div>
                        <div className={c.text}>Мы можем связаться с вами и помочь с выбором.</div>
                        <Button externalLink={'https://wa.me/+' + WHATSAPP} text="Связаться с нами" btnStyle="outline" size="larger"/> 
                    </div>   
                    <div className={c.image}>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 487.7 877.4" style={{enableBackground: 'new 0 0 487.7 877.4'}}>
                            <g>
                                <path d="M75.2,288.8c7.4,10.2,7.2,19.2-0.6,27s-16.6,7.8-26.4,0C11.8,276.9-4,230.9,0.9,177.7C7,124.5,31,81.1,72.7,47.6
                                    C114,16.5,159.5,0.7,209.3,0c49.7-0.6,96.9,11.8,141.5,37.1c40.5,23.3,73.5,55.1,99.1,95.5c25.6,40.3,38.2,84.4,37.8,132.3
                                    c-2.5,49.1-18.3,92.8-47.6,131c-29.2,38.3-64.1,70.1-104.6,95.4c-20.9,12.7-41.2,26.1-61.1,40.2s-37.1,31.2-51.9,51.2
                                    c-27.8,38.5-43.4,81.2-46.7,128.3c-2,12.3-8.7,18.4-20,18.4s-17.3-6.1-18.1-18.4c3.3-52,19.2-99.4,47.9-142.4
                                    c14.3-20.9,30.9-39.3,49.7-55.2c22.9-18.4,47.1-35,72.4-49.7c35.2-21.7,66.6-48.6,94.2-80.7s43.3-69.7,47-112.6
                                    c1.6-42.5-8.9-81.7-31.6-117.5S365,89,328.6,68.5c-38.9-21.3-80-31.4-123.4-30.4s-82,16.3-116,45.7c-29.9,26.6-46.8,59.7-50.9,99.4
                                    C35.5,223.7,47.8,258.9,75.2,288.8z M123.7,814.2c0.4-4.9,2.2-9.4,5.5-13.5c3.7-3.7,8.2-5.5,13.5-5.5s9.8,1.8,13.5,5.5
                                    c3.7,4.1,5.5,8.6,5.5,13.5c-1.2,14.7-2.5,29.5-3.7,44.2c-0.4,4.9-2.2,9.4-5.5,13.5c-4.1,3.7-8.6,5.5-13.5,5.5
                                    c-5.3,0-9.8-1.8-13.5-5.5s-5.5-8.2-5.5-13.5C121.2,843.6,122.5,828.9,123.7,814.2z"/>
                            </g>
                        </svg>
                        <img src={img} alt="Помощь покупателям"/>
                    </div>  
                </div>
            </Container>
        </section>
    )
}

export default HelpBlock