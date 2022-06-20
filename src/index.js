import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { AuthProvider } from './components/FoodOrder/store/AuthProvider';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
  
    //<App />,
  //document.getElementById('root') 
);

