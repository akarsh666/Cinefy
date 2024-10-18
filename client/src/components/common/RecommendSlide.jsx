import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper.jsx";
import MediaItem from "./MediaItem.jsx";


const RecommendSlide = ({ medias, mediaType}) => {
if (!Array.isArray(medias) || medias.length === 0) return null;
  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendSlide;
