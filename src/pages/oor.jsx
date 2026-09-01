import "./oor.css";

function Oor({ language = "en" }) {
  const tamil = language === "ta";

  return (
    <main className="oor-section">
      <div className="oor-container">

        <span className="oor-label">
          {tamil ? "YRF ஊர்" : "YRF Oor"}
        </span>

        <h1>
          {tamil
            ? "மக்களுடன் இணைந்து. சமூகங்களை வலுப்படுத்தி."
            : "With communities. For stronger lives."}
        </h1>

        <p className="oor-intro">
          {tamil
            ? "உள்ளூர் சமூகங்களின் தேவைகளை புரிந்து கொண்டு, அவர்களின் வாழ்வாதாரம், வாய்ப்புகள் மற்றும் நலனை மேம்படுத்துவதற்காக நாங்கள் செயல்படுகிறோம்."
            : "We work alongside communities to strengthen livelihoods, create opportunities and build a better quality of life."}
        </p>

        <div className="oor-details">

          <div className="oor-card">
            <span>01</span>
            <h2>{tamil ? "எங்கள் நோக்கம்" : "Our focus"}</h2>
            <p>
              {tamil
                ? "சமூகங்களின் தேவைகளை புரிந்து கொண்டு, நிலையான வளர்ச்சிக்கான வாய்ப்புகளை உருவாக்குதல்."
                : "Understanding community needs and creating opportunities for sustainable progress."}
            </p>
          </div>

          <div className="oor-card">
            <span>02</span>
            <h2>{tamil ? "நாங்கள் செய்யும் பணிகள்" : "What we do"}</h2>
            <p>
              {tamil
                ? "சமூக மேம்பாடு, வாழ்வாதாரம் மற்றும் உள்ளூர் திறன் வளர்ச்சிக்கு ஆதரவு வழங்குதல்."
                : "Supporting community development, livelihoods and local capacity building."}
            </p>
          </div>

          <div className="oor-card">
            <span>03</span>
            <h2>{tamil ? "நீண்டகால நோக்கம்" : "Long-term impact"}</h2>
            <p>
              {tamil
                ? "சமூகங்கள் தன்னம்பிக்கையுடனும் நிலைத்தன்மையுடனும் முன்னேற உதவுதல்."
                : "Helping communities move forward with confidence, resilience and opportunity."}
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}

export default Oor;