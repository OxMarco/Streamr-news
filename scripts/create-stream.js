const axios = require('axios');
const { StreamrClient } = require("streamr-client");

async function main() {
    const wallet = StreamrClient.generateEthereumAccount();
    console.log("Created publisher wallet with private key: "+wallet.privateKey)
    const client = new StreamrClient({
        auth: {
            privateKey: wallet.privateKey
        }
    });
    const token = await client.session.getSessionToken();
    const stream = await client.createStream({
        id: `${wallet.address}/news`,
    });

    try {

        await axios({
            method: 'post',
            url: `https://streamr.network/api/v1/streams/${wallet.address}%2Fnews/permissions`,
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                "anonymous": true,
                "operation":"stream_get"
            }
        });

        await axios({
            method: 'post',
            url: `https://streamr.network/api/v1/streams/${wallet.address}%2Fnews/permissions`,
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                "anonymous": true,
                "operation":"stream_subscribe"
            }
        });

        console.log(`New stream created: ${wallet.address}/news`);

    } catch(err) {
        if (err.body) {
            console.log(err.body);
        } else {
            console.log("Generic error, retry!");
        }
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
