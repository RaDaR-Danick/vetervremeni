import c from './styles.module.scss'
import Button from '../UI/button'
import Container from '../container'
import img from '../../assets/images/slide.png'
import slide1 from '../../assets/images/slider/citizen-slide.webp'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper'
import 'swiper/css'
import { useRef } from 'react'

const MainSlider = () => {
    const prevBtn = useRef()
    const nextBtn = useRef()
    const scrollbar = useRef()

    return (
        <section className={c.section}>
            <Container>
                <div className={c.slider}>
                    <div className={c.sliderControll}>
                        <div className={c.scrollbar} ref={scrollbar}></div>
                        <Button ref={prevBtn} icon="arrow-left" btnStyle="bg"/> 
                        <Button ref={nextBtn} icon="arrow-right" btnStyle="bg"/>                    
                    </div>

                    <Swiper
                        modules={[Navigation, Scrollbar]}
                        navigation={{
                            prevEl: prevBtn.current,
                            nextEl: nextBtn.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevBtn.current
                            swiper.params.navigation.nextEl = nextBtn.current
                            swiper.params.scrollbar.el = scrollbar.current
                        }}
                        scrollbar={{
                            el: scrollbar,
                            dragClass: c.scrollbarDrag,
                            horizontalClass: c.scrollbarLine,
                            draggable: true
                        }}
                    >
                        <SwiperSlide>
                            <div className={c.slide}>
                                <div className={c.slideContent}>
                                    <div className={c.slideTitle}>Ветер Времени</div>
                                    <div className={c.slideText}>Мир меняется быстро, красота радует долго, впечатления производятся навсегда. Мы предлагаем Вам окунуться в мир наших лучших часов и аксессуаров Ветер Времени. Наши часы уже вошли в историю будущего.</div>
                                    <div className={c.btn}><Button text="Перейти в каталог" link="/products" size="larger" afterIcon="arrow-right"/></div>
                                </div>
                                <div className={[c.slideImage, c.fitRight].join(' ')}>
                                    <img src={slide1} alt="Заголовок слайда"/>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </Container>
        </section>
    )
}

export default MainSlider