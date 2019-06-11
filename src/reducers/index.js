import cloneDeep from 'lodash/cloneDeep';
import { GET_ARTICLE_STARTED, GET_ARTICLES_STARTED, GET_ARTICLES_COMPLETED, GET_ARTICLE_COMPLETED } from '../constants';

const defaultState = {
    articles: [],
    authors: [],
    loading: false,
    error: {},
};

const appReducer = (state = defaultState, action) => {
    switch(action.type) {
        case GET_ARTICLE_STARTED: {
            const newState = cloneDeep(state);
            newState.loading = true;
            return newState;
        }
        case GET_ARTICLE_COMPLETED: {
            const newState = cloneDeep(state);
            newState.article = action.payload.article;
            newState.loading = false;
            return newState;
        }
        case GET_ARTICLES_STARTED: {
            const newState = cloneDeep(state);
            newState.loading = true;
            return newState;
        }
        case GET_ARTICLES_COMPLETED: {
            const newState = cloneDeep(state);
            newState.articles = action.payload.articles;
            newState.loading = false;
            return newState;
        }
        default:
            return state;
    }
};

export default appReducer;
