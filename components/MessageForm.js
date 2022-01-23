import React from 'react';
import Attachment from "./svg/Attachment";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";



const MessageForm = ({handleSubmit, text, setText, setImg }) => {
    return (       
      <form className="message_form" onSubmit={handleSubmit}>
        <div className='message_icon'>
        <label htmlFor="img">
          <Attachment />
        </label>
        <input
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          id="img"
          accept="image/*"
          style={{ display: "none" }}
        />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Enter message" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
        </div>
        <div>
          <Button className="btn" onClick={handleSubmit}>Send</Button>
        </div>
      </form>
    );
  };

export default MessageForm;