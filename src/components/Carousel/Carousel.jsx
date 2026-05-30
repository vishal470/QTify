import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.css";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LeftArrowButton from "./LeftNavigationButton/LeftArrowButton";
import RightArrowButton from "./RightNavigationButton/RightArrowButton";

const Controls = ({ data, swiper }) => {
  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0);
    }
  }, [data, swiper]);
  return null;
};

function Carousel({ data, renderComponent, component }) {
  const render = renderComponent || component || (() => null);
  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiperInstance) => {
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
  };

  useEffect(() => {
    if (!swiper) return;

    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, [swiper]);

  return (
    <div className={styles.wrapper}>
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        initialSlide={0}
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={"auto"}
        slidesPerGroup={1}
        observer
        observeParents
        watchSlidesProgress
        breakpoints={{
          320: { slidesPerView: 1.2, spaceBetween: 10 },
          640: { slidesPerView: 2.2, spaceBetween: 10 },
          900: { slidesPerView: 3.2, spaceBetween: 10 },
          1200: { slidesPerView: 4.2, spaceBetween: 10 },
        }}
        style={{ padding: "0px 20px" }}
        allowTouchMove
      >
        <Controls data={data} swiper={swiper} />
        {data.map((ele, idx) => (
          <SwiperSlide key={idx}>{render(ele)}</SwiperSlide>
        ))}
      </Swiper>
      <LeftArrowButton swiper={swiper} isBeginning={isBeginning} />
      <RightArrowButton swiper={swiper} isEnd={isEnd} />
    </div>
  );
}

export default Carousel;