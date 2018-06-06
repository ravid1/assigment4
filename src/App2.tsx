import * as React from 'react';
import './App.css';
import './css/Login.css';
import Login from './components/Login'
import {stateStoreService} from "./stateStore/StateStore";

export enum ERROR_MSG{
    none,
    allGood,
    credentials,
    locked
}

interface IAppState {
    loggedInUser: string | null,
    errorMsg: ERROR_MSG,
    counter: number,
}

class App2 extends React.Component<{},IAppState>{
    constructor(props:any){
        super(props);
       // stateStoreService.set('messages',[{"Time": "", "message": "", "sender": ""}]);

        this.state = {
            counter: 0,
            errorMsg: ERROR_MSG.none,
            loggedInUser: null
        }
    }

    auth = (user:{name: string, password: string}): boolean => {
        console.log(user);
        return user.name == 'ravid' && user.password == '123';
    };

    onLoginSubmitHandler =(user:{name: string, password: string})=>{
        if(this.auth(user)){
            stateStoreService.set('user',user.name);
            stateStoreService.set('showLogin',false);
            this.setState({
                loggedInUser: user.name,
                errorMsg: ERROR_MSG.allGood
            })
        }
        else{
            if(this.state.counter===2){
                this.setState({
                    loggedInUser: null,
                    errorMsg: ERROR_MSG.locked
                });
            }
            else {
                this.setState((prev) => ({
                    loggedInUser: null,
                    errorMsg: ERROR_MSG.credentials,
                    counter:  this.state.counter + 1
                }));
            }
        }
    };

   /* public login = ()=>(
        (this.state.errorMsg==ERROR_MSG.allGood) ?
            <Redirect to={{pathname:'/tree'}} /> : <Login loginStatus={this.state.errorMsg} onSubmit={this.onLoginSubmitHandler}/>
    );

    public tree = ()=>(
        <App loggedInUser={this.state.loggedInUser}/>
    )*/

    public render(){
        let showLogin;
        if(stateStoreService.get('showLogin')){
            showLogin = (
                <div className="login">
                    <Login onSubmit={this.onLoginSubmitHandler} loginStatus={this.state.errorMsg}/>
                </div>
            )
        }
        else{
            showLogin = <></>
        }
        return(
            <>
                {showLogin}
            </>
        )
    }
}

export default App2