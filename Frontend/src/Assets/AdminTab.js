import { useState, useEffect } from "react";
import { Tab } from "react-bootstrap";
import axios from "axios";

function AdminTab({ eventKey, title, data }) {


    return (
        <Tab.Pane eventKey={eventKey} title={title}>
            <br />
            <div>
                <h2>{eventKey}</h2>
                <p> {data} </p>
            </div>
        </Tab.Pane>
    );
}

export default AdminTab;