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

      <div className="stars">
        <div className="central-body">
          <img
            className="image-404 active"
            src="http://salehriaz.com/404Page/img/404.svg"
            width="300px"
          />
        </div>
        <div className="objects">
          <img
            className="object_rocket"
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
          />
          <div className="earth-moon">
            <img
              className="object_earth"
              src="http://salehriaz.com/404Page/img/earth.svg"
              width="100px"
            />
            <img
              className="object_moon"
              src="http://salehriaz.com/404Page/img/moon.svg"
              width="80px"
            />
          </div>
          <div className="box_astronaut">
            <img
              className="object_astronaut"
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              width="140px"
            />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
        </div>
      </div>
    </div>
  );
}
