function Programmes({ language = "en" }) {
  const tamil = language === "ta";

 const programmes = [
  {
    number: "01",
    title: tamil ? "YRF கல்வி" : "YRF Kalvi",
    text: tamil
      ? "கல்வி மூலம் மாணவர்கள் மற்றும் குடும்பங்களின் எதிர்காலத்தை முன்னேற்றுதல்."
      : "Supporting students and families through education.",
    link: "/programmes/education",
  },
  {
    number: "02",
    title: tamil ? "YRF ஊர்" : "YRF Oor",
    text: tamil
      ? "கிராமங்கள் மற்றும் சமூகங்களின் நிலையான வளர்ச்சிக்காக இணைந்து செயல்படுதல்."
      : "Strengthening rural communities through meaningful development.",
    link: "/programmes/oor",
  },
  {
    number: "03",
    title: tamil ? "YRF வாய்ப்பு" : "YRF Vaaippu",
    text: tamil
      ? "வாழ்வாதாரம் மற்றும் புதிய வாய்ப்புகள் மூலம் மக்களை முன்னேற்றுதல்."
      : "Creating opportunities for livelihood and progress.",
    link: "/programmes/livelihood",
  },
  {
    number: "04",
    title: tamil ? "YRF நலம்" : "YRF Nalam",
    text: tamil
      ? "உடல் மற்றும் மன நலத்தை மேம்படுத்தும் அக்கறையுடன் செயல்படுதல்."
      : "Promoting wellbeing, dignity and healthier lives.",
    link: "/programmes/wellbeing",
  },
  {
    number: "05",
    title: tamil ? "YRF இயற்கை" : "YRF Iyarkkai",
    text: tamil
      ? "இயற்கை வளங்களை பாதுகாத்து சுற்றுச்சூழல் சமநிலையை உருவாக்குதல்."
      : "Protecting nature and creating a sustainable environment.",
    link: "/programmes/environment",
  },
  {
    number: "06",
    title: tamil ? "YRF சக்தி" : "YRF Shakthi",
    text: tamil
      ? "மக்களின் திறன், தன்னம்பிக்கை மற்றும் அதிகாரமளிப்பை வளர்த்தல்."
      : "Empowering people with confidence, strength and opportunity.",
    link: "/programmes/shakthi",
  },
];

  return (
    <main>
      <section className="page-section">
        <div className="page-container">

          <span className="section-label">
            {tamil ? "எங்கள் திட்டங்கள்" : "Our programmes"}
          </span>

          <h1>
            {tamil
              ? "மரியாதையுடன் முன்னேறுவதற்கான ஐந்து வழிகள்."
              : "Five programmes. One standard of dignity."}
          </h1>

          <p className="page-intro">
            {tamil
              ? "ஒவ்வொரு திட்டமும் மக்கள் மற்றும் சமூகங்கள் நடைமுறை ஆதரவின் மூலம் முன்னேற உதவுகிறது."
              : "Each programme helps people and communities move forward through practical support."}
          </p>

          <div className="programmes-grid">
            {programmes.map((programme) => (
              <article className="programme-card" key={programme.number}>
                <span className="programme-number">
                  {programme.number}
                </span>

                <h2>{programme.title}</h2>

                <p>{programme.text}</p>

                <a href={programme.link}>
  {tamil ? "மேலும் அறிய" : "Learn more"} →
</a>
              </article>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}

export default Programmes;