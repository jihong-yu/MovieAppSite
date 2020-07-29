import {combineReducers} from 'redux'; //여러가지 redux들을 하나로합쳐줌
import user from './user_reducer';
//import comment from './comment_reducer';

const rootReducer = combineReducers({
    user
});

export default rootReducer;