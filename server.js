const projectId = process.env.INFURA_IPFS_PROJECT_ID
const projectSecret = process.env.INFURA_IPFS_PROJECT_SECRET
const projectIdAndSecret = `${projectId}:${projectSecret}`

async function ipfsClient() {
    const { create } = await import('ipfs-http-client')
    const ipfs = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
            headers: {
                "Authorization": `Basic ${Buffer.from(projectIdAndSecret).toString("base64")}`
        }
    });
    return ipfs;
}

async function saveText() {
    let ipfs = await ipfsClient();

    let result = await ipfs.add(`welcome ${new Date()}`);
    console.log(result);
}

//saveText();

async function getData(hash) {
    let ipfs = await ipfsClient();

    let asyncitr = ipfs.cat(hash)

    for await (const itr of asyncitr) {

        let data = Buffer.from(itr).toString()
        console.log(data)
    }
}

getData("QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn")
