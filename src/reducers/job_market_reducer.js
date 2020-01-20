// getting jobs collections value Reducer

import {
    GET_Collection_DataSet_PENDING,
    GET_Collection_DataSet_FULFILLED,
    GET_Collection_DataSet_REJECTED,

    POST_Collection_DataSet_PENDING,
    POST_Collection_DataSet_FULFILLED,
    POST_Collection_DataSet_REJECTED,

    PUT_Collection_DataSet_PENDING,
    PUT_Collection_DataSet_FULFILLED,
    PUT_Collection_DataSet_REJECTED,

    DELETE_Collection_DataSet_PENDING,
    DELETE_Collection_DataSet_FULFILLED,
    DELETE_Collection_DataSet_REJECTED,

    Change_View_State,
} from '../actoins/types';

const initialState = {
    dataSetRequestState: {
        fetching: false,
        fetched: false,
        error: null,
        data: {},
    },

    requestPostDataSet: {
        fetching: false,
        fetched: false,
        updatingMode: true,
        cleanDataView: {
            _id: "",
            title: "",
            employer: "",
            city: "",
            requirements: [],
            tasks: []
        },
        error: null,
        data: {},
    },

    requestUpdateDataSet: {
        fetching: false,
        fetched: false,
        error: null,
        data: {},
    },

    Change_View_State: true,

};
const cleanDataView = {
    _id: "",
    title: "",
    employer: "",
    city: "",
    requirements: [],
    tasks: []
};
const reducer = (state = initialState, action) => {

    switch (action.type) {

        // GET DATASET PENDING REQUESTS
        case GET_Collection_DataSet_PENDING: {
            console.log("GET_Collection_DataSet_PENDING");
            return {
                ...state,
                dataSetRequestState: {...state.dataSetRequestState, fetching: true, fetched: false, error: null},
            }
        }
        case GET_Collection_DataSet_FULFILLED: {
            console.log("GET_Collection_DataSet_FULFILLED");
            return {
                ...state,
                dataSetRequestState: {
                    ...state.dataSetRequestState,
                    fetching: false,
                    fetched: true,
                    error: null,
                    data: action.payload
                },
            }
        }
        case GET_Collection_DataSet_REJECTED: {
            console.log("GET_Collection_DataSet_FULFILLED");
            return {
                ...state,
                dataSetRequestState: {...state.dataSetRequestState, fetching: false, error: action.payload}
            }
        }

        // POST DATASET PENDING REQUESTS
        case POST_Collection_DataSet_PENDING: {
            return {
                ...state,
                requestPostDataSet: {
                    ...state.requestPostDataSet,
                    updatingMode: true,
                    fetching: true,
                    fetched: false,
                    error: null
                },
            }
        }
        case POST_Collection_DataSet_FULFILLED: {
            return {
                ...state,
                requestPostDataSet: {
                    ...state.requestPostDataSet,
                    fetching: false,
                    updatingMode: false,
                    cleanDataView: cleanDataView,
                    fetched: true,
                    error: null,
                    data: action.payload
                },
                dataSetRequestState: {
                    ...state.dataSetRequestState,
                    fetching: false,
                    fetched: true,
                    error: null,
                    data: action.payload
                },
            }
        }
        case POST_Collection_DataSet_REJECTED: {
            return {
                ...state,
                requestPostDataSet: {
                    ...state.requestPostDataSet,
                    fetching: false,
                    updatingMode: true,
                    error: action.payload
                }
            }
        }

        // PUT DATASET PENDING REQUESTS
        case PUT_Collection_DataSet_PENDING: {
            return {
                ...state,
                requestUpdateDataSet: {...state.requestUpdateDataSet, fetching: true, fetched: false, error: null},
            }
        }
        case PUT_Collection_DataSet_FULFILLED: {
            return {
                ...state,
                dataSetRequestState: {
                    ...state.dataSetRequestState,
                    fetching: false,
                    fetched: true,
                    error: null,
                    data: action.payload
                },
            }
        }
        case PUT_Collection_DataSet_REJECTED: {
            return {
                ...state,
                requestUpdateDataSet: {...state.requestUpdateDataSet, fetching: false, error: action.payload}
            }
        }

        // Delete DATASET PENDING REQUESTS
        case DELETE_Collection_DataSet_PENDING: {
            return {
                ...state,
                dataSetRequestState: {...state.dataSetRequestState, fetching: true, fetched: false, error: null},
            }
        }
        case DELETE_Collection_DataSet_FULFILLED: {
            console.log("DELETE_Collection_DataSet_FULFILLED");
            return {
                ...state,
                dataSetRequestState: {
                    ...state.dataSetRequestState,
                    fetching: false,
                    fetched: true,
                    error: null,
                    data: action.payload
                },
            }
        }
        case DELETE_Collection_DataSet_REJECTED: {
            return {
                ...state,
                dataSetRequestState: {...state.dataSetRequestState, fetching: false, error: action.payload}
            }
        }

        case Change_View_State: {
            return {...state, Change_View_State: action.payload}
        }
        default:
            return state
    }
};

export default reducer;