import * as React from 'react';
import './App.css';
import LeftPanel from './components/leftPanel';
import RightPanel from './containers/rightPanel';
import {stateStoreService} from './stateStore/StateStore';
import NavBar from './navbar';
import {Route, Redirect , Switch} from 'react-router-dom'
import  App2 from "./App2";

/*interface IappProps {
    loggedInUser: string | null;
}*/

class App extends React.Component<{} ,{}> {
    constructor(props: any){
        super(props);
        // stateStoreService.set('user',this.props.loggedInUser);
       stateStoreService.subscribe(()=>{
            this.forceUpdate();
        });
    }

    public login = ():any =>(
        stateStoreService.get('showLogin') ? <App2 />:<Redirect to={{pathname:'/tree'}} />
    )

    public tree = ()=>(
        <div className="App">
            <LeftPanel user={stateStoreService.get('user')}/>
            <RightPanel />
        </div>
    )

    public render() {
        return(
            <div>
                <NavBar />
                <Route path='/login' render={this.login} />
                <Switch>
                    <Route path="/tree" render={this.tree}/>
                    <Route path="/" render={this.tree}/>
                </Switch>
            </div>
        );
    }
}

export default App;
