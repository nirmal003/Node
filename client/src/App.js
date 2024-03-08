import axios from "axios";
import "firebase/messaging";
import { useState } from "react";
import "./App.css";
import "./firebase-messaging-sw";

function App() {
  const [token, setToken] = useState();
  const [text, setText] = useState();

  const send = async () => {
    console.log("hi");

    setText("qwertyuiop");
    setToken(localStorage.getItem("token"));

    await axios.post("http://localhost:4000/api/v1/send", {
      fcmToken: token,
    });
  };

  return (
    <div className="App">
      <button onClick={(e) => send()}>send</button>
      <p>{text && text}</p>
      <p>{token && token}</p>
    </div>
  );
}

export default App;
