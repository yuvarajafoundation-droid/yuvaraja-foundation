import "./education.css";

function Wellbeing({ language = "en" }) {
  const tamil = language === "ta";

  return (
    <main>
      <section className="page-section">
        <div className="page-container">

          <span className="section-label">
            {tamil ? "YRF நலவாழ்வு" : "YRF Wellbeing"}
          </span>

          <h1>
            {tamil
              ? "நலம் என்பது ஒரு உரிமை."
              : "Wellbeing is a right."}
          </h1>

          <p className="page-intro">
            {tamil
              ? "ஒவ்வொருவருக்கும் தேவையான சுகாதார மற்றும் மருத்துவ உதவி கிடைக்க வேண்டும் என்பதே எங்கள் நோக்கம்."
              : "Everyone deserves access to the care and support they need to live with health, dignity and confidence."}
          </p>

          <div className="programme-detail">

            <div className="programme-block">
              <span className="programme-number">01</span>

              <h2>
                {tamil ? "எங்கள் நோக்கம்" : "Our focus"}
              </h2>

              <p>
                {tamil
                  ? "தேவைப்படும் மக்களுக்கும் குடும்பங்களுக்கும் மருத்துவ மற்றும் சுகாதார உதவிகளை வழங்குதல்."
                  : "Making healthcare and medical assistance accessible to people and families who need it most."}
              </p>
            </div>

            <div className="programme-block">
              <span className="programme-number">02</span>

              <h2>
                {tamil ? "நாங்கள் ஆதரிப்பது" : "What we support"}
              </h2>

              <p>
                {tamil
                  ? "மருத்துவ முகாம்கள், கண் பரிசோதனை, சுகாதார விழிப்புணர்வு மற்றும் தேவையான மருத்துவ உதவிகள்."
                  : "Medical camps, eye care initiatives, health awareness and essential medical assistance."}
              </p>
            </div>

            <div className="programme-block">
              <span className="programme-number">03</span>

              <h2>
                {tamil ? "முன்னோக்கி" : "Looking ahead"}
              </h2>

              <p>
                {tamil
                  ? "ஒவ்வொருவரும் ஆரோக்கியமாகவும் மரியாதையுடனும் வாழக்கூடிய சமூகத்தை உருவாக்குதல்."
                  : "Building stronger communities where every person can live a healthier life with dignity and care."}
              </p>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}

export default Wellbeing;