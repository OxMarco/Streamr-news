const yargs = require("yargs");
const axios = require('axios');
const { StreamrClient } = require("streamr-client");

async function main() {
    const argv = yargs
    .option('key', {
        alias: 'k',
        description: 'Pass your wallet private key to publish to the stream',
        type: 'string',
    })
    .option('stream', {
        alias: 's',
        description: 'Pass your stream ID',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

    if(argv.key == null) throw "Error: key missing";
    if(argv.stream == null) throw "Error: stream ID missing";

    const client = new StreamrClient({
        auth: {
            privateKey: argv.key
        }
    });

    await fetchAndPublish(client, argv.stream);
}

async function fetchAndPublish(client, stream) {
    const response = await axios({
        method: 'get',
        url: 'http://api.mediastack.com/v1/news?access_key=67ce12baef71abeff9f74cf9d81bd4be&limit=1&languages=en',
        headers: {
            'Content-type': 'application/json',
        }
    });

    await client.publish(stream, response.data.data[0]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
