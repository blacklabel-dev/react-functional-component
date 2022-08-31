import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { IconButton } from "@material-ui/core";
import { FaTelegramPlane } from "react-icons/fa";
import * as data from "./messages.json";
import TextField from "./components/inputs/TextField";

/**
 * Start:
 * - Fork the repo
 * - Read and complete the objectives
 * - Send the forked repo link to whoever provided you with the assessment
 *
 * Objective:
 * - Create a form that includes the following inputs:
 *    * message, author and a submit button
 * - Once the user clicks on the submit button, it will
 *   add the message to the end of the current list
 *
 * BONUS:
 * - Match styling of the current components
 * - Add validation to prevent user from submitting a form without
 *   a name or author
 *
 * Additional Information:
 * - Attack it however you want, e.g., use Formik or any other npm package
 */
// Functional component
const Message = (props) => {
  return (
    <div className="message-container">
      <p>"{props.text}"</p>
      <div className="details-container">
        <small>
          Sent by <b>{props.sentBy}</b>
        </small>
      </div>
    </div>
  );
};

// Main App component
// renders a list of Messages using data from messages.json
const App = (props) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sentBy, setSentBy] = useState("");
  const [errMsg, setErrMsg] = useState({
    text: "",
    sentBy: ""
  });

  const validationForms = () => {
    let errMsg0 = {
      text: "",
      sentBy: ""
    };
    if (!text.trim()) {
      errMsg0 = {
        ...errMsg0,
        text: "Please enter your message."
      };
    }
    if (!sentBy.trim()) {
      errMsg0 = {
        ...errMsg0,
        sentBy: "Please enter your name."
      };
    }
    setErrMsg(errMsg0);

    if (errMsg0.text || errMsg0.sentBy) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = () => {
    if (validationForms()) {
      setErrMsg({
        text: "",
        sentBy: ""
      });
      const messages0 = [
        ...props.messages,
        {
          text: text,
          sentBy: sentBy
        }
      ];
      setMessages(messages0);
    }
  };

  useEffect(() => {
    setMessages(props.messages);
  }, [props.messages]);

  return (
    <div>
      <h2>Message List</h2>
      {messages.map((message, i) => (
        <Message
          key={`message-${i}`}
          text={message.text}
          sentBy={message.sentBy}
        />
      ))}
      <div className="message-container submit-form">
        <div className="input-msg">
          <TextField
            className="message-input"
            placeholder="Message..."
            name="message"
            onChange={(e) => setText(e.target.value)}
            errormessage={errMsg.text}
          />
        </div>
        <div className="input-msg">
          <TextField
            className="author-input"
            placeholder="Author..."
            name="autor"
            onChange={(e) => setSentBy(e.target.value)}
            errormessage={errMsg.sentBy}
          />
        </div>
        <div className="submit-btn">
          <IconButton color="primary" onClick={onSubmit}>
            <FaTelegramPlane />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

render(<App messages={data.messages} />, document.getElementById("root"));
