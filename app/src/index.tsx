import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import store from './state/store';

// Generate root element and add it to the page
const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);

reportWebVitals();
