import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs.js";
import mediaApi from "../api/modules/media.api.js";
import uiConfigs from "../configs/ui.configs.js";
import usePrevious from "../hooks/usePrevious.jsx"
import HeroSlide from "../components/common/HeroSlide.jsx";
import MediaGrid from "../components/common/MediaGrid.jsx";
import { setAppState } from "../redux/features/appStateSlice.js";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice.js";
import { toast } from "react-toastify";

const MediaList = () => {
  const { mediaType } = useParams();

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const prevMediaType = usePrevious(mediaType);
  const dispatch = useDispatch();

  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["popular", "top rated"];

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);

      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage
      });

      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        if (currPage !== 1) setMedias(m => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    };

    if (mediaType !== prevMediaType) {
      setCurrCategory(0);
      setCurrPage(1);
    }

    getMedias();
  }, [
    mediaType,
    currCategory,
    prevMediaType,
    currPage,
    mediaCategories,
    dispatch
  ]);

  const onCategoryChange = (categoryIndex) => {
    if (currCategory === categoryIndex) return;
    setMedias([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);


  return (
    <>
      <HeroSlide mediaType={mediaType} mediaCategory={mediaCategories[currCategory]}/>
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Typography fontWeight="700" variant="h5">
            {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "TV Series"}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={index}
                size="large"
                variant={currCategory === index ? "contained" : "text"}
                sx={{
                  color: currCategory === index ? "primary.contrastText" : "text.primary"
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid
          medias={medias}
          mediaType={mediaType}
        />
        <LoadingButton
          sx={{
            marginTop: 8,
            width: "100%",
            padding: "12px 16px",
            backgroundColor: "#1e88e5",
            color: "white",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#1565c0",
              transform: "scale(1.05)",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)"
            },
            "&:focus": {
              outline: "none",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
            },
            "&.Mui-disabled": {
              backgroundColor: "#b0bec5"
            }
          }}
          color="primary"
          loading={mediaLoading}
          onClick={onLoadMore}
        >
          Load More
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;
