import {
    SERVER_URL,
    GET_ARTICLE_STARTED,
    GET_ARTICLE_COMPLETED,
    GET_ARTICLE_FAILED,
    GET_ARTICLES_STARTED,
    GET_ARTICLES_COMPLETED,
    GET_ARTICLES_FAILED,
    UPDATE_ARTICLE_STARTED,
    UPDATE_ARTICLE_FAILED,
    UPDATE_ARTICLE_COMPLETED,
} from "../constants";

export const getArticle = (id) => {
    return dispatch => {
        dispatch(getArticlesStarted());
        let requestUrl = `${SERVER_URL}/articles/${id}`;
        fetch(requestUrl)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                dispatch(getArticleCompleted(response));
            })
            .catch(error => { 
                console.log('Error Happened!!');
                console.log(error);
            });
    }
};

const getArticleCompleted = (article) => ({
    type: GET_ARTICLE_COMPLETED,
    payload: { article }
});

export const getArticles = (query) => {
    return dispatch => {
        dispatch(getArticlesStarted());
        let requestUrl = `${SERVER_URL}/articles`;
        if (query) {
            let queryString = [];
            if (query.title) queryString.push(`title=${encodeURI(query.title)}`);
            //TO DO
            queryString = queryString.join('&');
            if (queryString) requestUrl = `${requestUrl}?${queryString}`
        }
        fetch(requestUrl)
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

export const deleteArticle = (id) => {
    return dispatch => {
        let requestUrl = `${SERVER_URL}/articles/${id}`;
        fetch(requestUrl, { method: 'DELETE' })
            .then(response => {
                console.log(response);
                dispatch(getArticles());
            })
            .catch(error => { 
                console.log('Error Happened!!');
                console.log(error);
            });
    }
};

export const updateArticle = (article) => {
    return dispatch => {
        let requestUrl = `${SERVER_URL}/articles/${article['_id']}`;
        // dispatch(updateArticleStarted())
        return fetch(requestUrl, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(article),
        }).then(response => response.json()).then(response => {
            console.log(response);
            // dispatch(updateArticleCompleted(response));
        }).catch(error => { 
            console.log('Error Happened!!');
            console.log(error);
        });
    }
};

const updateArticleStarted = () => ({
    type: UPDATE_ARTICLE_STARTED
});

const updateArticleCompleted = (article) => ({
    type: UPDATE_ARTICLE_COMPLETED,
    payload: { article }
});

const updateArticleFailed = () => ({
    type: UPDATE_ARTICLE_FAILED
});

export const createArticle = (article) => {
    return dispatch => {
        let requestUrl = `${SERVER_URL}/articles`;
        // dispatch(createArticleStarted())
        return fetch(requestUrl, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(article),
        }).then(response => response.json()).then(response => {
            console.log(response);
            // dispatch(createArticleCompleted(response));
        }).catch(error => { 
            console.log('Error Happened!!');
            console.log(error);
        });
    }
};
