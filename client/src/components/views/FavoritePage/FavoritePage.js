import React, { useEffect, useState } from 'react';
import './favorite.css';
import Axios from 'axios';
import { Popover, Button } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  const fetchFavoredMovie = () => {
    //좋아요 영화들을 서버로부터 로드하는 API
    Axios.post('/api/favorite/getFavoredMovie', {
      userFrom: localStorage.getItem('userId'),
    }).then((response) => {
      if (response.data.success) {
        console.log(response.data.favorites);
        setFavorites(response.data.favorites);
      } else {
        alert('영화 정보를 가져오는데 실패 했습니다.');
      }
    });
  };

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };

    Axios.post('/api/favorite/removeFromFavorite', variables).then(
      (response) => {
        if (response.data.success) {
          //결과값을 제대로 가지고왔으면 다시한번 좋아요리스트 영화들을 로드한다.
          fetchFavoredMovie();
        } else {
          alert('리스트에서 지우는데 실패했습니다.');
        }
      }
    );
  };

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500/${favorite.moviePost}`} />
        ) : (
          'no image'
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} mins</td>
        <td>
          <Button
            onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}
          >
            {/*이렇게 화살표함수로 onClikeDelete메소드에 파라미터를 보낼수있다. */}
            {/*그냥 onClickDelete 할경우 함수가 그대로 표시가된다. 그러나 return으로 위와같이
            표시하게 될경우 함수를 실행하게끔 할 수있다. */}
            Remove
          </Button>
        </td>
      </tr>
    );
  });
  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2> Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
