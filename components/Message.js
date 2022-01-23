import React from "react";
import Moment from "react-moment";

const Message = ({ msg, user1, toLang }) => {
    let apiKey = "AIzaSyCTroqd66iEkm0hsqbz2JKKF-GtYJkPtOw";
    if(toLang){
        const URL =
        "https://translation.googleapis.com/language/translate/v2?key=" +
        apiKey +
        "&q=" +
        encodeURI(msg.text) +
        "&target=" +
        toLang;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", [URL], false);
    xhr.send();
    if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        msg.text=(res["data"]["translations"][0]["translatedText"]);
    }
    }
    return (
        <div className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}>
            <p className={msg.from === user1 ? "me" : "friend"}>
                {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
                {msg.text}
                <br />
                <small>
                    <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                </small>
            </p>
        </div>
    );
};

export default Message;
