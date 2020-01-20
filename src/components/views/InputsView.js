import React from "react"
import PropTypes from "prop-types"
import Icon from "react-icons-kit"
import {edit, timesCircle, plusCircle, chevronCircleDown, exclamationCircle} from "react-icons-kit/fa"
import '../../App.css';

export default class InputsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: props.inputValue
        }
    }

    static defaultProps = {
        inputName: "",
        editingMode: false,
        inputValue: "",
        inputType: "text",
        validationError: false


    };
    static propTypes = {
        inputName: PropTypes.string,
        editingMode: PropTypes.bool,
        inputValue: PropTypes.string,
        inputType: PropTypes.string,
        placeHolder: PropTypes.string,
        onInputChanged: PropTypes.func,
        showIcon: PropTypes.bool,
        iconName: PropTypes.object,
        validationError: PropTypes.bool
    };

    handleInputChanges(text) {
        this.setState({inputValue: text.target.value})
        this.props.onInputChanged(text.target.value);
    }

    render() {
        const {inputName, editingMode, inputType, inputValue, onInputChanged, placeHolder, showIcon, iconName, validationError} = this.props;
        return (
            <div>
                {!editingMode ? (<h4>&nbsp;&nbsp;{showIcon ? (
                        <Icon className={"iconStyle"} icon={iconName}/>) : null} {inputValue}</h4>)
                    : (<div><input placeholder={placeHolder} type={inputType} name={inputName}
                                   value={this.state.inputValue} onChange={(text) => this.handleInputChanges(text)}/>
                        {validationError ? (<Icon className={"validIconStyle"} icon={exclamationCircle}/>) : null}
                    </div>)}
            </div>
        );
    }
}
