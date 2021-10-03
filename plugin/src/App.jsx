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
          <div id="brand">
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="newspaper" class="svg-inline--fa fa-newspaper fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M552 64H112c-20.858 0-38.643 13.377-45.248 32H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h496c13.255 0 24-10.745 24-24V88c0-13.255-10.745-24-24-24zM48 392V144h16v248c0 4.411-3.589 8-8 8s-8-3.589-8-8zm480 8H111.422c.374-2.614.578-5.283.578-8V112h416v288zM172 280h136c6.627 0 12-5.373 12-12v-96c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v96c0 6.627 5.373 12 12 12zm28-80h80v40h-80v-40zm-40 140v-24c0-6.627 5.373-12 12-12h136c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H172c-6.627 0-12-5.373-12-12zm192 0v-24c0-6.627 5.373-12 12-12h104c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H364c-6.627 0-12-5.373-12-12zm0-144v-24c0-6.627 5.373-12 12-12h104c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H364c-6.627 0-12-5.373-12-12zm0 72v-24c0-6.627 5.373-12 12-12h104c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H364c-6.627 0-12-5.373-12-12z"></path></svg>
            Latest News</div>
          <div id="alert">Source: Mediastack</div>
        </div>
        <div id="scroll"></div>
      </div>
    </div>
  );
}

export default App;
