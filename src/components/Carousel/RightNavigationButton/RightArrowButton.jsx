import React from "react";
import styles from "./RightArrowButton.module.css";
import { ReactComponent as RightArrow } from "../../../assets/CarouselButtons/RightButton.svg";

function RightArrowButton({ swiper, isEnd }) {
  if (!swiper || isEnd) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.btn}
      aria-label="Next slide"
      onClick={() => swiper.slideNext()}
    >
      <RightArrow />
    </button>
  );
}

export default RightArrowButton;
