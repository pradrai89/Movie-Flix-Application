import axios from 'axios';
import './Trending.css';
import { useEffect, useState } from 'react';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

interface TrendingContent {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
  first_air_date?: string;
  release_date?: string;
  media_type: string;
  vote_average: number;
}

const Trending: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [content, setContent] = useState<TrendingContent[]>([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setContent(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className='pageTitle'>Trending Today</span>
      <div className='trending'>
        {content &&
          content.map((movie: TrendingContent) => {
            const {
              id,
              poster_path,
              title,
              name,
              first_air_date,
              release_date,
              media_type,
              vote_average,
            } = movie;

            return (
              <SingleContent
                key={id}
                id={id}
                poster={poster_path}
                title={title || name || ''}
                date={first_air_date ?? release_date ?? ''}
                media_type={media_type}
                vote_average={vote_average}
              />
            );
          })}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
