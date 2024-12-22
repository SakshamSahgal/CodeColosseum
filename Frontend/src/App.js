
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleAuth } from './Assets/GoogleAuth';
import Dashboard from './Pages/Dashboard.js';
import PageNotFound from './Assets/PageNotFound';
import AdminConsole from './Pages/AdminConsole.js';
import PrivateRoute from './Assets/PrivateRoute.js';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GoogleAuth />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
        <Route path='/adminConsole' element={<PrivateRoute element={<AdminConsole />} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;