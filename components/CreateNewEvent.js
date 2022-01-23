import React, { useState} from "react";
import Button from "react-bootstrap/Button";
import Datetime from "react-datetime";
import {
    collection,
    addDoc,
} from "firebase/firestore";
import { db} from "../firebase";
import Modal from "react-bootstrap/Modal";

const CreateNewEvent = ({user}) => {
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [start, handleStartDateChange] = useState(new Date());
    const [end, handleEndDateChange] = useState(new Date());
    const [title, handleTitleChange] = useState("");
    const [formatting, handleFormattingChange] = useState("");
    const [place, handlePlaceChange] = useState("");
    const handleClose = () => setShow(false);
    const handleNew = async () => {
        const collectionRef = collection(db, "allEvents");
        const payload = {
            title: title,
            start: start.toString(),
            end: end.toString(),
            format: formatting,
            place: place,
            prof: user.name
        };
        await addDoc(collectionRef, payload);
        setShow(false);
    };

    console.log(user);
    return (
        <div className="calendar_add">
        {user.isProf ? (
            <>
            <Button variant="primary" onClick={handleShow}>
                Add New Event
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <input
                            type="text"
                            placeholder="Add Title"
                            value={title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                        />
                        <Datetime
                            placeholder="Start Date"
                            value={start}
                            onChange={handleStartDateChange}
                        />
                        <Datetime
                            placeholder="End Date"
                            value={end}
                            onChange={handleEndDateChange}
                        />
                        <input
                            type="text"
                            placeholder="Add Class Format"
                            value={formatting}
                            onChange={(e) =>
                                handleFormattingChange(e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Add Classroom or URL"
                            value={place}
                            onChange={(e) => handlePlaceChange(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleNew}>
                        Add Event
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        ):null}
        </div>
    );
};

export default CreateNewEvent;
