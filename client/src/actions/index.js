import axios from "axios";

// Constants for action-types
export const AppActionTypes = {
    SYNC_NEW_SEARCH_QUERY: 'SYNC_NEW_SEARCH_QUERY',
    UPDATE_ITEMS: 'UPDATE_ITEMS',
    LOAD_MORE_ITEMS: 'LOAD_MORE_ITEMS',
    SET_SORTING: 'SET_SORTING',
    SET_FIELD: 'SET_FIELD',
    TOGGLE_MODAL: 'TOGGLE_MODAL'
};

// Synchronize store with new search-query
export const syncSearchQuery = ({ name, value }) =>
    dispatch=>{
        dispatch({
            type: AppActionTypes.SYNC_NEW_SEARCH_QUERY,
            payload: {value: value, name: name}
        });
        return Promise.resolve();
    };

// update the values of items in state
export const updateItems = result => ({
    type: AppActionTypes.UPDATE_ITEMS,
    payload: { items: result }
});

// Signal for app to allow loading more items.
export const loadMoreItems = () => dispatch => {
    dispatch({
        type: AppActionTypes.LOAD_MORE_ITEMS
    });
    return Promise.resolve();
};

// Update sorting based on new query
export const setSorting = sorting => dispatch => {
    dispatch({
        type: AppActionTypes.SET_SORTING,
        payload: {sorting: sorting}
    });
    return Promise.resolve();
};

// Set a specific field of an entry in items
export const setField = (index, field, value) => ({
    type: AppActionTypes.SET_FIELD,
    payload: { index: index, field: field, value: value }
});

// Toggle display of Modal-component
export const toggleModal = (index) => ({
    type: AppActionTypes.TOGGLE_MODAL,
    payload: { index: index }
});

// Fetch items (with axios) from database and dispatch to updateItems.
export const fetchItems = url => {
    return (dispatch) => {
        return axios.get(url)
            .then(
                response => dispatch(updateItems(response.data.docs))
            )
            .catch(error => {
                console.log('Feil');console.log(error); } );
    };
};