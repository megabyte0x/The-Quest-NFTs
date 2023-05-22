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
        const response = await alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: "0x13d089a60817F4d8DA1CA269D02893a4f457d303",
            excludeZeroValue: true,
            category: ["erc1155"],
            order: "desc",
            withMetadata: false,

        }).then((data) => {
            return data.transfers.slice(0, 5);
        });

        const formattedTransfers =
            response.map((transfer) => {
                const { to, erc1155Metadata } = transfer;
                return {
                    to: to,
                    tokenId: erc1155Metadata[0].tokenId,
                };
            });
        console.log(formattedTransfers); // [{ to: '0x...', tokenId: 1 }, ...]

        res.status(200).json({
            transactions: formattedTransfers,
        });
    } catch (e) {
        console.warn(e);
        res.status(500).send({
            message: "something went wrong, check the log in your terminal",
        });
    }
}
