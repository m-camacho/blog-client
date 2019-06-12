import {
    SERVER_URL,
    GET_AUTHORS_STARTED,
    GET_AUTHORS_COMPLETED,
    GET_AUTHORS_FAILED,
} from "../constants";

export const getAuthors = (query) => {
    return dispatch => {
        // dispatch(getAuthorsStarted());
        let requestUrl = `${SERVER_URL}/authors`;
        fetch(requestUrl)
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                dispatch(getAuthorsCompleted(response));
            })
            .catch(error => { 
                console.log('Error Happened!!');
                console.log(error);
                // dispatch(getAuthorsFailed(error));
            });
    }
};

const getAuthorsStarted = () => ({
    type: GET_AUTHORS_STARTED
});

const getAuthorsCompleted = (authors) => ({
    type: GET_AUTHORS_COMPLETED,
    payload: { authors }
});

const getAuthorsFailed = (error) => ({
    type: GET_AUTHORS_FAILED,
    payload: { error }
});
