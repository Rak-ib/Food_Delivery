import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import route from './Components/Route/Route.jsx'
import StoreContextProvider from './Components/Context/StoreContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <StoreContextProvider>
    <RouterProvider router={route}></RouterProvider>
    </StoreContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
