import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom";
import Icon from "react-icons-kit"
import {edit, timesCircle, plusCircle, chevronCircleDown, user, rocket, exclamationCircle} from "react-icons-kit/fa"
import {InputView, TextAreaView} from "../index"
import Constants from "../../constants/index"
import '../../App.css';

export default class JobTableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateDataSet: Object.keys(props.dataSet).length !== 0 ? props.dataSet : Constants.InitialDataSet,
            stateEditingMode: props.editingMode,
            buttonName: !props.editingMode ? "Edit Job Details" : "Save Changes",
            tasksLength: 0,
            viewLink: false,
            requirementsLength: 0,
            validateTitle: false,
            validateEmployer: false,
            validateCity: false,
            validateRequr: false,
            validateTasks: false,
        }
    }

    static defaultProps = {
        editingMode: true
    };
    static propTypes = {
        dataSet: PropTypes.object.isRequired,
        viewJobDetails: PropTypes.func,
        deleteRecord: PropTypes.func,
        editRecord: PropTypes.func,
        editingMode: PropTypes.bool,
        addNewCollectionCall: PropTypes.func,
    };

    componentDidMount() {
        if (Object.keys(this.props.dataSet).length !== 0) {
            this.setState({
                tasksLength: this.state.stateDataSet.tasks.length,
                requirementsLength: this.state.stateDataSet.requirements.length,
            })
        }

    }

    changeDataSet() {

        const {stateDataSet, stateEditingMode, viewLink} = this.state;
        if (Object.keys(stateDataSet).length !== 0 && stateDataSet.title !== "" && stateDataSet.employer !== "" && stateDataSet.city !== ""
            && stateDataSet.requirements.length !== 0 && stateDataSet.tasks.length !== 0) {

            if (stateEditingMode) {
                this.setState({viewLink: !viewLink});
                localStorage.setItem("jobCollection", JSON.stringify(stateDataSet));
                setTimeout(() => {
                    this.setState({buttonName: "Edit Job Details", stateEditingMode: !stateEditingMode});
                    this.props.addNewCollectionCall(stateDataSet);
                }, 4000)
            }
            else {
                this.setState({buttonName: "Save Changes"})
            }
        } else {
            this.setState({
                validateTitle: true,
                validateEmployer: true,
                validateCity: true,
                validateRequr: true,
                validateTasks: true,
            })
        }

    }

    changeInputs(key, text) {
        const {stateDataSet} = this.state;
        switch (key) {
            case "title":
                if (text !== "") {
                    stateDataSet.title = text;
                    this.setState({validateTitle: false})
                } else {
                    this.setState({validateTitle: true})
                }
                break;
            case "employer":
                if (text !== "") {
                    stateDataSet.employer = text;
                    this.setState({validateEmployer: false})
                } else {
                    this.setState({validateEmployer: true})
                }
                break;
            case "city":
                if (text !== "") {
                    stateDataSet.city = text;
                    this.setState({validateCity: false})
                } else {
                    this.setState({validateCity: true})
                }
                break;
            case "tasks":
                if (text.length !== 0) {
                    stateDataSet.tasks = text;
                    this.setState({validateTasks: false})
                } else {
                    this.setState({validateTasks: true})
                }
                break;
            case "requirs":
                if (text.length !== 0) {
                    stateDataSet.requirements = text;
                    this.setState({validateRequr: false})
                } else {
                    this.setState({validateRequr: true})
                }
                break;
        }
    }


    render() {
        const {dataSet, editingMode, actions, state} = this.props;
        const {
            stateDataSet, stateEditingMode, buttonName, tasksLength, requirementsLength, validateCity, validateEmployer,
            validateRequr, validateTasks, validateTitle, viewLink,
        } = this.state;
        return (
            <table className={"jobDetailsViewTableStyle"}>
                {viewLink ? <div className={"notify"}> Data Stored SuccessFully </div> : null}
                <table className={"headerTable"}>
                    <tbody>
                    <tr>
                        <tr>
                            <th className={"jobDetailsHeaderStyle"}>{<InputView validationError={validateTitle}
                                                                                placeHolder={"Job Title"}
                                                                                editingMode={stateEditingMode}
                                                                                inputValue={stateDataSet.title}
                                                                                inputName={stateDataSet.title}
                                                                                onInputChanged={(text) => {
                                                                                    this.changeInputs("title", text)
                                                                                }}/>}</th>
                        </tr>
                        <tr>
                            <th>{<InputView placeHolder={"Employer Name"} validationError={validateEmployer}
                                            iconName={user} showIcon={true} editingMode={stateEditingMode}
                                            inputValue={stateDataSet.employer} inputName={stateDataSet.employer}
                                            onInputChanged={(text) => this.changeInputs("employer", text)}/>}
                                {<InputView iconName={rocket} placeHolder={"City"} validationError={validateCity}
                                            showIcon={true} editingMode={stateEditingMode}
                                            inputValue={stateDataSet.city} inputName={stateDataSet.city}
                                            onInputChanged={(text) => this.changeInputs("city", text)}/>}</th>
                        </tr>
                        <tr>
                            <th align="right">
                                <div>{editingMode ? <button id={"buttonID"} onClick={() => {
                                    this.changeDataSet()
                                }}
                                                            className={"button"}>{buttonName}</button> : null}</div>
                            </th>
                        </tr>
                    </tr>
                    </tbody>
                </table>
                <table className={"bodyTable"}>
                    <thead>
                    <tr>
                        <td><h3>Requirements {validateRequr ? (
                            <Icon className={"validIconStyle"} icon={exclamationCircle}/>) : null}</h3></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><TextAreaView
                            placeHolder={"Enter job requirements, to form list press enter and start your text with # symbol"}
                            numberRows={requirementsLength + 5} editingMode={stateEditingMode}
                            onInputChanged={(req_object) => {
                                this.changeInputs("requirs", req_object)
                            }} inputValue={stateDataSet.requirements}/></td>
                    </tr>
                    </tbody>
                    {stateEditingMode ? (<tfoot>
                    <tr>
                        <td>
                            <h8>*To form the requirements list please press Enter and start with #</h8>
                        </td>
                    </tr>
                    </tfoot>) : null}
                </table>
                <table className={"footerTable"}>
                    <thead>
                    <tr>
                        <td><h3>Tasks {validateTasks ? (
                            <Icon className={"validIconStyle"} icon={exclamationCircle}/>) : null}</h3></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><TextAreaView
                            placeHolder={"Enter job tasks, to form list press enter and start your text with # symbol"}
                            numberRows={tasksLength + 5} editingMode={stateEditingMode}
                            onInputChanged={(task_object) => {
                                this.changeInputs("tasks", task_object)
                            }} inputValue={stateDataSet.tasks}/></td>
                    </tr>
                    </tbody>
                    {stateEditingMode ? (<tfoot>
                    <tr>
                        <td>
                            <h8>*To form the tasks list please press Enter and start with #</h8>
                        </td>
                    </tr>
                    </tfoot>) : null}
                </table>

            </table>
        );
    }
}
