import React from "react"
import {JobTableView} from "../components"
import JobDataSet from "../constants/dataSet"
import Constants from "../constants/index"
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

class JobDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleUpdateJobCollection(newJobCollection) {
        const {recordIndex, jobDataSetProps, editingModeProps} = this.props.location;
        let storedRecordIndex;
        if (recordIndex !== undefined) {
            storedRecordIndex = recordIndex
        } else {
            storedRecordIndex = JSON.parse(localStorage.getItem("jobCollectionIndex"));
        }
        this.props.actions._onRequestUpdateJobCollection(newJobCollection, storedRecordIndex)
        this.props.actions.changeCurrentView(true)
    }

    render() {
        const {recordIndex, jobDataSetProps, editingModeProps} = this.props.location;
        console.log("location", this.props.state);
        let myLocalDataStore;
        let myLocalIndex;
        if (jobDataSetProps == undefined) {
            myLocalDataStore = JSON.parse(localStorage.getItem("jobCollection"));
            myLocalIndex = JSON.parse(localStorage.getItem("jobCollectionIndex"));
            if (myLocalDataStore === undefined) {
                localStorage.setItem("jobCollection", JSON.stringify(Constants.InitialDataSet));
                myLocalDataStore = JSON.parse(localStorage.getItem("jobCollection"));
                myLocalIndex = JSON.parse(localStorage.getItem("jobCollectionIndex"));
            }
        } else {
            localStorage.setItem("jobCollection", JSON.stringify(jobDataSetProps));
            localStorage.setItem("jobCollectionIndex", JSON.stringify(recordIndex));
            myLocalDataStore = this.props.state.dataSetRequestState.data[recordIndex];
        }
        return (
            <div className={"JobDetailsContainer"}><JobTableView editingMode={this.props.state.Change_View_State}
                                                                 addNewCollectionCall={(newJobCollection) => {
                                                                     this.handleUpdateJobCollection(newJobCollection)
                                                                 }}
                                                                 dataSet={myLocalDataStore}/></div>
        );
    }
}

export default withRouter(JobDetails)