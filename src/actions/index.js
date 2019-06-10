import {
    SERVER_URL,
    GET_ARTICLES_STARTED,
    GET_ARTICLES_COMPLETED,
    GET_ARTICLES_FAILED
} from "../constants";

export const getArticles = () => {
    return dispatch => {
        dispatch(getArticlesStarted());
        fetch(`${SERVER_URL}/articles`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                dispatch(getArticlesCompleted(response));
            })
            .catch(error => { 
                console.log('Error Happened!!');
                console.log(error);
            });
    }
};

const getArticlesStarted = () => ({
    type: GET_ARTICLES_STARTED
});

const getArticlesCompleted = (articles) => ({
    type: GET_ARTICLES_COMPLETED,
    payload: { articles }
});

const getArticlesFailed = () => ({
    type: GET_ARTICLES_FAILED
});
