import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  useEffect(() => {
    let variables = {
      userFrom: userFrom,
      movieId: movieId,
    };
    Axios.post('/api/favorite/favoriteNumber', variables)
      //좋아요 숫자 가져오는 API
      .then((response) => {
        if (response.data.success) {
          console.log(FavoriteNumber);
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert('숫자 정보를 가져오는데 실패하였습니다.');
        }
      });

    Axios.post('/api/favorite/favorited', variables)
      //내가 좋아요를 눌렀는지에대한 정보가져오는 API
      .then((response) => {
        if (response.data.success) {
          setFavorited(response.data.favorited);
        } else {
          alert('좋아요 정보를 가져오는데 실패하였습니다.');
        }
      });
  }, []);

  const onClickFavorite = () => {
    let variables = {
      userFrom: userFrom,
      movieId: movieId,
      movieTitle: movieTitle,
      moviePost: moviePost,
      movieRunTime: movieRunTime,
    };

    if (Favorited) {
      Axios.post('/api/favorite/removeFromFavorite', variables).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert('Favorite리스트에서 지우는 걸 실패했습니다.');
          }
        }
      );
    } else {
      Axios.post('/api/favorite/addToFavorite', variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert('Favorite리스트에서 추가하는 걸 실패했습니다.');
        }
      });
    }
  };
  return (
    <div>
      <Button onClick={onClickFavorite}>
        {Favorited ? 'Not Favorite' : 'Add to Favorite'} {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
