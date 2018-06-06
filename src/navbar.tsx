import * as React from 'react';
import {stateStoreService} from './stateStore/StateStore';
import {Link} from "react-router-dom";
import './css/navBar.css';

class NavBar extends React.Component {
    public onclickLoginHandler = () => {
        stateStoreService.set("showLogin",true);
    }

    public onclickLogoutHandler = () => {
        stateStoreService.set("user",null);
    }

    public Login =() => {
        if(stateStoreService.get("user")) {
            return (
                <>
                    <li><span style={{cursor: 'context-menu'}}>hello {stateStoreService.get("user")}</span></li>
                    <li><span onClick={this.onclickLogoutHandler}>Logout</span></li>
                </>
            );
        }
        else {
            return (<Link to='/login'><li><span onClick={this.onclickLoginHandler}>Login</span></li></Link>);
        }
    }

    public render() {
        return (
            <ul className="topnav">
                {this.Login()}
            </ul>);
    }
}

export default NavBar;