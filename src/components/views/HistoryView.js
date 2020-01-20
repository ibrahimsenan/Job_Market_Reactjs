import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import Constant from "../../constants/index"
import Icon from "react-icons-kit"
import {edit, timesCircle, plusCircle, chevronCircleDown, exclamationCircle} from "react-icons-kit/fa"
import '../../App.css';

export default class HistoryView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: props.inputValue
        }
    }

    static defaultProps = {
        pathname: "/",
        pageName: "Home",


    };
    static propTypes = {
        pathname: PropTypes.string,
        pageName: PropTypes.string,

    };


    render() {
        const {pageName, pathname} = this.props;
        if (Constant.routeHistory.length == 0) {
            Constant.routeHistory.push({path: pathname, pageName: pageName});
        } else {
            Constant.routeHistory.forEach(item => {
                if (pathname == item.path) {
                } else {
                    Constant.routeHistory.push({path: pathname, pageName: pageName});
                }
            });
        }
        {/*   <div className={"pathHistory"}>{Constant.routeHistory.map(path => <li><Link to={path.path}>{path.pageName}</Link></li>)}</div>*/
        }
        return (
            <div className={"pathHistory"}>
                <li><Link to={pathname}>{pageName}</Link></li>
            </div>
        );
    }
}
