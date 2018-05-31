import * as React from 'react';
import './App.css';
import LeftPanel from './components/leftPanel';
import RightPanel from './containers/rightPanel';
import {stateStoreService} from './stateStore/StateStore';

class App extends React.Component {
    constructor(props: any){
        super(props);
        stateStoreService.set('messages',[{"Time": "", "message": "", "sender": ""}]);
        stateStoreService.subscribe(()=>{
            this.forceUpdate();
        });
    }

  public render() {
      return(
          <div className="App">
              <LeftPanel />
              <RightPanel />
          </div>
      );
  }
}

export default App;
