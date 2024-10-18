import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddlerware from "../middleware/token.middleware.js";

const getList = async (req, res) => {
  try {
    const { page = 1 } = req.query; 
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });

    if (!response || !response.results || response.results.length === 0) {
      return responseHandler.error(res, "No movies found", 404);
    }

    return responseHandler.ok(res, response);
  } catch (error) {
    console.error("Error in getList:", error.message); 
    responseHandler.error(res, "Failed to fetch movies", 500);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });

    if (!response || !response.genres) {
      return responseHandler.error(res, "Genres not found", 404);
    }

    return responseHandler.ok(res, response);
  } catch (error) {
    console.error("Error in getGenres:", error.message);
    responseHandler.error(res, "Failed to fetch genres", 500);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page = 1 } = req.query; 

    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });

    if (!response || !response.results || response.results.length === 0) {
      return responseHandler.error(res, "No search results found", 404);
    }

    return responseHandler.ok(res, response);
  } catch (error) {
    console.error("Error in search:", error.message);
    responseHandler.error(res, "Failed to search", 500);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetail(params);

    if (!media) {
      return responseHandler.error(res, "Media detail not found", 404);
    }

    media.credits = await tmdbApi.mediaCredits(params);

    const videoResponse = await tmdbApi.mediaVideos(params);
    media.videos = videoResponse.results;

    media.images = await tmdbApi.mediaImages(params);

    const recommend = await tmdbApi.mediaRecommend(params);
    media.recommend=recommend.results;
    
    media.recommend = recommend ? recommend.results : [];

    const tokenDecoded = tokenMiddlerware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);
      if (user) {
        const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");

    return responseHandler.ok(res, media);
  } catch (error) {
    console.error("Error in getDetail:", error.message);
    responseHandler.error(res, "Failed to fetch media details", 500);
  }
};

export default { getList, getGenres, search, getDetail };
