import axios from "axios";

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) => {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/${mediaType}/${mediaCategory}`,
      {
        params: {
          api_key: process.env.TMDB_KEY,
          page,
        },
      }
    );
    return response.data;
  },

  mediaGenres: async ({ mediaType }) => {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/genre/${mediaType}/list`,
      {
        params: {
          api_key: process.env.TMDB_KEY,
        },
      }
    );
    return response.data;
  },

  mediaSearch: async ({ query, mediaType, page }) => {
    const response = await axios.get(`${process.env.TMDB_BASE_URL}/search/${mediaType}`, {
      params: {
        api_key: process.env.TMDB_KEY,
        query,
        page,
      },
    });
    return response.data;
  },

  mediaDetail: async ({ mediaType, mediaId }) => {
    const response = await axios.get(`${process.env.TMDB_BASE_URL}/${mediaType}/${mediaId}`, {
      params: {
        api_key: process.env.TMDB_KEY,
      },
    });
    return response.data;
  },

  mediaCredits: async ({ mediaType, mediaId }) => {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/${mediaType}/${mediaId}/credits`,
      {
        params: {
          api_key: process.env.TMDB_KEY,
        },
      }
    );
    return response.data;
  },

  mediaVideos: async ({ mediaType, mediaId }) => {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/${mediaType}/${mediaId}/videos`,
      {
        params: {
          api_key: process.env.TMDB_KEY,
        },
      }
    );
    return response.data;
  },

  mediaImages: async ({ mediaType, mediaId }) => {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/${mediaType}/${mediaId}/images`,
      {
        params: {
          api_key: process.env.TMDB_KEY,
        },
      }
    );
    return response.data;
  },

  mediaRecommend: async ({ mediaType, mediaId }) => {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/${mediaType}/${mediaId}/recommendations`,
      {
        params: {
          api_key: process.env.TMDB_KEY,
        },
      }
    );
    return response.data;
  },

  personDetail: async ({ personId }) => {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/person/${personId}`, 
      {
        params: {
          api_key: process.env.TMDB_KEY,
        },
      }
    );
    return response.data;
  },
  
  personMedias: async ({ personId }) => {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/person/${personId}/combined_credits`, 
      {
        params: {
          api_key: process.env.TMDB_KEY,
        },
      }
    );
    return response.data;
  },  
};

export default tmdbApi;
