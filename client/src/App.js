import axios from "axios";
import "firebase/messaging";
import { useState } from "react";
import "./App.css";
import "./firebase-messaging-sw";

function App() {
  const [token, setToken] = useState();

  const send = async () => {
    console.log("hi");

    setToken(localStorage.getItem("token"));

    await axios.post("http://localhost:4000/api/v1/send", {
      fcmToken: token,
      // "fhdxTc2KHXhdmC8g6WGr_f:APA91bEm3TkybB6YNR4Os0WPEmdpa8n-nEAMPcTCOqZ_nvTvPs4UIxssIbBBf0qJblQtfFAOUxJUDxiMr9Vuyr7eu-L-hCHIshZoLU-5yole8fCQznqezWY74f91vL0Ko2ic8SqDt2w1",
    });
  };

  return (
    <div className="App">
      <button onClick={(e) => send()}>send</button>
      <p>{token && token}</p>
    </div>
  );
}

export default App;
