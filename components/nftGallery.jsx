import { useEffect, useState } from "react";
import styles from "../styles/NftGallery.module.css";
import Spinner from "./Spinner";

export default function NFTGallery({}) {
  const [nfts, setNfts] = useState();
  const [walletOrCollectionAddress, setWalletOrCollectionAddress] = useState(
    "0x2D2E4c335EEE674Bd8F2EB3622E4156EbAbC864d"
  );
  const [pageKey, setPageKey] = useState();

  const [isLoading, setIsloading] = useState(false);

  const fetchNFTs = async (pagekey) => {
    if (!pageKey) setIsloading(true);
    const endpoint = "/api/getNftsForOwner";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          address: walletOrCollectionAddress,
          pageKey: pagekey ? pagekey : null,
          chain: "MATIC_MAINNET",
        }),
      }).then((res) => res.json());
      if (nfts?.length && pageKey) {
        setNfts((prevState) => [...prevState, ...res.nfts]);
      } else {
        setNfts();
        setNfts(res.nfts);
      }
      if (res.pageKey) {
        setPageKey(res.pageKey);
      } else {
        setPageKey();
      }
    } catch (e) {
      console.log(e);
    }

    setIsloading(false);
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className={styles.nft_gallery_page}>
      <div>
        <div className={styles.fetch_selector_container}>
          <h2 style={{ fontSize: "32px" }}>Polygon Advocate: The Quest NFTs</h2>
        </div>
        <div className={styles.inputs_container}>
          <div className={styles.input_button_container}>
            <input
              value={walletOrCollectionAddress}
              onChange={(e) => {
                setWalletOrCollectionAddress(e.target.value);
              }}
              placeholder="Insert NFTs contract or wallet address"
            ></input>
            <div onClick={() => fetchNFTs()} className={styles.button_black}>
              <a>Search</a>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loading_box}>
          <Spinner></Spinner>
        </div>
      ) : (
        <div className={styles.nft_gallery}>
          <div className={styles.nfts_display}>
            {nfts?.length ? (
              nfts.map((nft, index) => {
                return <NftCard key={index} nft={nft} />;
              })
            ) : (
              <div className={styles.loading_box}>
                <img className="image-403" src="http://salehriaz.com/404Page/img/404.svg" width="300px" />
              </div>
            )}
          </div>
        </div>
      )}

      {pageKey && nfts?.length && (
        <div>
          <a
            className={styles.button_black}
            onClick={() => {
              fetchNFTs(pageKey);
            }}
          >
            Load more
          </a>
        </div>
      )}
    </div>
  );
}
function NftCard({ nft }) {
  return nft?.title ? (
    <div className={styles.card_container}>
      <div className={styles.image_container}>
        {<img src={nft?.media}></img>}
      </div>
      <div className={styles.info_container}>
        <div className={styles.title_container}>
          <h3>{nft?.title}</h3>
        </div>
        <hr className={styles.separator} />
        <div className={styles.symbol_contract_container}>
          <div className={styles.contract_container}>
            <p className={styles.contract_container}>
              {nft?.contract?.slice(0, 6)}...
              {nft?.contract?.slice(38)}
            </p>
          </div>
        </div>

        <div className={styles.description_container}>
          <p>{nft?.description ? nft?.description : null}</p>
        </div>
        <div className={styles.description_container_2}>
          {
            <a
              href={
                "https://opensea.io/assets/matic/" +
                nft.contract +
                "/" +
                nft.tokenId
              }
            >
              OpenSea Link
            </a>
          }
        </div>
      </div>
    </div>
  ) : null;
}
