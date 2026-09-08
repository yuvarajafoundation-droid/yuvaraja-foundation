import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import communityImage from "./assets/yrf-community.jpeg";
import About from "./pages/about";
import Programmes from "./pages/programmes";
import Governance from "./pages/governance";
import FAQ from "./pages/FAQ";
import Education from "./pages/education";
import Wellbeing from "./pages/wellbeing";
import Health from "./pages/health";
import Livelihood from "./pages/livelihood";
import Environment from "./pages/environment";
import Shakthi from "./pages/shakthi";
import Oor from "./pages/oor";
import AdminLogin from "./admin/AdminLogin";
import ResetPassword from "./admin/ResetPassword";
import AdminDashboard from "./admin/AdminDashboard";
import ProgrammeEditor from "./admin/ProgrammeEditor";
import ProgrammePhotos from "./admin/ProgrammePhotos";
import ProgrammeEvents from "./admin/ProgrammeEvents";
import AddProgramme from "./admin/AddProgramme";

function Home({ language }) {
  const tamil = language === "ta";

  return (
    <>
    
      <main>

       {/* HERO */}
<section className="hero">
  <div className="hero-inner">

    <div className="hero-copy">

      <div className="hero-badge">
        <span className="hero-badge-dot"></span>

        {tamil
          ? "தமிழ்நாட்டின் பொது சேவை அறக்கட்டளை"
          : "A public-service foundation for Tamil Nadu"}
      </div>

      <h1 className="hero-title">
        {tamil ? (
          <>
            கண்ணியம்.
            <br />
            செயல்பாட்டில்.
          </>
        ) : (
          <>
            Dignity.
            <br />
            In action.
          </>
        )}
      </h1>

      <p className="hero-description">
        {tamil
          ? "பிறப்பு, இடம் அல்லது அரசியல் அடையாளத்தால் கண்ணியம் தீர்மானிக்கப்படக்கூடாது. YRF தமிழ்நாட்டில் கல்வி, சுகாதாரம், வாழ்வாதாரம், கிராமப்புற வளர்ச்சி மற்றும் அவசர உதவியில் நிறுவனசார் பணியை மேற்கொள்கிறது."
          : "Dignity should never depend on privilege, geography, or political identity. YRF works across Tamil Nadu on education, healthcare, livelihoods, rural development and humanitarian assistance — as a founder-led, institution-first, community-centred effort."}
      </p>

      <div className="hero-actions">

        <a
          href="#programmes"
          className="hero-button hero-button-primary"
        >
          {tamil ? "திட்டங்களைப் பார்க்க" : "Explore programmes"}

          <span className="hero-arrow">→</span>
        </a>

        <a
          href="#about"
          className="hero-button hero-button-secondary"
        >
          {tamil ? "எங்களைப் பற்றி" : "About YRF"}
        </a>

      </div>

</div>

<div className="hero-visual">
        <div className="hero-image-placeholder">
          <img
            src={communityImage}
            alt={
              tamil
                ? "சமூக சேவை திட்டம்"
                : "Yuvaraja Foundation community service"
            }
          />
        </div>
      </div>
    </div>
  </section>
  {/* IMPACT / OUR APPROACH */}
<section className="impact-section">
  <div className="impact-inner">

    <div className="impact-heading">
      <p className="section-eyebrow">
        {tamil ? "எங்கள் அணுகுமுறை" : "Our approach"}
      </p>

      <h2>
        {tamil
          ? "உதவி செய்வதைத் தாண்டி, மாற்றத்தை உருவாக்குகிறோம்."
          : "Beyond support. Towards lasting change."}
      </h2>
    </div>

    <div className="impact-grid">

      <div className="impact-card">
        <span>01</span>
        <h3>
          {tamil ? "மக்களை மையமாகக் கொள்கிறோம்" : "People first"}
        </h3>
        <p>
          {tamil
            ? "ஒவ்வொரு முயற்சியும் மக்களின் உண்மையான தேவைகள் மற்றும் கண்ணியத்தை மையமாகக் கொண்டது."
            : "Every initiative begins with people, their needs, dignity and aspirations."}
        </p>
      </div>

      <div className="impact-card">
        <span>02</span>
        <h3>
          {tamil ? "தேவைக்கேற்ப செயல்படுகிறோம்" : "Need-led action"}
        </h3>
        <p>
          {tamil
            ? "உண்மையான தேவை இருக்கும் இடத்தில் சரியான ஆதரவை வழங்குகிறோம்."
            : "We respond where support is genuinely needed, with practical and responsible action."}
        </p>
      </div>

      <div className="impact-card">
        <span>03</span>
        <h3>
          {tamil ? "நீடித்த மாற்றத்தை உருவாக்குகிறோம்" : "Lasting progress"}
        </h3>
        <p>
          {tamil
            ? "ஒரு நாள் உதவியைத் தாண்டி, நீண்டகால முன்னேற்றத்திற்கான பாதையை உருவாக்குகிறோம்."
            : "We look beyond one-time assistance towards meaningful and sustainable progress."}
        </p>
      </div>

    </div>

  </div>
</section>
        {/* PROGRAMMES */}
<section id="programmes" className="programmes-section">
  <div className="programmes-inner">

    <div className="programmes-heading">
      <p className="section-eyebrow">
        {tamil ? "தற்போதைய திட்டங்கள்" : "Current programmes"}
      </p>

      <h2>
        {tamil
          ? "ஆறு திட்டங்கள். ஒரே கண்ணிய அளவு."
          : "Six programmes. One standard of dignity."}
      </h2>

      <p className="programmes-intro">
        {tamil
          ? "ஒவ்வொரு திட்டமும் நடைமுறை உதவி வழியாக மக்களையும் சமூகங்களையும் முன்னேற்றுகிறது."
          : "Each programme helps people and communities move forward through practical support."}
      </p>
    </div>

    <div className="programme-grid">

      <Link to="/programmes/education" className="programme-item">
        <span className="programme-number">01</span>
        <h3>
          {tamil ? "YRF கல்வி" : "YRF Kalvi"}
        </h3>
        <p>
          {tamil
            ? "கல்வி மற்றும் மாணவர் வாய்ப்புகளுக்கான அணுகலை உருவாக்குதல்."
            : "Education access and stronger opportunities for students."}
        </p>
        <span className="programme-link">
          {tamil ? "மேலும் அறிக" : "Learn more"} →
        </span>
      </Link>

      <Link to="/programmes/wellbeing" className="programme-item">
        <span className="programme-number">02</span>
        <h3>
          {tamil ? "YRF நலம்" : "YRF Nalam"}
        </h3>
        <p>
          {tamil
            ? "தேவைப்படும் சமூகங்களுக்கு சுகாதார அணுகலும் மருத்துவ உதவியும்."
            : "Healthcare access and medical assistance for communities that need it most."}
        </p>
        <span className="programme-link">
          {tamil ? "மேலும் அறிக" : "Learn more"} →
        </span>
      </Link>

      <Link to="/programmes/livelihood" className="programme-item">
        <span className="programme-number">03</span>
        <h3>
          {tamil ? "YRF வாய்ப்பு" : "YRF Vaaippu"}
        </h3>
        <p>
          {tamil
            ? "திறன், வேலைவாய்ப்பு மற்றும் நிலையான வாழ்வாதாரத்திற்கான பாதைகள்."
            : "Skills, employment and pathways towards sustainable livelihoods."}
        </p>
        <span className="programme-link">
          {tamil ? "மேலும் அறிக" : "Learn more"} →
        </span>
      </Link>

      <Link to="/programmes/oor" className="programme-item">
        <span className="programme-number">04</span>
        <h3>
          {tamil ? "YRF ஊர்" : "YRF Oor"}
        </h3>
        <p>
          {tamil
            ? "கிராமப்புற சமூகங்களை வலுப்படுத்தும் நீண்டகால முயற்சிகள்."
            : "Long-term initiatives designed to strengthen rural communities."}
        </p>
        <span className="programme-link">
          {tamil ? "மேலும் அறிக" : "Learn more"} →
        </span>
      </Link>

      <Link to="/programmes/environment" className="programme-item">
        <span className="programme-number">05</span>
        <h3>
          {tamil ? "YRF இயற்கை" : "YRF Iyarkkai"}
        </h3>
        <p>
          {tamil
            ? "அவசர காலங்களில் உடனடி மற்றும் அக்கறையுள்ள உதவி."
            : "Immediate and compassionate support during times of crisis."}
        </p>
        <span className="programme-link">
          {tamil ? "மேலும் அறிக" : "Learn more"} →
        </span>
      </Link>
      <Link to="/programmes/shakthi" className="programme-item">
        <span className="programme-number">06</span>
        <h3>
          {tamil ? "YRF சக்தி" : "YRF Shakthi"}
        </h3>
        <p>
          {tamil
            ? "பெண்களின் திறன், தன்னம்பிக்கை மற்றும் அதிகாரமளிப்பை வளர்த்தல்."
            : "Empowering Women with confidence, strength and opportunity."}
        </p>
        <span className="programme-link">
          {tamil ? "மேலும் அறிக" : "Learn more"} →
        </span>
      </Link>

    </div>

  </div>
</section>
{/* HOW WE WORK */}
<section className="how-we-work">
  <div className="how-we-work-inner">

    <div className="how-we-work-heading">
      <p className="section-eyebrow">
        {tamil ? "எப்படி பணியாற்றுகிறோம்" : "How we work"}
      </p>

      <h2>
        {tamil
          ? "மரியாதையுடன் தொடங்கி, பொறுப்புடன் தொடர்கிறோம்."
          : "From listening to action, with care at every step."}
      </h2>

      <p>
        {tamil
          ? "ஒவ்வொரு தேவையையும் புரிந்துகொண்டு, சரியான ஆதரவை வழங்கும் வகையில் எங்கள் பணியை அமைக்கிறோம்."
          : "We understand each need carefully and work towards providing the right support with dignity and responsibility."}
      </p>
    </div>

    <div className="steps-grid">

      <div className="step-item">
        <span>01</span>
        <h3>{tamil ? "கேட்கிறோம்" : "We listen"}</h3>
        <p>
          {tamil
            ? "தேவையை முதலில் புரிந்துகொள்ள நேரம் ஒதுக்குகிறோம்."
            : "We take the time to understand the need first."}
        </p>
      </div>

      <div className="step-item">
        <span>02</span>
        <h3>{tamil ? "புரிந்துகொள்கிறோம்" : "We understand"}</h3>
        <p>
          {tamil
            ? "சூழ்நிலை மற்றும் தேவையை கவனமாக மதிப்பிடுகிறோம்."
            : "We carefully consider the circumstances and the need."}
        </p>
      </div>

      <div className="step-item">
        <span>03</span>
        <h3>{tamil ? "முன்னுரிமை அளிக்கிறோம்" : "We prioritise"}</h3>
        <p>
          {tamil
            ? "அவசரம் மற்றும் தேவையின் அடிப்படையில் முன்னுரிமை அளிக்கிறோம்."
            : "We prioritise based on urgency and genuine need."}
        </p>
      </div>

      <div className="step-item">
        <span>04</span>
        <h3>{tamil ? "செயல்படுகிறோம்" : "We act"}</h3>
        <p>
          {tamil
            ? "பொருத்தமான திட்டம் அல்லது உதவி மூலம் நடைமுறையில் செயல்படுகிறோம்."
            : "We respond through the appropriate programme or form of support."}
        </p>
      </div>

      <div className="step-item">
        <span>05</span>
        <h3>{tamil ? "தொடர்கிறோம்" : "We follow through"}</h3>
        <p>
          {tamil
            ? "உதவி வழங்கிய பிறகும் முன்னேற்றத்தைப் பற்றி கவனம் செலுத்துகிறோம்."
            : "We look beyond a single intervention towards lasting progress."}
        </p>
      </div>

      <div className="step-item">
        <span>06</span>
        <h3>{tamil ? "வெளிப்படையாக செயல்படுகிறோம்" : "We remain accountable"}</h3>
        <p>
          {tamil
            ? "எங்கள் பணி மற்றும் அதன் தாக்கத்தில் வெளிப்படைத்தன்மையை காக்கிறோம்."
            : "We remain transparent and accountable for the work we do."}
        </p>
      </div>

    </div>

  </div>
</section>

        {/* ABOUT */}
        <section id="about" className="about-section">
  <div className="about-inner">

    <div className="about-label">
      {tamil ? "யுவராஜா அறக்கட்டளை" : "Yuvaraja Foundation"}
    </div>

    <div className="about-content">
      <h2>
        {tamil
          ? "அக்கறையிலிருந்து செயலுக்கு."
          : "From care to action."}
      </h2>

      <p>
        {tamil
          ? "ஒவ்வொரு மனிதரும் கண்ணியத்துடனும் நம்பிக்கையுடனும் வாழும் வாய்ப்பைப் பெற வேண்டும் என்று YRF நம்புகிறது."
          : "We believe every person deserves the opportunity to live with dignity and hope."}
      </p>

      <p className="about-secondary">
        {tamil
          ? "தேவை இருக்கும் இடத்தில் கேட்போம். புரிந்துகொள்வோம். செயல்படுவோம். நீடித்த மாற்றத்தை உருவாக்க தொடர்ந்து பயணிப்போம்."
          : "We listen where there is a need. We understand before we act. And we stay committed to creating meaningful, lasting change."}
      </p>
    </div>

  </div>
</section>

      </main>
    </>
  );
}

function PlaceholderPage({ title, language }) {
  const tamil = language === "ta";

  return (
    <main className="placeholder-page">
      <h1>{tamil ? title.ta : title.en}</h1>
    </main>
  );
}

function App() {
    useEffect(() => {
    const hash = window.location.hash;

    if (hash.includes("access_token=") && hash.includes("type=recovery")) {
      window.location.replace(
        `${window.location.origin}/admin/reset-password${hash}`
      );
    }
  }, []);
  const [language, setLanguage] = useState("ta");

  return (
    <BrowserRouter>

      <Header
        language={language}
        setLanguage={setLanguage}
      />

      <Routes>

        <Route
          path="/"
          element={<Home language={language} />}
        />

        <Route
  path="/about"
  element={<About language={language} />}
/>

        <Route
  path="/programmes"
  element={<Programmes language={language} />}
/>
        <Route
          path="/programmes/education"
          element={<Education language={language} />}
        />
        <Route
  path="/programmes/wellbeing"
  element={<Wellbeing language={language} />}
/>
<Route
  path="/programmes/health"
  element={<Health language={language} />}
/>
<Route
  path="/programmes/livelihood"
  element={<Livelihood language={language} />}
/>
<Route
  path="/programmes/shakthi"
  element={<Shakthi language={language} />}
/>

<Route
  path="/programmes/oor"
  element={<Oor language={language} />}
/>
<Route
  path="/programmes/environment"
  element={<Environment language={language} />}
/>
<Route path="/admin/login" element={<AdminLogin />} />
import ResetPassword from "./admin/ResetPassword";
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/admin/programme/add" element={<AddProgramme />} />


        <Route
  path="/governance"
  element={<Governance language={language} />}
/>
<Route
  path="/admin/programme/:slug"
  element={<ProgrammeEditor />}
/>
<Route
  path="/admin/programme/:slug/photos"
  element={<ProgrammePhotos />}
/>
<Route
  path="/admin/programme/:slug/events"
  element={<ProgrammeEvents />}
/>


        <Route
          path="/faq"
          element={
            <PlaceholderPage
              language={language}
              title={{
                ta: "கேள்வி பதில்",
                en: "FAQ",
              }}
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;