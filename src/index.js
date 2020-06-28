import React from 'react';
import ReactDOM from 'react-dom';
import Routers from "./routers";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
