import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import { Provider} from 'react-redux'; //컴포넌트에다가 redux를 연결해주는역할
import { applyMiddleware,createStore } from 'redux';
import PromiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers' //뒤에 index.js를 안붙여도 알아서 처리해줌
import { BrowserRouter } from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware(PromiseMiddleware,ReduxThunk)(createStore);
//store에서 객체뿐만아니라 promise,function도 받을 수 있게하기위해설정


ReactDOM.render(
    <Provider
      store={createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && //redux devtools를 사용하기위한설정
        window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
    >
      <BrowserRouter>
     <App />
     </BrowserRouter>
    </Provider>
    ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
