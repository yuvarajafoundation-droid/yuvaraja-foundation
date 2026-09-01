import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/YRF-logo-transparent.png";

function Header({ language, setLanguage }) {
  const isTamil = language === "ta";

  return (
    <header className="site-header">
      <div className="header-inner">

        <Link to="/" className="brand">
          <img
            src={logo}
            alt="Yuvaraja Foundation"
            className="brand-logo"
          />

          <span className="brand-text">
            <span className="brand-tamil">
              {isTamil
                ? "யுவராஜா அறக்கட்டளை"
                : "Yuvaraja Foundation"}
            </span>

            <span className="brand-english">
              {isTamil
                ? "YUVARAJA FOUNDATION"
                : "யுவராஜா அறக்கட்டளை"}
            </span>
          </span>
        </Link>

        <nav className="main-nav">

          <Link to="/">
            {isTamil ? "முகப்பு" : "Home"}
          </Link>

          <Link to="/about">
            {isTamil ? "எங்களைப் பற்றி" : "About Us"}
          </Link>

          <Link to="/programmes">
            {isTamil ? "திட்டங்கள்" : "Programmes"}
          </Link>

          <Link to="/governance">
            {isTamil
              ? "நிர்வாகமும் வெளிப்படையும்"
              : "Governance & Transparency"}
          </Link>

          <Link to="/faq">
            {isTamil ? "கேள்வி பதில்" : "FAQ"}
          </Link>

        </nav>

        <div className="language-switcher">

          <button
            className={isTamil ? "active" : ""}
            onClick={() => setLanguage("ta")}
          >
            தமிழ்
          </button>

          <span>|</span>

          <button
            className={!isTamil ? "active" : ""}
            onClick={() => setLanguage("en")}
          >
            English
          </button>

        </div>

        <button className="mobile-menu" aria-label="Open menu">
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}

export default Header;