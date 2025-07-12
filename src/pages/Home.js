import styles from "../css/Home.module.css";
import { useNavigate } from "react-router-dom";
import WebsiteVideo from "../assets/Website video.mp4";

/**
 * Home component displays the landing page with a video background and a call to action.
 * @component
 * @returns {JSX.Element} The home page element.
 */
function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.homepage}>
      <video className={styles.content} autoPlay muted loop playbackRate={0.8}>
        <source src={WebsiteVideo} type="video/mp4" />
      </video>
      <div className={styles["video-overlay"]}></div>
      <div className={styles.text}>
        <p className={styles.title}>Grand Opening</p>
        <p className={styles["date-text"]}>11.07.2025</p>
        <p className={styles.narration}>
          A premium notebook collection designed for busy minds who long to slow
          down and think deeper
        </p>
        <button
          className={styles["order-button"]}
          onClick={() => navigate("/our-product")}
        >
          order now
        </button>
      </div>
    </div>
  );
}

export default Home;
