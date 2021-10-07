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
    .option('limit', {
        alias: 'l',
        description: 'Number of articles to publish to the stream',
        type: 'number',
    })
    .help()
    .alias('help', 'h')
    .argv;

    if(argv.key == null) throw "Error: key missing";
    if(argv.stream == null) throw "Error: stream ID missing";
    const limit = (argv.limit == null) ? 1 : argv.limit;

    const client = new StreamrClient({
        auth: {
            privateKey: argv.key
        }
    });

    await fetchAndPublish(client, argv.stream, limit);
}

async function fetchAndPublish(client, stream, limit) {
    const response = await axios({
        method: 'get',
        url: 'http://api.mediastack.com/v1/news?access_key=67ce12baef71abeff9f74cf9d81bd4be&limit=10&languages=en',
        headers: {
            'Content-type': 'application/json',
        }
    });

    const sendMsg = response.data.data.slice(0, limit).map( async (msg) => {
        await client.publish(stream, msg);
    });

    await Promise.all(sendMsg);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
