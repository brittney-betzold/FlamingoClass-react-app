import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById("root");
const rootElement = ReactDOM.createRoot(root);
rootElement.render(<App />);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
