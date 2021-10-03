# Streamr News
A fully decentralised Chrome plugin news ticker build on top of Streamr message streaming protocol.

## Rationale
This is an experiment aimed at showing the full potential of Streamr as a way to power censorship-resistand, fault-tolerand and encrypted data distribution by leveraging the network effect of several community members running their own node for the benefit of everyone.
We foresee news agencies interested in publishing their articles through Streamr network to take advantage of this template for creating their own system and provide a new service to their users.

## Installation
Just download the most recent release and load it in Chrome by visiting the URL `chrome://extensions`, clicking on *Load Unpacked* and select the *release* directory.

## Development
This extension is made using ReactJS and Chrome internal JS SDK.

In order to run the following plugin, you need to first
`git clone ...this repo...`
then, fetch the required dependencies
`yarn install`
finally, you can either test it in your browser by running
`yarn start`
or build the production version
`yarn build`
and load it in your Chrome Browser by visiting the URL
`chrome://extensions`
and *Load Unpacked* the *build* directory.

## Example client
To show a possible proof of concept, in the *scripts* dir there are two key infrastructure elements:
* an example script for creating a new stream - `yarn create-stream`
* an example client that pulls the most recent news articles using *Mediastack* API and sends them to the stream. A new stream can be created - `yarn publish-stream -k PRIV_KEY -s STREAM_ID`
