import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import  {SockectConextProvider}  from './context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthContextProvider>
      <SockectConextProvider>
        <App />
      </SockectConextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  
)
