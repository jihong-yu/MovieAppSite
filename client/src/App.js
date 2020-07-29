import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './hoc/auth';
// Page import
//import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import MovieDetailPage from './components/views/MovieDetailPage/MovieDetailPage';
import FavoritePage from './components/views/FavoritePage/FavoritePage';
import LandingPage from './components/views/ScrollLandingPage/ScrollLandingPage';

function App() {
  return (
    <Suspense fallback={<div>Loding...</div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh-80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/movie/:movieId"
            component={Auth(MovieDetailPage, null)}
          />
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
