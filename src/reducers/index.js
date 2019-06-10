import cloneDeep from 'lodash/cloneDeep';
import { GET_ARTICLES, GET_ARTICLES_COMPLETED } from '../constants';

const defaultState = {
    articles: [],
    authors: [],
};

const appReducer = (state = defaultState, action) => {
    switch(action.type) {
        case GET_ARTICLES: {
            const newState = cloneDeep(state);
            newState.articles = [];
            return newState;
        }
        case GET_ARTICLES_COMPLETED: {
            const newState = cloneDeep(state);
            newState.articles = action.payload.articles;
            return newState;
        }
        default:
            return state;
    }
};

export default appReducer;
