import { useEffect, useState } from "react";
import makeApiRequest from "../Assets/Apis";
import { useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import SimpleNavbar from "../Components/Navbar";
import UserProfilePallet from "./UserProfilePallet";


function ProfilePage() {
    const { email } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log(email);
        makeApiRequest({
            url: `/user/${email}`,
            onSuccess: (data) => {
                setUser(data);
            },
            onError: (error) => {
                if (error.response && error.response.status === 404) {
                    setUser(null);
                }
            },
        });
    }, [email]);

    return (
        <>
            <SimpleNavbar />
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div style={{ width: "24rem" }} className="text-center">
                    <UserProfilePallet user={user} />
                    <Button href={`/submissions/${email}`} variant="dark" className="mt-3" style={{ width: "100%" }}>
                        View Submissions
                    </Button>
                </div>
            </Container>
        </>
    );

}

export default ProfilePage;
