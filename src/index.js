import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CopyrightIcon from '@material-ui/icons/Copyright';

const Footer = () => (
    <footer className="footer">
      <p>ABC Technologies Pvt Ltd. <CopyrightIcon style={{width:'14px', height:'14px'}}/>2019</p>
    </footer>
  );
  
  ReactDOM.render([<App className="content" />, <Footer/>], document.getElementById("root"));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
