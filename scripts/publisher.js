const yargs = require("yargs");
const axios = require('axios');
const { StreamrClient } = require("streamr-client");

async function main() {
    const argv = yargs
    .option('key', {
        alias: 'k',
        description: 'Pass your private key to instantiate a new stream',
        type: 'string',
    })
    .option('address', {
        alias: 'a',
        description: 'Pass your wallet address to generate a new stream',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

    if(argv.key == null) throw "Error: key missing";
    if(argv.address == null) throw "Error: address missing";

    const stream = `${argv.address}/news`;
    const client = new StreamrClient({
        auth: {
            privateKey: argv.key
        }
    });

    await fetchAndPublish(client, stream);
}

async function fetchAndPublish(client, stream) {
    const response = await axios({
        method: 'get',
        url: 'http://api.mediastack.com/v1/news?access_key=67ce12baef71abeff9f74cf9d81bd4be&limit=1&languages=en',
        headers: {
            'Content-type': 'application/json',
        }
    });

    await client.publish(stream, response.data);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
