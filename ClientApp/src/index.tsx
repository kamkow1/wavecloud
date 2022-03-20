import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const baseUrl: string = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const rootElement: HTMLElement = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement);
serviceWorkerRegistration.unregister();
reportWebVitals(console.log);
