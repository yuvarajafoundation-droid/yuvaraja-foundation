import "./about.css";
import communityImage from "../assets/yrf-community.jpeg";

function About({ language = "en" }) {
  const tamil = language === "ta";

  return (
    <main className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-container about-hero-grid">

          <div className="about-hero-content">
            <span className="about-kicker">
              {tamil ? "யூவராஜா அறக்கட்டளை" : "ABOUT YUVARAJA FOUNDATION"}
            </span>

            <h1>
              {tamil
                ? "மக்கள் முதலில். நோக்கம் எப்போதும்."
                : "People first. Purpose always."}
            </h1>

            <p className="about-lead">
              {tamil
                ? "ஒவ்வொருவரும் கண்ணியம், நம்பிக்கை மற்றும் அர்த்தமுள்ள எதிர்காலத்துடன் வாழும் வாய்ப்பைப் பெற வேண்டும் என்பதே எங்கள் நம்பிக்கை."
                : "We believe every person deserves the opportunity to live with dignity, hope and a meaningful path forward."}
            </p>
          </div>

          <div className="about-hero-image">
            <img
              src={communityImage}
              alt="Yuvaraja Foundation community service"
            />
          </div>

        </div>
      </section>


      {/* OUR BELIEF */}
      <section className="about-belief">
        <div className="about-container">

          <div className="about-section-intro">
            <span className="about-kicker">
              {tamil ? "எங்கள் நம்பிக்கை" : "OUR BELIEF"}
            </span>

            <h2>
              {tamil
                ? "அக்கறையை அர்த்தமுள்ள செயலாக மாற்றுதல்."
                : "Turning care into meaningful action."}
            </h2>

            <p>
              {tamil
                ? "யூவராஜா அறக்கட்டளை கல்வி, நலம், வாய்ப்புகள், கிராமப்புற வளர்ச்சி மற்றும் தேவைப்படும் நேரங்களில் மனிதநேய ஆதரவின் மூலம் மக்களுடனும் சமூகங்களுடனும் இணைந்து செயல்படுகிறது."
                : "Yuvaraja Foundation works with people and communities through education, wellbeing, opportunity, rural development and compassionate support when it is needed most."}
            </p>

            <p>
              {tamil
                ? "எங்கள் அணுகுமுறை எளிமையானது: தேவையைப் புரிந்துகொண்டு, பொறுப்புடன் செயல்பட்டு, நீடித்த முன்னேற்றத்தை உருவாக்குதல்."
                : "Our approach is simple: understand the need, respond responsibly and work towards lasting progress."}
            </p>
          </div>

        </div>
      </section>


      {/* PRINCIPLES */}
      <section className="about-principles">
        <div className="about-container">

          <div className="about-principles-grid">

            <article className="about-principle">
              <span>01</span>

              <h3>
                {tamil ? "மக்கள் முதலில்" : "People first"}
              </h3>

              <p>
                {tamil
                  ? "ஒவ்வொரு முயற்சியும் மக்களின் தேவைகள், கண்ணியம் மற்றும் எதிர்பார்ப்புகளை மையமாகக் கொண்டது."
                  : "Every initiative begins with people, their needs, dignity and aspirations."}
              </p>
            </article>


            <article className="about-principle">
              <span>02</span>

              <h3>
                {tamil ? "தேவை சார்ந்த செயல்பாடு" : "Need-led action"}
              </h3>

              <p>
                {tamil
                  ? "உண்மையாக தேவைப்படும் இடங்களில் நடைமுறை மற்றும் பொறுப்பான உதவியுடன் செயல்படுகிறோம்."
                  : "We respond where support is genuinely needed, with practical and responsible action."}
              </p>
            </article>


            <article className="about-principle">
              <span>03</span>

              <h3>
                {tamil ? "நீடித்த முன்னேற்றம்" : "Lasting progress"}
              </h3>

              <p>
                {tamil
                  ? "ஒருமுறை வழங்கப்படும் உதவியைத் தாண்டி, அர்த்தமுள்ள மற்றும் நிலையான முன்னேற்றத்தை உருவாக்குவதே எங்கள் நோக்கம்."
                  : "We look beyond one-time assistance towards meaningful and sustainable progress."}
              </p>
            </article>

          </div>

        </div>
      </section>

    </main>
  );
}

export default About;