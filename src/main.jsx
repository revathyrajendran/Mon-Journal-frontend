import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId='975125601280-6ti50ki5nlj4a99lcgjr982ksht8vl70.apps.googleusercontent.com'>
                <App />
    </GoogleOAuthProvider>
       
    </BrowserRouter>
   
  </StrictMode>,
)
