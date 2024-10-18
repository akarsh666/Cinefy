import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import personApi from "../../api/modules/person.api";
import MediaItem from "./MediaItem";
import { toast } from "react-toastify";

const PersonMediaGrid = ({ personId }) => {
    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [page, setPage] = useState(1);
    const skip = 8;
  
    useEffect(() => {
      const getMedias = async () => {
        const { response, err } = await personApi.medias({ personId });
  
        if (err) toast.error(err.message);
        if (response) {
          const mediasSorted = response.cast.sort((a, b) => getReleaseDate(b) - getReleaseDate(a));
          setMedias([...mediasSorted]);
          setFilteredMedias([...mediasSorted].splice(0, skip));
        }
      };
  
      getMedias();
    }, [personId]);
  
    const getReleaseDate = (media) => {
      const date = media.media_type === tmdbConfigs.mediaType.movie ? new Date(media.release_date) : new Date(media.first_air_date);
      return date.getTime();
    };
  
    const onLoadMore = () => {
      setFilteredMedias([...filteredMedias, ...[...medias].splice(page * skip, skip)]);
      setPage(page + 1);
    };

    return (
        <>
          <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
            {filteredMedias.map((media, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <MediaItem media={media} mediaType={media.media_type} />
              </Grid>
            ))}
          </Grid>
          {filteredMedias.length < medias.length && (
            <Button onClick={onLoadMore}
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
                }}>
              load more
            </Button>
        )}
        </>
    );
};
    
export default PersonMediaGrid;