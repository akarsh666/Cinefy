import React from 'react';
import HeroSlide from '../components/common/HeroSlide.jsx';
import tmdbConfigs from "../api/configs/tmdb.configs.js";
import { Box, Container, Typography } from '@mui/material';
import uiConfigs from '../configs/ui.configs.js';
import MediaSlide from '../components/common/MediaSlide.jsx';

const HomePage = () => {
  const categories = [
    { title: "Popular Movies", mediaType: tmdbConfigs.mediaType.movie, mediaCategory: tmdbConfigs.mediaCategory.popular },
    { title: "Popular Series", mediaType: tmdbConfigs.mediaType.tv, mediaCategory: tmdbConfigs.mediaCategory.popular },
    { title: "Top Rated Movies", mediaType: tmdbConfigs.mediaType.movie, mediaCategory: tmdbConfigs.mediaCategory.top_rated },
    { title: "Top Rated Series", mediaType: tmdbConfigs.mediaType.tv, mediaCategory: tmdbConfigs.mediaCategory.top_rated },
  ];

  return (
    <>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        {categories.map((category, index) => (
          <Container key={index} sx={{ marginBottom: "2rem" }}>
            <Typography variant="h5" fontWeight="600" marginBottom="1rem">
              {category.title}
            </Typography>
            <MediaSlide
              mediaType={category.mediaType}
              mediaCategory={category.mediaCategory}
            />
          </Container>
        ))}
      </Box>
    </>
  );
}

export default HomePage;
