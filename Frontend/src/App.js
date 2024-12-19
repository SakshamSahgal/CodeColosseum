
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleAuth } from './Assets/GoogleAuth';
import Dashboard from './Pages/Dashboard.js';
import PageNotFound from './Assets/PageNotFound';
import RefreshHandler from './RefreshHandler.js';
import { useState } from 'react';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" />
  }

  return (
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<GoogleAuth />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;