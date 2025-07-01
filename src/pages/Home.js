import "../css/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <video className="content" autoPlay muted loop>
        <source src="writing.mp4" type="video/mp4" />
      </video>
      <div className="text">
        <p className="title">coming soon</p>
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
