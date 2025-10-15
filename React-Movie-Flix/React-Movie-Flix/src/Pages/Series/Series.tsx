import axios from 'axios';
import { useEffect, useState } from 'react';
import Genres, { Genre } from '../../components/Genres/Genres';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenre from '../../hooks/useGenre';

interface SeriesProps {}

const Series: React.FC<SeriesProps> = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [page, setPage] = useState<number>(1);
  const [content, setContent] = useState<any[]>([]);
  const [numOfPages, setNumOfPages] = useState<number>();
  const genreForURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [genreForURL, page]);

  return (
    <div>
      <span className='pageTitle'>Discover Series</span>
      <Genres
        type='tv'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className='trending'>
        {content &&
          content.map((c) => {
            const {
              id,
              poster_path,
              title,
              name,
              first_air_date,
              release_date,
              vote_average,
            } = c;

            return (
              <SingleContent
                key={id}
                id={id}
                poster={poster_path}
                title={title || name}
                date={first_air_date || release_date}
                media_type='tv'
                vote_average={vote_average}
              />
            );
          })}
      </div>
      {numOfPages && numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
