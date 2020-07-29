import React, { useEffect, useState, useRef } from 'react';
import { Typography, Row, Button } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import GridCard from '../commons/GridCards';

const { Title } = Typography;

function LandingPage() {
  const buttonRef = useRef(null);
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovies([...Movies, ...result.results]);
        setMainMovieImage(MainMovieImage || result.results[0]);

        setCurrentPage(result.page);
      }, setLoading(false))

      .catch((error) => console.error('Error:', error));
  };

  const loadMoreItems = () => {
    let endpoint = '';
    setLoading(true);
    console.log('CurrentPage', CurrentPage);
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;

    fetchMovies(endpoint);
  };

  const handleScroll = () => {
    const windowHeight =
      'innerHeight' in window //in연산자 속성명(인덱스) in 객체명(배열명) 있으면 true반환 없으면 false반환 배열은 인덱스만써야됨
        ? window.innerHeight //윈도우 브라우져켰을때 창의 틀빼고 내부길이를 반환
        : document.documentElement.offsetHeight;

    const body = document.body; //body속성반환
    const html = document.documentElement; //html속성반환

    const docHeight = Math.max(
      body.scrollHeight, //스크롤을 쫙펼쳤을때의 길이를 리턴 (가장길다.)
      body.offsetHeight, // 엘리먼트의 패딩과 border, 스크롤바의 사이즈를 포함한 값을 리턴(border의굵기까지포함)
      html.clientHeight, // border와 스크롤바의 크기(clientWidth에서는 스크롤바 크기제외)를 제외한 실제 컨텐츠의 크기를 리턴 (패딩은 포함)
      html.scrollHeight,
      html.offsetHeight
    );

    const windowBottom = windowHeight + window.pageYOffset;
    //pageYOffset : 얼마나 스크롤을 내렸는지의 길이
    if (windowBottom >= docHeight - 1) {
      console.log('clicked');
      buttonRef.current.click();
    }
  };

  return (
    <div style={{ width: '100%', margin: '0' }}>
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280/${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <Title level={2}> Movies by latest </Title>
        <hr />
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCard
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500/${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
        {Loading && <div>Loading...</div>}
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
