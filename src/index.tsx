import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
// import App2 from './App2';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
  <App />
        </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
