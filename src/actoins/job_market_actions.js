import CONSTANTS from '../constants';
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
} from './types';

import DataSetRequestHandler from "../handlers/DataSetRequestHandler";

let dataSetRequestHandler = new DataSetRequestHandler();

const Pending = (type) => {
    return {type}
};

const Response = (type, payload,) => {
    return {type, payload}
};


export const _onRequestGetJobCollection = () => {
    return function (dispatch) {
        dispatch(Pending(GET_Collection_DataSet_PENDING));
        dataSetRequestHandler.getJobsDataSetRequester().then(response => {
            dispatch(Response(GET_Collection_DataSet_FULFILLED, response));
            console.log("GET_Collection_DataSet_FULFILLED", response)
        }).catch(function (error) {
            dispatch(Response(GET_Collection_DataSet_REJECTED, error));
            console.log("GET_Collection_DataSet_REJECTED", error)
        });
    }
};

export const _onRequestPOSTJobCollection = (jobCollection) => {
    return function (dispatch) {
        dispatch(Pending(POST_Collection_DataSet_PENDING));
        dataSetRequestHandler.postJobsDataSetRequester(jobCollection).then(response => {
            dispatch(Response(POST_Collection_DataSet_FULFILLED, response));
            console.log("POST_Collection_DataSet_FULFILLED", response)
        }).catch(function (error) {
            dispatch(Response(POST_Collection_DataSet_REJECTED, error));
            console.log("POST_Collection_DataSet_REJECTED", error)
        });
    }
};

export const _onRequestUpdateJobCollection = (jobCollection, jobCollectionIndex) => {
    return function (dispatch) {
        dispatch(Pending(PUT_Collection_DataSet_PENDING));
        dataSetRequestHandler.updateJobsDataSetRequester(jobCollection, jobCollectionIndex).then(response => {
            dispatch(Response(PUT_Collection_DataSet_FULFILLED, response));
            console.log("PUT_Collection_DataSet_FULFILLED", response)
        }).catch(function (error) {
            dispatch(Response(PUT_Collection_DataSet_REJECTED, error));
            console.log("PUT_Collection_DataSet_REJECTED", error)
        });
    }
};

export const _onRequestDeleteJobCollection = (jobCollection_Id, jobCollection_Index) => {
    console.log("_onRequestDeleteJobCollection", jobCollection_Id, jobCollection_Index)
    return function (dispatch) {
        dispatch(Pending(DELETE_Collection_DataSet_PENDING));
        dataSetRequestHandler.deleteJobsDataSetRequester(jobCollection_Id, jobCollection_Index).then(response => {
            dispatch(Response(DELETE_Collection_DataSet_FULFILLED, response));
            console.log("DELETE_Collection_DataSet_FULFILLED", response)
        }).catch(function (error) {
            dispatch(Response(DELETE_Collection_DataSet_REJECTED, error));
            console.log("DELETE_Collection_DataSet_REJECTED", error)
        });
    }
};


export const changeCurrentView = (value) => {

    return function (dispatch) {
        dispatch(Response(Change_View_State, !value));
        console.log("Change_View_State", !value)
    }
};