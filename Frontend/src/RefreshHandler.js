import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// This function checks if the user is authenticated or not, and redirects them to the appropriate page
function RefreshHandler({ setIsAuthenticated }) {
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Get user info from local storage
        if (userInfo) { // If user info exists, set isAuthenticated to true
            setIsAuthenticated(true);
            if (location.pathname === '/') {
                navigate('/dashboard');
            }
        } else { // If user info does not exist, set isAuthenticated to false
            setIsAuthenticated(false);
            if (location.pathname !== '/') {
                navigate('/');
            }
        }
    }, [location, navigate, setIsAuthenticated]);
    return null;
}

export default RefreshHandler;