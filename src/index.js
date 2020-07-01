import React from 'react';
import ReactDOM from 'react-dom';
import Routers from "./routers";
import {BrowserRouter} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Routers />
  </BrowserRouter>,
  document.getElementById('root')
);


serviceWorker.unregister();
