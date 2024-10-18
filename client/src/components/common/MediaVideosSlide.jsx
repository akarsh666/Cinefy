import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import NavigationSwiper from "./NavigationSwiper";

const MediaVideo = ({ video }) => {
    const iframeRef = useRef();

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + "px";
        iframeRef.current.setAttribute("height", height);
    }, [video]);

    return (
        <Box
            sx={{
                position: "relative",
                paddingTop: "56.25%",
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            <iframe
                key={video.key}
                src={tmdbConfigs.youtubePath(video.key)}
                ref={iframeRef}
                width="100%"
                title={video.name}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    border: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}
                allowFullScreen
            ></iframe>
        </Box>
    );
};

const MediaVideosSlide = ({ videos }) => {
    return (
        <Box sx={{ padding: 2 }}>
            {videos && videos.length > 0 ? (
                <NavigationSwiper>
                    {videos.map((video, index) => (
                        <SwiperSlide key={index}>
                            <MediaVideo video={video} />
                        </SwiperSlide>
                    ))}
                </NavigationSwiper>
            ) : (
                <Typography variant="h6" sx={{ color: 'text.secondary', fontStyle: 'italic', textAlign: 'center' }}>
                    No videos available
                </Typography>
            )}
        </Box>
    );
};

export default MediaVideosSlide;
