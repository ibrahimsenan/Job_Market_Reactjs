import React from "react"
import PropTypes from "prop-types"
import Icon from "react-icons-kit"
import {Link, NavLink} from "react-router-dom"
import {edit, timesCircle, plusCircle, chevronCircleDown} from "react-icons-kit/fa"
import '../../App.css';

export default class JobTableComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        dataSet: PropTypes.object.isRequired,
        viewJobDetails: PropTypes.func,
        deleteRecord: PropTypes.func,
        editRecord: PropTypes.func,
        addNewRecord: PropTypes.func,
    };

    render() {
        return (
            <table className={"jobsTable"}>
                <thead>
                <tr>
                    <th colSpan={7}>
                        <div className={"buttonLinkDiv"}><NavLink className={"buttonLink"} to={"/createnewjob"}><Icon
                            icon={plusCircle}/> Add New Job</NavLink></div>
                    </th>
                </tr>
                <tr>
                    <th>#</th>
                    <th>Job Title</th>
                    <th>Company Recruiter</th>
                    <th>Location</th>
                    <th colSpan={3}>Action</th>
                </tr>
                </thead>
                <tbody>
                {this.props.dataSet.length > 0 ? (
                    this.props.dataSet.map((recruitingDataSet, index) =>
                        <tr key={recruitingDataSet._id}>
                            <td>{recruitingDataSet._id}</td>
                            <td>{recruitingDataSet.title}</td>
                            <td>{recruitingDataSet.employer}</td>
                            <td>{recruitingDataSet.city}</td>
                            <td>
                                <div onClick={() => this.props.editRecord(false)}><NavLink exact to={{
                                    pathname: "/jobdetails",
                                    recordID: recruitingDataSet._id,
                                    recordIndex: index,
                                    jobDataSetProps: recruitingDataSet,
                                    editingModeProps: true
                                }} className={"controlButtonLink"}><Icon icon={edit}/></NavLink></div>
                            </td>
                            <td>
                                <button id={"deleteButton"} onClick={() => {
                                    this.props.deleteRecord(recruitingDataSet._id, index)
                                }} className={"button"}><Icon icon={timesCircle}/></button>
                            </td>
                            <td>
                                <div onClick={() => this.props.viewJobDetails(true)}><NavLink to={{
                                    pathname: "/jobdetails",
                                    recordID: recruitingDataSet._id,
                                    recordIndex: index,
                                    jobDataSetProps: recruitingDataSet,
                                    editingModeProps: false
                                }} className={"controlButtonLink"}><Icon icon={chevronCircleDown}/></NavLink></div>
                            </td>
                        </tr>
                    )
                ) : <tr>
                    <td colSpan={4}>There are no new jobs available at the moment!</td>
                    <td colSpan={4} rowSpan={1}>
                        <button onClick={() => {
                            this.props.addNewRecord()
                        }}>Create new Position
                        </button>
                    </td>
                </tr>}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={7} className={"tableFooter"}></td>
                </tr>
                </tfoot>
            </table>
        );
    }
}
