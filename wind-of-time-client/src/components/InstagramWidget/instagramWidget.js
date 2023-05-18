import c from './styles.module.scss'
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Container from '../container'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import Button from '../UI/button'
import 'swiper/css'
import iconInstagram from "../../assets/icons/icon-instagram.png";

import styles from "./styles.module.scss";

SwiperCore.use([Autoplay, Navigation, Pagination]);

function InstagramFeed(props) {
  const prevBtn = useRef()
  const nextBtn = useRef()
  const scrollbar = useRef()
  const {link = ''} = props
  const options = {}
  const [instagramPosts, setInstagramPosts] = useState([]);
  console.log(instagramPosts);
  const host = "http://localhost:4000/";
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await axios.get(host + "instagram-posts");
        setInstagramPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <Container>
      <div className={styles["instagram-feed-container"]}>
        <div className={c.inner}>
          <div className={c.header}>
            <h4 className="mt-4">
              <img src={ iconInstagram } width={ 50 }  style={{paddingRight: 10, verticalAlign: "bottom"}}/>
              Мы в Instagram 
            </h4>
            <div className={[c.title, 'h2'].join(' ')}>{options.title}</div>
            <div className={c.rightHeader}>
                <Button text="Перейти на наш Instagram @gsquare.kz" btnStyle="outlineTheme" externalLink={"https://www.instagram.com/gsquare.kz/"}/>
                <div className={c.sep}></div>
              <div className={c.arrows}>
                <Button ref={prevBtn} icon="arrow-left" btnStyle="outline"/> 
                <Button ref={nextBtn} icon="arrow-right" btnStyle="outline"/>  
              </div>
            </div>
          </div>
          <div className={c.sliderWrapper}>
            <div ref={scrollbar} className={c.scrollbar}></div>
            <Swiper
              className={styles["swiper-container"]}
              spaceBetween={20}
              slidesPerView={1}
              modules={[Navigation, Scrollbar]}
              autoplay={{ delay: 3000 }}
              pagination={{ el: ".swiper-pagination", clickable: true }}
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
              breakpoints={{
                600: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                  autoplay: false,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                  autoplay: false,
                },
                1300: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                  autoplay: false,
                },
              }}
            >
              {instagramPosts.map((post) => (
                <SwiperSlide key={post.id}>
                  <div className={styles["image-container"]}>
                    {post.media_type === "VIDEO" ? (
                      <video src={post.media_url} controls alt="" />
                    ) : (
                      <img src={post.media_url} alt="" />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default InstagramFeed;