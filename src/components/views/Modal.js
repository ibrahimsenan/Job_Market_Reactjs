import React, {Component} from 'react';

class Modal extends Component {
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="backdrop">
                <div className="modal">
                    {this.props.children}

                    <div className="footer">
                        <button onClick={this.props.onApprove}>Delete</button>
                        <button onClick={this.props.onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;