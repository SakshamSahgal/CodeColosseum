import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';


function GoogleLogin() {

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

    return (<button onClick={Login}>Login with Google</button>);
}

function GoogleAuth() {
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID} >
            <GoogleLogin />
        </GoogleOAuthProvider>
    );
}

export { GoogleAuth };