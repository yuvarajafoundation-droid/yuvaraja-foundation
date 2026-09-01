import "./education.css";

function Health({ language = "en" }) {
  const tamil = language === "ta";

  return (
    <main>
      <section className="page-section">
        <div className="page-container">

          <span className="section-label">
            {tamil ? "YRF நலம்" : "YRF Health"}
          </span>

          <h1>
            {tamil
              ? "நலம் என்பது ஒரு உரிமை. அனைவருக்கும் அது கிடைக்க வேண்டும்."
              : "Health is a right. Everyone deserves the opportunity to live well."}
          </h1>

          <p className="page-intro">
            {tamil
              ? "தரமான சுகாதார சேவைகள் மற்றும் மருத்துவ உதவிகள் அனைவருக்கும் சென்றடைய வேண்டும் என்பதே எங்கள் நோக்கம்."
              : "We believe quality healthcare and timely medical support should be accessible to everyone, regardless of their circumstances."}
          </p>

          <div className="programme-details">

            <article className="programme-card">
              <span className="programme-number">01</span>

              <h2>
                {tamil ? "எங்கள் நோக்கம்" : "Our focus"}
              </h2>

              <p>
                {tamil
                  ? "தேவைப்படும் மக்களுக்கு அடிப்படை சுகாதாரம், மருத்துவ ஆலோசனை மற்றும் தேவையான உதவிகளை வழங்குதல்."
                  : "Supporting people who need access to essential healthcare, medical guidance and timely assistance."}
              </p>
            </article>

            <article className="programme-card">
              <span className="programme-number">02</span>

              <h2>
                {tamil ? "நாங்கள் வழங்குவது" : "What we support"}
              </h2>

              <p>
                {tamil
                  ? "மருத்துவ முகாம்கள், சுகாதார விழிப்புணர்வு, பரிசோதனைகள் மற்றும் தேவையான மருத்துவ உதவிகளுக்கு ஆதரவு."
                  : "Medical camps, health awareness, basic screenings and support for essential healthcare needs."}
              </p>
            </article>

            <article className="programme-card">
              <span className="programme-number">03</span>

              <h2>
                {tamil ? "நோக்கமாக முன்னேற்றம்" : "Looking ahead"}
              </h2>

              <p>
                {tamil
                  ? "ஆரோக்கியமான வாழ்க்கையை உருவாக்கி, ஒவ்வொருவரும் நம்பிக்கையுடனும் கண்ணியத்துடனும் வாழும் வாய்ப்பை உருவாக்குதல்."
                  : "Building healthier communities where every person can live with confidence, dignity and hope."}
              </p>
            </article>

          </div>

        </div>
      </section>
    </main>
  );
}

export default Health;