import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const location = useLocation();
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Get user info from local storage
    if (userInfo) {
        return element;
    } else {
        if (location.pathname !== '/') {
            return <Navigate to="/" />;
        }
        return null;
    }
}

export default PrivateRoute;