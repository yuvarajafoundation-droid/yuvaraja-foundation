function FAQ({ language = "en" }) {
  const tamil = language === "ta";

  return (
    <main>
      <section className="page-section">
        <div className="page-container">
          <span className="section-label">
            {tamil ? "அடிக்கடி கேட்கப்படும் கேள்விகள்" : "FAQ"}
          </span>

          <h1>
            {tamil
              ? "அடிக்கடி கேட்கப்படும் கேள்விகள்"
              : "Frequently asked questions."}
          </h1>

          <p className="page-intro">
            {tamil
              ? "யுவராஜா அறக்கட்டளையின் பணிகள் மற்றும் செயல்பாடுகள் குறித்து அறிய."
              : "Learn more about Yuvaraja Foundation, our work and our approach."}
          </p>

          <div className="faq-list">
            <div className="faq-item">
              <h3>
                {tamil
                  ? "யுவராஜா அறக்கட்டளை என்ன செய்கிறது?"
                  : "What does Yuvaraja Foundation do?"}
              </h3>
              <p>
                {tamil
                  ? "கல்வி, நலவாழ்வு, வாழ்வாதாரம், கிராமப்புற மேம்பாடு மற்றும் மனிதநேய உதவிகளில் செயல்படுகிறோம்."
                  : "We work across education, wellbeing, livelihoods, rural development and humanitarian support."}
              </p>
            </div>

            <div className="faq-item">
              <h3>
                {tamil
                  ? "யுவராஜா அறக்கட்டளையின் அணுகுமுறை என்ன?"
                  : "How does the Foundation work?"}
              </h3>
              <p>
                {tamil
                  ? "தேவையை முதலில் புரிந்துகொண்டு, பொறுப்புடன் செயல்பட்டு, நீடித்த முன்னேற்றத்தை உருவாக்குவதே எங்கள் அணுகுமுறை."
                  : "We listen, understand the need, act responsibly and work towards lasting progress."}
              </p>
            </div>

            <div className="faq-item">
              <h3>
                {tamil
                  ? "நான் எவ்வாறு தொடர்புகொள்ளலாம்?"
                  : "How can I get in touch?"}
              </h3>
              <p>
                {tamil
                  ? "எங்கள் தொடர்புப் பக்கத்தின் மூலம் எங்களை அணுகலாம்."
                  : "You can reach us through our contact information and enquiry channels."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FAQ;