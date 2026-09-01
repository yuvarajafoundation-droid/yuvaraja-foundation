function Governance({ language = "en" }) {
  const tamil = language === "ta";

  return (
    <main className="page-section">
      <section className="page-hero">
        <p className="section-eyebrow">
          {tamil ? "நிர்வாகம் மற்றும் வெளிப்படைத்தன்மை" : "Governance & Transparency"}
        </p>

        <h1>
          {tamil
            ? "நம்பிக்கையுடன் செயல்படும் நிர்வாகம்."
            : "Governance built on trust."}
        </h1>

        <p className="page-intro">
          {tamil
            ? "யுவராஜா அறக்கட்டளை வெளிப்படைத்தன்மை, பொறுப்புணர்வு மற்றும் நேர்மையான செயல்பாட்டை அடிப்படையாகக் கொண்டு செயல்படுகிறது."
            : "Yuvaraja Foundation is guided by transparency, accountability and integrity in every initiative we undertake."}
        </p>
      </section>

      <section className="governance-grid">
        <div className="governance-card">
          <span>01</span>
          <h2>{tamil ? "வெளிப்படைத்தன்மை" : "Transparency"}</h2>
          <p>
            {tamil
              ? "எங்கள் செயல்பாடுகள் மற்றும் திட்டங்களில் தெளிவான மற்றும் பொறுப்பான அணுகுமுறையைப் பின்பற்றுகிறோம்."
              : "We believe transparency builds confidence and ensures that our work remains open and responsible."}
          </p>
        </div>

        <div className="governance-card">
          <span>02</span>
          <h2>{tamil ? "பொறுப்புணர்வு" : "Accountability"}</h2>
          <p>
            {tamil
              ? "நாங்கள் மேற்கொள்ளும் ஒவ்வொரு முயற்சிக்கும் பொறுப்புடன் செயல்பட்டு, அதன் தாக்கத்தை தொடர்ந்து மதிப்பிடுகிறோம்."
              : "We remain accountable for the decisions we make, the resources we use and the impact we create."}
          </p>
        </div>

        <div className="governance-card">
          <span>03</span>
          <h2>{tamil ? "நேர்மை" : "Integrity"}</h2>
          <p>
            {tamil
              ? "மக்களின் நம்பிக்கையை மதித்து, நேர்மையுடனும் நெறிமுறையுடனும் செயல்படுகிறோம்."
              : "Integrity guides our decisions, partnerships and every action taken in service of communities."}
          </p>
        </div>
      </section>
    </main>
  );
}

export default Governance;