import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
    });

    const auth = getAuth();

    const navigate = useNavigate();

    const { name, email, password, error, loading } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true });
        if (!name || !email || !password) {
            setData({ ...data, error: "All fields are required" });
        }
        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await setDoc(doc(db, "users", result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
                isProf: false,
            });
            setData({
                name: "",
                email: "",
                password: "",
                error: null,
                loading: false,
            });
            navigate("/home");
        } catch (err) {
            setData({ ...data, error: err.message, loading: false });
        }
    };

    return (
        <div className="register_whole">
            <section>
                <h3>Create An Account</h3>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="input_container">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input_container">
                        <label htmlFor="name">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input_container">
                        <label htmlFor="name">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    {error ? <p className="error">{error}</p> : null}
                    <div className="btn_container">
                        <Button
                            className="btn"
                            disabled={loading}
                            onClick={handleSubmit}
                            variant="secondary"
                        >
                            {loading ? "Creating ..." : "Register"}
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Register;
