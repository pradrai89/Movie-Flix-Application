import axios from 'axios';
import { useEffect, useState } from 'react';
import Genres, { Genre } from '../../components/Genres/Genres';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenre from '../../hooks/useGenre';
import CustomPagination from '../../components/Pagination/CustomPagination';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  name: string;
  first_air_date: string;
  release_date: string;
  vote_average: number;
}

const Movies = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [page, setPage] = useState<number>(1);
  const [content, setContent] = useState<Movie[]>([]);
  const [numOfPages, setNumOfPages] = useState<number>();
  const genreForURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreForURL, page]);

  return (
    <div>
      <span className='pageTitle'>Discover Movies</span>
      <Genres
        type='movie'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className='trending'>
        {content &&
          content.map((movie: Movie) => {
            const {
              id,
              poster_path,
              title,
              name,
              first_air_date,
              release_date,
              vote_average,
            } = movie;
            return (
              <SingleContent
                key={id}
                id={id}
                poster={poster_path}
                title={title || name}
                date={first_air_date || release_date}
                media_type='movie'
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

export default Movies;
