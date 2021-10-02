import React, { useEffect, useState } from "react";
import StreamrClient from "streamr-client";
import DOMPurify from "dompurify";
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const DEBUG = true;
  
  useEffect(() => {
    const subscribeToStream = async () => {
      const wallet = StreamrClient.generateEthereumAccount();
      const client = new StreamrClient({
          auth: {
              privateKey: wallet.privateKey
          }
      });
      if (DEBUG) console.log("Subscribing...");

      await client.subscribe({
        stream: "0xE7fAdA205524166349969fAE5bdCC2a174afF1d6/news",
      },
      (message, metadata) => {
        console.log("message received", message);

        var cleanMsg = DOMPurify.sanitize(message);
        setMessages((messages) => [...messages, cleanMsg]);
      });

      if (DEBUG) console.log("Subscribed");
    };
    subscribeToStream();
  }, []);

  return (
    <div id="modal">
      <div id="url">
        <h1 id="urlLabel">Enter your stream URL:</h1>
        <input type="url" id="urlInput" />
        <button type="submit" id="urlButton">Submit</button>
      </div>
      <div id="ticker">
        <div id="ticker-title">
          <div id="brand"><i class="fa fa-newspaper-o"></i>Latest News</div>
          <div id="alert"><i class="fa fa-warning"></i>Source: CNN</div>
        </div>
        <div id="scroll"></div>
      </div>
    </div>
  );
}

export default App;
