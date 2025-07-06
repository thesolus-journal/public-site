import "../css/Home.css";
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
    <div className="homepage">
      <video className="content" autoPlay muted loop playbackRate={0.8}>
        <source src={WebsiteVideo} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
      <div className="text">
        <p className="title">coming soon</p>
        <p className="date-text">11.07.2025</p>
        <p className="narration">
          We're about to launch a premium notebook collection designed for busy
          minds who long to slow down and think deeper
        </p>
        <button
          className="order-button"
          onClick={() => navigate("/our-product")}
        >
          pre-order
        </button>
      </div>
    </div>
  );
}

export default Home;
