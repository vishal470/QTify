import React from "react";
import styles from "./LeftArrowButton.module.css";
import { ReactComponent as LeftArrow } from "../../../assets/CarouselButtons/LeftButton.svg";

function LeftArrowButton({ swiper, isBeginning }) {
  if (!swiper || isBeginning) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.btn}
      aria-label="Previous slide"
      onClick={() => swiper.slidePrev()}
    >
      <LeftArrow />
    </button>
  );
}

export default LeftArrowButton;
