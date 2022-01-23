import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AuthProvider from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";
import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import CalendarPage from "./pages/CalendarPage";
import Poster from "./pages/Poster";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Fragment>
                    <Navbar />
                    <Routes>
                        <Route exact path="/profile" element={<PrivateRoute />}>
                            <Route exact path="/profile" element={<Profile />}/>
                        </Route>
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/" element={<PrivateRoute />}>
                            <Route exact path="/" element={<Home />} />
                        </Route>
                        <Route exact path="/calendar" element={<PrivateRoute />}>
                            <Route exact path="/calendar" element={<CalendarPage />} />
                        </Route>
                        <Route exact path="/home" element={<Home />} />
                        <Route exact path="/poster" element={<Poster />} />
                    </Routes>
                </Fragment>
            </Router>
        </AuthProvider>
    );
};

export default App;



