import { useEffect, useState } from "react";
import makeApiRequest from "../Assets/Apis";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import SimpleNavbar from "../Components/Navbar";
import UserProfilePallet from "./UserProfilePallet";
import HeatmapPallet from "../Components/HeatmapPallet";

function ProfilePage() {
    const { email } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
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
            <Container className="d-flex justify-content-center align-items-center mt-5">
                <div style={{ width: "24rem" }} className="text-center mt-5">
                    <UserProfilePallet user={user} />
                    <Button href={`/submissions/${email}`} variant="dark" className="mt-3" style={{ width: "100%" }}>
                        View Submissions
                    </Button>
                </div>
            </Container>
            <Container className="d-flex flex-column align-items-center mt-3">
                <Row className="text-center mt-5">
                    <HeatmapPallet email={email} />
                </Row>

            </Container>
        </>
    );

}

export default ProfilePage;
