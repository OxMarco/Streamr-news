/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
/* global chrome */
import React, { useEffect, useState } from "react";
import StreamrClient from "streamr-client";
import { useChromeStorageSync } from "use-chrome-storage";
import "./App.css";

function App() {
  const [messages, setMessages] = useChromeStorageSync("messages", []);
  const [stream, setStream] = useChromeStorageSync("stream", "");
  const [streamID, setStreamID] = useState();
  const DEBUG = true;

  // ONLY WORKS AS A CHROME EXTENSION
  const handleSubmit = () => {
    setStream(streamID);
  };

  const reset = () => {
    setStream("");
    setStreamID("");
    setMessages([]);
  };

  console.log("messages", messages);

  useEffect(() => {
    if (stream !== "") {
      const subscribeToStream = async () => {
        const wallet = StreamrClient.generateEthereumAccount();

        const client = new StreamrClient({
          auth: {
            privateKey: wallet.privateKey,
          },
        });
        if (DEBUG) console.log("Subscribing...");

        await client.subscribe(
          {
            stream: stream,
          },
          (message, metadata) => {
            if (DEBUG) console.log("message received", message);

            setMessages((messages) => [...messages, message]);
          }
        );

        if (DEBUG) console.log("Subscribed");
      };
      subscribeToStream();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream]);

  return (
    <div id="modal">
      {stream === "" && (
        <div id="url">
          <h1 id="urlLabel">Enter the stream ID:</h1>
          <input
            type="url"
            id="urlInput"
            value={streamID}
            onChange={(e) => setStreamID(e.target.value)}
          />
          <button type="submit" id="urlButton" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
      {stream !== "" && (
        <div id="ticker">
          <div id="ticker-title">
            <div id="brand">Streamr News Ticker</div>
            <a id="alert" onClick={(e) => reset()}>
              Settings
            </a>
          </div>
          <div id="scroll">
            {messages.map((message, index) => {
              const desc = message.description.split("...").slice(0, 20);

              return (
                <article
                  key={index}
                  style={message.image !== null ? { display: "flex" } : {}}
                >
                  {message.image !== null && (
                    <img
                      src={message.image}
                      alt={message.image}
                      id="featured-image"
                    />
                  )}
                  {message.image !== null && (
                    <div>
                      <div id="featured-story">
                        {new Date(message.published_at).toLocaleDateString()}
                      </div>
                      <a
                        id="featured-headline"
                        target="_blank"
                        rel="noreferrer"
                        href={message.url}
                      >
                        {message.title}
                      </a>
                      <div id="featured-preview">
                        {desc.map((word, index) => {
                          if (index === 19) {
                            return word;
                          }
                          const string = word + " ";
                          return string;
                        })}
                        ...{" "}
                        <a
                          href={message.url}
                          target="_blank"
                          rel="noreferrer"
                          id="readmore"
                        >
                          Read more...
                        </a>
                      </div>
                    </div>
                  )}
                  {message.image === null && (
                    <div id="featured-story">
                      {new Date(message.published_at).toLocaleDateString()}
                    </div>
                  )}
                  {message.image === null && (
                    <div id="featured-headline" href={message.url}>
                      {message.title}
                    </div>
                  )}
                  {message.image === null && (
                    <div id="featured-preview">
                      {desc.map((word, index) => {
                        if (index === 19) {
                          return word;
                        }
                        const string = word + " ";
                        return string;
                      })}
                      ...{" "}
                      <a
                        href={message.url}
                        target="_blank"
                        rel="noreferrer"
                        id="readmore"
                      >
                        Read more...
                      </a>
                    </div>
                  )}
                </article>
              );
            })}
            ;
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
