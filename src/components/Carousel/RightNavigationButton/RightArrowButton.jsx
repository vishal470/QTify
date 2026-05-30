import React, { useEffect, useState } from "react";
import styles from "./RightArrowButton.module.css";
import { ReactComponent as RightArrow } from "../../../assets/CarouselButtons/RightButton.svg";
import { useSwiper } from "swiper/react";

function RightArrowButton() {
  const swiper = useSwiper();
  const [isEnd, setIsEnd] = useState(swiper.isEnd);

  useEffect(() => {
    const handleSlideChange = () => {
      setIsEnd(swiper.isEnd);
    };

    swiper.on("slideChange", handleSlideChange);
    return () => {
      swiper.off("slideChange", handleSlideChange);
    };
  }, [swiper]);

  return (
    <div className={styles.btn}>
      {!isEnd && <RightArrow onClick={() => swiper.slideNext()} />}
    </div>
  );
}

export default RightArrowButton;
