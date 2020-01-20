import React from "react"
import {JobTableView} from "../components"
import JobDataSet from "../constants/dataSet"
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

class CreateNewJob extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static propTypes = {
        updateDataSet: PropTypes.bool
    };

    handleAddNewCollection(newJobCollection) {
        this.props.actions._onRequestPOSTJobCollection(newJobCollection)
    }

    render() {
        console.log("XRENDER", this.props.state.requestPostDataSet.cleanDataView)
        return (
            <div className={"JobDetailsContainer"}>
                <JobTableView addNewCollectionCall={(newJobCollection) => {
                    this.handleAddNewCollection(newJobCollection)
                }}
                              editingMode={true} dataSet={this.props.state.requestPostDataSet.cleanDataView}/></div>
        );
    }
}

export default withRouter(CreateNewJob)