import React, { useEffect, useState } from "react";
import styles from "./LeftArrowButton.module.css";
import { ReactComponent as LeftArrow } from "../../../assets/CarouselButtons/LeftButton.svg";
import { useSwiper } from "swiper/react";

function LeftArrowButton() {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);

  useEffect(() => {
    const handleSlideChange = () => {
      setIsBeginning(swiper.isBeginning);
    };

    swiper.on("slideChange", handleSlideChange);
    return () => {
      swiper.off("slideChange", handleSlideChange);
    };
  }, [swiper]);

  return (
    <div className={styles.btn}>
      {!isBeginning && <LeftArrow onClick={() => swiper.slidePrev()} />}
    </div>
  );
}

export default LeftArrowButton;
