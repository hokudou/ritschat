import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { signOut, getAuth } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MediaQuery from "react-responsive";
import Menu from "./Menu";

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const auth = getAuth();

    const handleSignout = async () => {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            isOnline: false,
        });
        await signOut(auth);
        navigate("/login");
    };
    const handleHome = async () => {
        navigate("/Home");
    };
    const handleCalendar = async () => {
        navigate("/calendar");
    };
    const handleProfile = async () => {
        navigate("/profile");
    };
    const handleRegister = async () => {
        navigate("/register");
    };
    const handleLogin = async () => {
        navigate("/login");
    };
    const handlePoster = async () => {
        navigate("/poster");
    };
    return (
        <>
            <MediaQuery query="(max-width: 767px)">
                <Menu width={250} user={user}/>
            </MediaQuery>
            <MediaQuery query="(min-width: 767px)">
                <div className="forPC">
                    <h3>
                        <Link to="/">Rit's Chat</Link>
                    </h3>
                    　　　　　　　
                    <div>
                        <Button
                            className="btn"
                            onClick={handlePoster}
                            variant="secondary"
                        >
                            Poster
                        </Button>
                        {user ? (
                            <>
                                <Button
                                    className="btn"
                                    onClick={handleHome}
                                    variant="secondary"
                                >
                                    Chat
                                </Button>
                                <Button
                                    className="btn"
                                    onClick={handleCalendar}
                                    variant="secondary"
                                >
                                    Calendar
                                </Button>
                                <Button
                                    className="btn"
                                    onClick={handleProfile}
                                    variant="secondary"
                                >
                                    Profile
                                </Button>
                                <Button
                                    className="btn"
                                    onClick={handleSignout}
                                    variant="danger"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    className="btn"
                                    onClick={handleRegister}
                                    variant="secondary"
                                >
                                    Register
                                </Button>
                                <Button
                                    className="btn"
                                    onClick={handleLogin}
                                    variant="success"
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </MediaQuery>
        </>
    );
};

export default Navbar;
