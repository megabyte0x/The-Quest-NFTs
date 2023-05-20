import { Network, Alchemy, NftFilters } from "alchemy-sdk";

export default async function handler(req, res) {
	const { address, pageSize, chain, excludeFilter, pageKey } = JSON.parse(
		req.body
	);
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
		const nfts = await alchemy.nft.getNftsForOwner(address, {
			pageSize: pageSize ? pageSize : 100,
			contractAddresses: ['0x2953399124F0cBB46d2CbACD8A89cF0599974963'],
			excludeFilters: excludeFilter && [NftFilters.SPAM],
			pageKey: pageKey ? pageKey : "",
		});

		const formattedNfts = nfts.ownedNfts.map((nft) => {
			const { contract, tokenId, description, media, rawMetadata } =
				nft;

			//This condition will filter the nfts based on the name of the nft
			if (rawMetadata.name === "goku" || rawMetadata.name === "mikasa" || rawMetadata.name === "itadori" || rawMetadata.name === "kagome" || rawMetadata.name === "naruto" || rawMetadata.name.includes("Kuraia")) {

				return {
					contract: contract.address,
					symbol: contract.symbol,
					media: media[0]?.gateway
						? media[0]?.gateway
						: "https://via.placeholder.com/500",
					tokenId,

					description,
					format: media[0]?.format ? media[0]?.format : "png",
					title: rawMetadata.name,
				};
			} else {
				return null;
			}
		});
		res.status(200).json({
			nfts: formattedNfts.length ? formattedNfts : null,
			pageKey: nfts.pageKey,
		});
	} catch (e) {
		console.warn(e);
		res.status(500).send({
			message: "something went wrong, check the log in your terminal",
		});
	}
}
