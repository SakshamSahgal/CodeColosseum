import { useState } from "react";
import { Card, Image } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import AlertBox from "../Components/AlertBox";

function UserProfilePallet({ user }) {

    const [imageError, setImageError] = useState(false); // State to handle image errors

    if (user === null) {
        return (
            <Card style={{ width: "24rem" }} className="text-center shadow-sm">
                <Card.Body>
                    <FaUserCircle style={{ width: 96, height: 96 }} className="mb-3" />
                    <AlertBox heading={"User Not Found"} message={"A user by that name is absent from the database, lost to the void of unrecorded entries."} />
                </Card.Body>
            </Card>
        )
    }
    //check if user is an empty object

    else if (Object.keys(user).length === 0) {
        return (
            <Card style={{ width: "24rem" }} className="text-center shadow-sm">
                <Card.Body>
                    <FaUserCircle style={{ width: 96, height: 96 }} className="mb-3" />
                    <Card.Title>Loading...</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                    {user.LastVisited && (
                        <Card.Text>
                            Last Activity: Loading...
                        </Card.Text>
                    )}
                </Card.Body>
            </Card>
        )
    } else {
        return (<Card style={{ width: "24rem" }} className="text-center shadow-sm">
            <Card.Body>
                {user.picture && !imageError ? (
                    <Image
                        src={user.picture}
                        roundedCircle
                        alt={user.name}
                        style={{ width: "96px", height: "96px" }}
                        className="mb-3"
                        onError={() => setImageError(true)} // Set error state if the image fails to load
                    />
                ) : (
                    <FaUserCircle style={{ width: 96, height: 96 }} className="mb-3" />
                )}
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                {user.LastVisited && (
                    <Card.Text>
                        Last Activity: {new Date(user.LastVisited).toLocaleString()}
                    </Card.Text>
                )}
            </Card.Body>
        </Card>)
    }
}

export default UserProfilePallet;