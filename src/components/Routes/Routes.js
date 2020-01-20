import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import Home from "../../pages/Home";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {HistoryView} from "../index"
import JobDetails from "../../pages/JobDetails"
import CreateNewJob from "../../pages/CreateNewJob"
import * as JobMarketActions from "../../actoins/job_market_actions";

class Routes extends React.Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        this.props.actions._onRequestGetJobCollection();

    }
    render() {
        const {actions, state} = this.props;
        return (
            <Router>
                <HistoryView pathname={"/"} pageName={"Home"}/>
                <Route exact path={"/"} component={() => <Home actions={actions} state={state}/>}/>
                <Route path={"/jobdetails"} component={() => <JobDetails actions={actions} state={state}/>}/>
                <Route path={"/createnewjob"} component={() => <CreateNewJob actions={actions} state={state}/>}/>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapActionsToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign(
            {}, JobMarketActions), dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Routes));

