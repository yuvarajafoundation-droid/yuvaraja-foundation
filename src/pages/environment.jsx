import "./education.css";

function Environment({ language = "en" }) {
  const tamil = language === "ta";

  return (
    <main>
      <section className="page-section">
        <div className="page-container">

          <span className="section-label">
            {tamil ? "YRF சுற்றுச்சூழல்" : "YRF Environment"}
          </span>

          <h1>
            {tamil
              ? "இயற்கையைப் பாதுகாப்பது நமது பொறுப்பு. எதிர்காலத்தைப் பாதுகாப்பது நமது கடமை."
              : "Protecting nature is our responsibility. Protecting the future is our commitment."}
          </h1>

          <p className="page-intro">
            {tamil
              ? "இயற்கை வளங்களைப் பாதுகாத்து, சுற்றுச்சூழல் சமநிலையை மேம்படுத்தி, எதிர்கால தலைமுறைகளுக்கான நிலையான உலகை உருவாக்குவதே எங்கள் நோக்கம்."
              : "We work to protect natural resources, strengthen environmental awareness and create a healthier, more sustainable world for future generations."}
          </p>

          <div className="programme-details">

            <article className="programme-card">
              <span className="programme-number">01</span>

              <h2>
                {tamil ? "எங்கள் நோக்கம்" : "Our focus"}
              </h2>

              <p>
                {tamil
                  ? "இயற்கை வளங்களைப் பாதுகாத்தல், சுற்றுச்சூழல் விழிப்புணர்வை உருவாக்குதல் மற்றும் பசுமையான வாழ்க்கை முறைகளை ஊக்குவித்தல்."
                  : "Protecting natural resources, building environmental awareness and encouraging responsible, sustainable ways of living."}
              </p>
            </article>

            <article className="programme-card">
              <span className="programme-number">02</span>

              <h2>
                {tamil ? "நாங்கள் ஆதரிப்பது" : "What we support"}
              </h2>

              <p>
                {tamil
                  ? "மரக்கன்றுகள் நடுதல், நீர் பாதுகாப்பு, தூய்மையான சூழல், பசுமை முயற்சிகள் மற்றும் சமூக அடிப்படையிலான சுற்றுச்சூழல் செயல்பாடுகளுக்கு ஆதரவு."
                  : "Tree planting, water conservation, clean surroundings, green initiatives and community-led environmental activities."}
              </p>
            </article>

            <article className="programme-card">
              <span className="programme-number">03</span>

              <h2>
                {tamil ? "எதிர்காலத்தை நோக்கி" : "Looking ahead"}
              </h2>

              <p>
                {tamil
                  ? "மக்களும் இயற்கையும் இணைந்து வளரும் வகையில், நிலையான மற்றும் ஆரோக்கியமான எதிர்காலத்தை உருவாக்குதல்."
                  : "Creating a sustainable future where people and nature can grow together in balance, health and harmony."}
              </p>
            </article>

          </div>

        </div>
      </section>
    </main>
  );
}

export default Environment;