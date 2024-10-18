import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api.js";
import MediaGrid from "../components/common/MediaGrid.jsx";
import uiConfigs from "../configs/ui.configs.js";

const mediaTypes = ["movie", "tv", "people"];
let timer;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(
    async () => {
      setOnSearch(true);

      const { response, err } = await mediaApi.search({
        mediaType,
        query,
        page
      });

      setOnSearch(false);

      if (err) toast.error(err.message);
      if (response) {
        if (page > 1) setMedias(m => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    },
    [mediaType, query, page],
  );

  useEffect(() => {
    window.scrollTo(0, 0)
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          {/* Category Selection */}
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {mediaTypes.map((item, index) => (
              <Button
                size="large"
                key={index}
                variant={mediaType === item ? "contained" : "text"}
                sx={{
                  color: mediaType === item ? "primary.contrastText" : "text.primary",
                  borderRadius: "50px",
                  textTransform: "capitalize", 
                  px: 3, 
                  fontWeight: "bold",
                }}
                onClick={() => onCategoryChange(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>

          {/* Search Input */}
          <TextField
            color="success"
            placeholder={`Search ${mediaType === "movie" ? "Movies" : mediaType === "tv" ? "TV Shows" : "People"}`}
            sx={{
              width: "100%",
              input: {
                color: "primary.contrastText",
                backgroundColor: "rgba(255, 255, 255, 0.1)", 
                borderRadius: 2,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)', 
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                }
              }
            }}
            autoFocus
            onChange={onQueryChange}
          />

          {/* Media Grid */}
          <MediaGrid medias={medias} mediaType={mediaType} />

          {/* Load More Button */}
          {medias.length > 0 && (
            <LoadingButton
              sx={{
                background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
                    borderRadius: "30px",
                    color: "white",
                    padding: "8px 16px",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: "bold",
                    "&:hover": {
                    background: "linear-gradient(135deg, #5b86e5, #36d1dc)"
                    }
              }}
              loading={onSearch}
              onClick={() => setPage(page + 1)}
            >
              Load More
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;