import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // 🟢 Redux-Provider importieren

import App from './App.jsx';
import { store } from './state/store'; // 🟢 deinen Store importieren

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* 🟢 Store hier übergeben */}
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);


