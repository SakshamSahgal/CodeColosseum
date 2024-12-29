import { Table } from "react-bootstrap";

function UserLogs({ activityData }) {

    if (activityData && activityData.length > 0) {
        return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Timestamp</th>
                        <th>Browser</th>
                        <th>OS</th>
                        <th>IP</th>
                        <th>Device Type</th>
                        <th>Log</th>
                    </tr>
                </thead>
                <tbody>
                    {activityData.map((log, index) => (
                        <tr key={log._id}>
                            <td>{log.email}</td>
                            <td>{new Date(log.timeStamp).toLocaleString()}</td>
                            <td>{log.browserInfo.name}</td>
                            <td>{log.osInfo.name}</td>
                            <td>{log.ip}</td>
                            <td>{log.deviceTypeInfo.name}</td>
                            <td>{log.log}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }

    return <p>No logs found.</p>
}

export default UserLogs;