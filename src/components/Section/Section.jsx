import React, { useState, useEffect } from "react";
import styles from "./Section.module.css";
import "./material.css";
import Card from "../Card/Card";
import { Box, CircularProgress, Tabs, Tab } from "@mui/material";
import Carousel from "../Carousel/Carousel";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Section = ({ title, data = [], type, filterSource }) => {
  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: "#34c94b",
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#ffffff",
      },
    },
  });

  const [showCarousel, setShowCarousel] = useState(false);
  const [genres, setGenres] = useState([{ key: "all", label: "All" }]);
  const [value, setValue] = useState("all");

  useEffect(() => {
    if (type === "song" && filterSource) {
      filterSource().then((genreData) => {
        if (Array.isArray(genreData)) {
          setGenres((prevGenres) => [...prevGenres, ...genreData]);
        }
      });
    }
  }, [type, filterSource]);

  const handleToggle = () => {
    setShowCarousel((prevState) => !prevState);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterSongs = () => {
    if (type === "song" && value !== "all") {
      return data.filter((item) => item.genre?.key === value);
    }
    return data;
  };

  const contentData = type === "song" ? filterSongs() : data;
  const isSongSection = type === "song";

  return (
    <div>
      <div className={styles.header}>
        <p>{title}</p>
        <button
          type="button"
          className={styles.toggleText}
          onClick={handleToggle}
          data-testid="toggle-carousel"
        >
          {showCarousel ? "Show all" : "Collapse"}
        </button>
      </div>

      {isSongSection && (
        <ThemeProvider theme={theme}>
          <Box sx={{ width: "100%", padding: "10px 20px" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              aria-label="Genre Filter Tabs"
            >
              <Tab
                value="all"
                label="All"
                key="all"
                className={styles.genreTab}
              />
              {genres.map((genre) => (
                <Tab
                  key={genre.key}
                  value={genre.key}
                  label={genre.label}
                  className={styles.genreTab}
                />
              ))}
            </Tabs>
          </Box>
        </ThemeProvider>
      )}

      {!contentData.length ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <CircularProgress color="success" />
          <p style={{ marginLeft: "10px" }}>Loading...</p>
        </Box>
      ) : (
        <div className={styles.cardWrapper}>
          {!showCarousel ? (
            <div className={styles.wrapper}>
              {contentData.map((card, index) => (
                <Card
                  key={card.id ?? card.slug ?? index}
                  data={card}
                  type={type}
                />
              ))}
            </div>
          ) : (
            <Carousel
              data={contentData}
              renderComponent={(card) => (
                <Card
                  key={card.id ?? card.slug ?? card.title ?? card.name}
                  data={card}
                  type={type}
                />
              )}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Section;
