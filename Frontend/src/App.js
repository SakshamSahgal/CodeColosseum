import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage.js';
import Dashboard from './Pages/Dashboard.js';
import PageNotFound from './Assets/PageNotFound';
import AdminConsole from './Pages/AdminPages/AdminConsole.js';
import PrivateRoute from './Assets/PrivateRoute.js';
import Submissions from './Pages/Submissions.js';
import Submission from './Pages/Submission.js';
import ProfilePage from './Pages/ProfilePage.js';
import AdminUsers from './Pages/AdminPages/Users.js';
import UserActivity from './Pages/UserActivity.js';
import About from './Pages/About.js';
import Users from "./Pages/Users.js"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
        <Route path='/admin/console' element={<PrivateRoute element={<AdminConsole />} />} />
        <Route path='/admin/users' element={<PrivateRoute element={<AdminUsers />} />} />
        <Route path='/admin/userActivity/:email' element={<PrivateRoute element={<UserActivity />} />} />
        <Route path='/submissions/:email' element={<PrivateRoute element={<Submissions />} />} />
        <Route path='/submission/:email/:submissionToken' element={<PrivateRoute element={<Submission />} />} />
        <Route path='/users' element={<PrivateRoute element={<Users />} />} />
        <Route path='/profile/:email' element={<PrivateRoute element={<ProfilePage />} />} />
        <Route path='/about' element={<PrivateRoute element={<About />} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;