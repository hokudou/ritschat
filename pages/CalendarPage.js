import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { db, auth } from "../firebase";
import {
    onSnapshot,
    collection,
    getDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateNewEvent from "../components/CreateNewEvent";

const CalendarPage = () => {
    const locales = {
        "en-US": require("date-fns/locale/en-US"),
    };
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });
    const [allEvents, setAllEvents] = useState([]);
    const [event, handleEventChange] = useState("");
    const [showEvent, setShowEvent] = useState(false);
    const handleCloseEvent = () => setShowEvent(false);
    const handleShowEvent = () => setShowEvent(true);
    const [user, setUser] = useState(null);

    useEffect(
        () =>
            onSnapshot(collection(db, "allEvents"), (snapshot) =>
                setAllEvents(
                    snapshot.docs.map((doc) => ({
                        title: doc.data().title,
                        formatting: doc.data().format,
                        place: doc.data().place,
                        start: moment(doc.data().start).toDate(),
                        end: moment(doc.data().end).toDate(),
                        prof: doc.data().prof,
                        id: doc.id,
                    }))
                )
            ),
        []
    );

    useEffect(() => {
        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
                setUser(docSnap.data());
            }
        });
    }, []);

    const handleSelected = (event) => {
        handleShowEvent(event);
        handleEventChange(event);
    };

    const handleDeleteEvent = async (id) => {
        const docRef = doc(db, "allEvents", id);
        await deleteDoc(docRef);
        handleCloseEvent(event);
    };
    const today = new Date();
    return user ? (
        <div className="calendar_whole">
            <div className="CalendarPage">
                <CreateNewEvent user={user} />

                <Calendar
                    localizer={localizer}
                    events={allEvents}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={(event) => handleSelected(event)}
                    style={{ height: 600, margin: "20px" }}
                    defaultView="week"
                    min={
                        new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDate(),
                            9
                        )
                    }
                    max={
                        new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDate(),
                            20
                        )
                    }
                />
                <Modal show={showEvent} onHide={handleCloseEvent}>
                    <Modal.Header closeButton>
                        <Modal.Title>Class Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            TItle: {event.title}
                            <br />
                            Professor: {event.prof}
                            <br />
                            Class Format: {event.formatting}
                            <br />
                            Class Place(URL):{" "}
                            <a href={event.place}>{event.place}</a>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {user.isProf ? (
                            <>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteEvent(event.id)}
                                >
                                    Delete
                                </Button>
                            </>
                        ) : null}
                        <Button variant="secondary" onClick={handleCloseEvent}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    ) : null;
};

export default CalendarPage;
