import React from 'react';
import './App.css';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import Routes from './components/Routes/Routes'
import {HistoryView} from './components'


export default class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("APP", this.props);

    }


    render() {
        return (
            <div className="App">
                <header>
                    <div className="headerTop">
                        <div className="headerTitel">
                            <img className={"imageStyle"} src={"./logo192.png"}/>
                            Recruitment Portal
                        </div>
                    </div>
                </header>
                <body className="App-body">
                <Routes/>
                </body>
            </div>
        );
    }
}
