import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs.js"; 
import AutoSwiper from "./AutoSwiper.jsx";

const PosterSlide = ({ posters }) => {
    if (!Array.isArray(posters) || posters.length === 0) return null;
  return (
    <AutoSwiper>
      {posters.slice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box sx={{
            paddingTop: "160%",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${tmdbConfigs.posterPath(item.file_path)})`
          }} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default PosterSlide;