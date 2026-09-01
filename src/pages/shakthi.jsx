import "./shakthi.css";

import shakthi01 from "../assets/Images/YRF Shakthi/shakthi-01.png";
import shakthi02 from "../assets/Images/YRF Shakthi/shakthi-02.jpg";

function Shakthi({ language = "en" }) {
  const tamil = language === "ta";

  return (
    <main>
      <section className="shakthi-section">
        <div className="shakthi-container">

          <span className="shakthi-label">
            {tamil ? "YRF சக்தி" : "YRF Shakthi"}
          </span>

          <h1>
            {tamil
              ? "பெண்களின் வலிமை. குடும்பங்களின் முன்னேற்றம்."
              : "Empowering women. Strengthening families."}
          </h1>

          <p className="shakthi-intro">
            {tamil
              ? "பெண்களுக்கு நம்பிக்கையுடனும் கண்ணியத்துடனும் முன்னேறுவதற்கான வாய்ப்புகளையும் ஆதரவையும் உருவாக்குவது எங்கள் நோக்கம்."
              : "Creating opportunities and support that help women move forward with confidence, dignity and independence."}
          </p>

          <div className="shakthi-images">
            <img src={shakthi01} alt="YRF Shakthi programme" />
            <img src={shakthi02} alt="YRF Shakthi programme" />
          </div>

          <div className="shakthi-details">

            <div className="shakthi-detail-block">
              <span>01</span>

              <h2>
                {tamil ? "எங்கள் நோக்கம்" : "Our focus"}
              </h2>

              <p>
                {tamil
                  ? "பெண்களின் திறன், நம்பிக்கை மற்றும் சுயசார்பை வளர்ப்பதன் மூலம் அவர்களின் வாழ்க்கையில் நீடித்த மாற்றத்தை உருவாக்குதல்."
                  : "Building women's confidence, skills and independence to create lasting change in their lives."}
              </p>
            </div>

            <div className="shakthi-detail-block">
              <span>02</span>

              <h2>
                {tamil ? "நாங்கள் செய்யும் பணிகள்" : "What we support"}
              </h2>

              <p>
                {tamil
                  ? "திறன் மேம்பாடு, வாழ்வாதார வாய்ப்புகள், கல்வி மற்றும் தேவையான ஆதரவுகளை வழங்குதல்."
                  : "Supporting skill development, livelihood opportunities, education and practical support."}
              </p>
            </div>

            <div className="shakthi-detail-block">
              <span>03</span>

              <h2>
                {tamil ? "நீண்டகால நோக்கம்" : "Looking ahead"}
              </h2>

              <p>
                {tamil
                  ? "பெண்கள் தங்கள் திறனை முழுமையாக பயன்படுத்தி கண்ணியத்துடனும் சுதந்திரத்துடனும் முன்னேறும் சமூகத்தை உருவாக்குதல்."
                  : "Creating communities where women can realise their potential and move forward with dignity, confidence and independence."}
              </p>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}

export default Shakthi;