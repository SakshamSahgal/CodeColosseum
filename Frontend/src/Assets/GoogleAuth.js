import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa'; // Importing Google icon from react-icons

function GoogleLogin() {

    if (localStorage.getItem('userInfo')) {
        window.location.href = '/dashboard';
    }

    const responseGoogle = async (response) => {
        try {
            if (response.code) {
                console.log("Got code from Google", response.code);
                const res = await axios.get(`/auth/google?code=${response.code}`); // Send code to backend
                console.log(res.data);
                const obj = {
                    token: res.data.token,
                    name: res.data.name,
                    email: res.data.email,
                    picture: res.data.picture
                }
                localStorage.setItem('userInfo', JSON.stringify(obj)); // Save user info in local storage
                window.location.href = '/dashboard'; // Redirect to dashboard
            }
        } catch (error) {
            console.log("error while requesting Google for login", error);
        }
    }

    const Login = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
    });

    return (
        <Button
            onClick={Login}
            variant="danger"
            size="lg"
            className="d-flex align-items-center justify-content-center px-4 py-2"
            style={{
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <FaGoogle size={20} style={{ marginRight: '10px' }}  /> {/* Google Icon */}
             Login with Google
        </Button>
    );
}

function GoogleAuth() {
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID} >
            <GoogleLogin />
        </GoogleOAuthProvider>
    );
}

export { GoogleAuth };