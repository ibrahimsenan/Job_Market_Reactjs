import React from "react";
import {Link, Router, NavLink, Route, Switch, withRouter, Redirect} from "react-router-dom";
import ApiRequestHandler from "../handlers/DataSetRequestHandler";
import JobDetails from "./JobDetails"
import CreateNewJob from "./CreateNewJob"
import Constant from "../constants/index"
import {JobTableComponent, Modal, HistoryView} from "../components"
import JobDataSet from "../constants/dataSet"
import PropTypes from "prop-types";

let myLocalDataStore;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            loading: false,
            textView: "Are you sure you want to delete this job!",
            jobIndex: 0,
            success: false,
            dataSet: this.props.state.dataSetRequestState.data,
            jobID: "",
            listView: []
        }
    }

    componentDidMount() {

        setTimeout(() => {
            console.log("dataSetRequestState", this.props.state.dataSetRequestState.data)
        }, 1000);
    }

    toggleModal(jobID, index) {
        console.log("recruitingDataSet", jobID, index)
        this.setState({
            jobID: jobID,
            jobIndex: index,
            isOpen: !this.state.isOpen,
        });
    };

    approveModal() {
        //let counter =0;
        const {jobIndex, jobID} = this.state
        myLocalDataStore = this.props.state.dataSetRequestState.data;

        this.setState({textView: "Deleting Record ..."});
        setTimeout(() => this.setState({
            textView: "Record Deleted Successfully ..."
        }), 1000);
        setTimeout(() => {
            this.props.actions._onRequestDeleteJobCollection(jobID, jobIndex);
            this.setState({dataSet: this.props.state.dataSetRequestState.data});
            this.setState({
                isOpen: false,
                textView: "Are you sure you want to delete this job!"
            })
        }, 2500)
    }

    static propTypes = {
        pathname: PropTypes.string,
        pageName: PropTypes.func,

    };

    render() {
        const {moderateDataSource, fineDataSource, severeDataSource, actions, state} = this.props;
        const {loading, textView, dataSet, viewLink} = this.state;
        console.log("PROPS,actions, state", state.dataSetRequestState.data);
        return (
            <div>
                <JobTableComponent dataSet={dataSet}
                                   editRecord={(boolValue) => {
                                       this.props.actions.changeCurrentView(boolValue)
                                   }}
                                   viewJobDetails={(boolValue) => {
                                       this.props.actions.changeCurrentView(boolValue)
                                   }}
                                   deleteRecord={(recordID, index) => {
                                       this.toggleModal(recordID, index)
                                   }}/>
                <Modal show={this.state.isOpen} onApprove={() => this.approveModal()}
                       onClose={() => this.toggleModal()}>
                    <h4>{textView}</h4>
                </Modal>
            </div>
        );
    }
}


export default withRouter(HomePage)