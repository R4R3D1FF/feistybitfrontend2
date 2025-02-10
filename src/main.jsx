import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="1003234318887-q3tvci97dd2ost49e7dqlb55s9abocps.apps.googleusercontent.com">
    <StrictMode>
      <App />
    </StrictMode>,
  </GoogleOAuthProvider>
)

