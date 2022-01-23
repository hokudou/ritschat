import React from "react";
import Img from "../kyoto.jpg";
import MediaQuery from "react-responsive";

const User = ({ user, selectUser }) => {
    return (
        <>
            <MediaQuery query="(max-width: 767px)">
                <div className="forPhoneUser">
                    <div
                        className="phone_user_wrapper"
                        onClick={() => selectUser(user)}
                    >
                        <div className={"phone_user_status"}>
                                {user.isOnline ? (<div className="phoneOnline"/>) : (<div className="phoneOffline"/>)}
                                 </div>
                        <img
                            src={user.avatar || Img}
                            alt="avatar"
                            className="avatar"
                        />

                        <h4>
                            {user.name} ({user.isProf ? <>P</> : <>S</>})
                        </h4>
                    </div>
                </div>
            </MediaQuery>
            <MediaQuery query="(min-width: 767px)">
                <div className="user_wrapper" onClick={() => selectUser(user)}>
                    <div className="user_info">
                        <div className="user_detail">
                            <img
                                src={user.avatar || Img}
                                alt="avatar"
                                className="avatar"
                            />
                            <h4>
                                {user.name} (
                                {user.isProf ? <>Professor</> : <>Student</>})
                            </h4>
                        </div>
                            <div className={"user_status"}>
                                {user.isOnline ? (<div className="online"/>) : (<div className="offline"/>)}
                                 </div>
                    </div>
                </div>
            </MediaQuery>
        </>
    );
};

export default User;
