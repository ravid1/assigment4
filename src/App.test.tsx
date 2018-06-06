import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App2 from './App2';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App2 />, div);
  ReactDOM.unmountComponentAtNode(div);
});
