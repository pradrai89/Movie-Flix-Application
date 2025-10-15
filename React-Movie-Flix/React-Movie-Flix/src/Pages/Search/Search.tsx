import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';

const Search: React.FC = () => {
  const [type, setType] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [content, setContent] = useState<any[]>([]);
  const [numOfPages, setNumOfPages] = useState<number>();

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className='search'>
          <TextField
            style={{ flex: 1 }}
            className='searchBox'
            label='Search'
            variant='filled'
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant='contained'
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize='large' />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label='disabled tabs example'
        >
          <Tab style={{ width: '50%' }} label='Search Movies' />
          <Tab style={{ width: '50%' }} label='Search TV Series' />
        </Tabs>
      </ThemeProvider>
      <div className='trending'>
        {content &&
          content.map((c: any) => {
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
                media_type={type ? 'tv' : 'movie'}
                vote_average={vote_average}
              />
            );
          })}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages && numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
