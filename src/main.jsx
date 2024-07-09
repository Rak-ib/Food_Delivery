import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import route from './Components/Route/Route.jsx'
import StoreContextProvider from './Components/Context/StoreContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreContextProvider>
    <RouterProvider router={route}></RouterProvider>
    </StoreContextProvider>
    
  </React.StrictMode>,
)
