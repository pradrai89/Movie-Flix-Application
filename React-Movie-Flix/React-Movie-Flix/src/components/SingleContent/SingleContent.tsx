import { Badge } from '@material-ui/core';
import { img_300, unavailable } from '../../config/config';
import './SingleContent.css';
import ContentModal from '../ContentModal/ContentModal';

interface SingleContentProps {
  id: number;
  poster: string;
  title: string;
  date: string;
  media_type: string;
  vote_average: number;
}

const SingleContent: React.FC<SingleContentProps> = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}: SingleContentProps) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? 'primary' : 'secondary'}
      />
      <img
        className='poster'
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className='title'>{title}</b>
      <span className='subTitle'>
        {media_type === 'tv' ? 'TV Series' : 'Movie'}
        <span className='subTitle'>{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
