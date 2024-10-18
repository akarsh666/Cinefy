import { Box, Typography } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs.js";
import NavigationSwiper from "./NavigationSwiper.jsx";

const BackdropSlide = ({ backdrops }) => {
  if (!Array.isArray(backdrops) || backdrops.length === 0) {
    return (
      <Typography variant="h6" sx={{ color: 'text.secondary', fontStyle: 'italic', textAlign: 'center' }}>
        No backdrops available
      </Typography>
    );
  }

  return (
    <NavigationSwiper>
      {backdrops.slice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              position: "relative",
              paddingTop: "40%", 
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.backdropPath(item.file_path)})`,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4, 
              },
              height: "100%", 
              overflow: "hidden",
            }}
          />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default BackdropSlide;
