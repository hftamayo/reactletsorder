import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { AuthContextProvider } from './components/FoodOrder/store/auth-context';

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root')
  
    //<App />,
  //document.getElementById('root') 
);

