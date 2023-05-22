import styles from "../styles/Home.module.css";
import NFTGallery from "../components/nftGallery";
import MyTable from "../components/table";

export default function Home() {
  return (
    <div className="bg-purple">
      <main className={styles.main}>
        <NFTGallery />
        <MyTable />
      </main>
    </div>
  );
}
