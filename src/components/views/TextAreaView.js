import React from "react"
import PropTypes from "prop-types"
import Icon from "react-icons-kit"
import {edit, timesCircle, plusCircle, chevronCircleDown} from "react-icons-kit/fa"
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
        inputValue: [],
        inputType: "text",


    };
    static propTypes = {
        inputName: PropTypes.string,
        editingMode: PropTypes.bool,
        inputValue: PropTypes.string,
        inputType: PropTypes.string,
        placeHolder: PropTypes.string,
        onInputChanged: PropTypes.func,
        numberRows: PropTypes.number
    };

    handleInputChanges(text) {

        let newDataSet = text.target.value.split("\n#");
        this.setState({inputValue: newDataSet});
        this.props.onInputChanged(newDataSet);
    }

    render() {
        const {inputName, editingMode, inputValue, numberRows, onInputChanged, placeHolder} = this.props;
        return (
            <div>
                {!editingMode ? (
                        this.state.inputValue.map((item) =>
                            <li>{item}</li>)
                    ) :
                    (<textarea cols={50} rows={numberRows} placeholder={placeHolder} name={inputName}
                               value={this.state.inputValue.join("\n#")}
                               onChange={(text) => this.handleInputChanges(text)}/>)}
            </div>
        );
    }
}
