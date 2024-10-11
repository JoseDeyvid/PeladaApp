import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import DrawPlayers from './pages/DrawPlayers/index.jsx';

import {
  BrowserRouter,
  Route,
  Link,
  Routes
} from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/draw-players' element={<DrawPlayers />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
