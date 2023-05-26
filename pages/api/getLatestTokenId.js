import { Alchemy, Network } from "alchemy-sdk";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ message: "Only POST requests allowed" });
        return;
    }

    const settings = {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: Network.MATIC_MAINNET,
    };

    const alchemy = new Alchemy(settings);

    try {
        const responseWithTokenId = await alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: "0x13d089a60817F4d8DA1CA269D02893a4f457d303",
            excludeZeroValue: true,
            category: ["erc1155"],
            order: "desc",
            withMetadata: false,
        }).then((data) => {
            const lastestFive = data.transfers.slice(0, 5);
            response.map((lastestFive) => {
                const { to, erc1155Metadata, hash } = lastestFive;
                return {
                    to: to,
                    tokenId: erc1155Metadata[0].tokenId,
                    transactionLink: `https://polygonscan.com/tx/+${hash}`
                };
            });
        });
        res.status(200).send(responseWithTokenId);
    } catch (e) {
        console.warn(e);
        res.status(500).send({
            message: "something went wrong, check the log in your terminal",
        });
    }

}
