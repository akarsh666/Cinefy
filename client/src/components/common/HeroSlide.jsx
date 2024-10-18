import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice.js";
import { routesGen } from "../../routes/routes.jsx";
import uiConfigs from "../../configs/ui.configs.js";
import CircularRate from "./CircularRate.jsx";
import tmdbConfigs from "../../api/configs/tmdb.configs.js";
import genreApi from "../../api/modules/genre.api.js";
import mediaApi from "../../api/modules/media.api.js";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";

const HeroSlide = ({ mediaType, mediaCategory }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getMedias = async () => {
            dispatch(setGlobalLoading(true)); // Show loading
            const { response, err } = await mediaApi.getList({
                mediaType,
                mediaCategory,
                page: 1,
            });

            // Debugging the API response
            console.log("Movies Response:", response);
            if (response && response.results) {
                setMovies(response.results);
            } else if (err) {
                toast.error(err.message);
            }
            dispatch(setGlobalLoading(false)); // Hide loading
        };

        const getGenres = async () => {
            const { response, err } = await genreApi.getList({ mediaType });
            console.log("Genres Response:", response);
            if (response) {
                setGenres(response.genres || []);
                getMedias(); // Fetch movies after getting genres
            } else if (err) {
                toast.error(err.message);
            }
        };

        getGenres();
    }, [mediaType, mediaCategory, dispatch]);

    const isLoopEnabled = movies.length >= 3;
    const slides = isLoopEnabled ? movies : [...movies, ...movies, ...movies];

    return (
        <Box
            sx={{
                position: "relative",
                color: "primary.contrastText",
                "&::before": {
                    content: '""',
                    width: "100%",
                    height: "30%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    zIndex: 2,
                    pointerEvents: "none",
                    ...uiConfigs.style.gradientBgImage[theme.palette.mode],
                },
            }}
        >
            {movies.length > 0 ? (
                <Swiper
                    grabCursor={true}
                    loop={isLoopEnabled} 
                    slidesPerView={1}
                    slidesPerGroup={1}
                    style={{ width: "100%", height: "max-content" }}
                >
                    {slides.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <Box
                                sx={{
                                    paddingTop: {
                                        xs: "130%",
                                        sm: "80%",
                                        md: "60%",
                                        lg: "45%",
                                    },
                                    backgroundPosition: "top",
                                    backgroundSize: "cover",
                                    backgroundImage: `url(${tmdbConfigs.backdropPath(movie.backdrop_path || movie.poster_path)})`,
                                }}
                            />
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode],
                                }}
                            />
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
                                }}
                            >
                                <Box
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        paddingX: "30px",
                                        color: "text.primary",
                                        width: { sm: "unset", md: "30%", lg: "40%" },
                                    }}
                                >
                                    <Stack spacing={4} direction="column">
                                        <Typography
                                            variant="h4"
                                            fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                                            fontWeight="700"
                                            sx={{
                                                ...uiConfigs.style.typoLines(2, "left"),
                                            }}
                                        >
                                            {movie.title || movie.name}
                                        </Typography>

                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <CircularRate value={movie.vote_average} />
                                            <Divider orientation="vertical" />
                                            {movie.genre_ids.slice(0, 2).map((genreId, index) => (
                                                genres.find(e => e.id === genreId) && (
                                                    <Chip
                                                        variant="filled"
                                                        color="primary"
                                                        key={index}
                                                        label={genres.find(e => e.id === genreId)?.name}
                                                    />
                                                )
                                            ))}
                                        </Stack>

                                        <Typography
                                            variant="body1"
                                            sx={{
                                                ...uiConfigs.style.typoLines(3),
                                            }}
                                        >
                                            {movie.overview}
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            size="large"
                                            startIcon={<PlayArrowIcon />}
                                            component={Link}
                                            to={routesGen.mediaDetail(mediaType, movie.id)}
                                            sx={{ width: "max-content" }}
                                        >
                                            Watch Now
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <Typography variant="h6" align="center" color="text.secondary">
                    No movies available.
                </Typography>
            )}
        </Box>
    );
};

export default HeroSlide;
