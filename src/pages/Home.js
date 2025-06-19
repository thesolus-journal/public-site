import "../css/Home.css";

function Home() {
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
        <button className="order-button">pre-order</button>
      </div>
    </div>
  );
}

export default Home;
