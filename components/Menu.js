import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Button from "react-bootstrap/Button";
import { db } from "../firebase";
import { signOut, getAuth } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

export default (props) => {
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

    const handleLogin = async () => {
        navigate("/login");
    };

    return (
        <div className="forPhone">
            <h3>
                <Link to="/">Rit's Chat</Link>
            </h3>

            {user ? (
                <Menu {...props}>
                    <Link to="/poster" className="menu-item">
                        Poster
                    </Link>
                    <Link to="/Home" className="menu-item">
                        Chat
                    </Link>

                    <Link to="/Calendar" className="menu-item">
                        Calendar
                    </Link>
                    <Link to="/profile" className="menu-item">
                        Profile
                    </Link>
                    <Button
                        className="btn"
                        onClick={handleSignout}
                        variant="danger"
                    >
                        Logout
                    </Button>
                </Menu>
            ) : (
                <Menu {...props}>
                    <Link to="/poster" className="menu-item">
                        Poster
                    </Link>
                    <Link to="/register" className="menu-item">
                        Register
                    </Link>
                    <Button
                        className="btn"
                        onClick={handleLogin}
                        variant="success"
                    >
                        Login
                    </Button>
                </Menu>
            )}
        </div>
    );
};
