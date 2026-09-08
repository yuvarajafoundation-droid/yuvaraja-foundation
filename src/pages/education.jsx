import "./education.css";

import kalvi01 from "../assets/Images/YRF Kalvi/kalvi-01.jpg";
import kalvi02 from "../assets/Images/YRF Kalvi/kalvi-02.jpg";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Education({ language = "en" }) {
  const tamil = language === "ta";
  const [events, setEvents] = useState([]);

useEffect(() => {
  async function loadEvents() {
    const { data, error } = await supabase
      .from("programme_events")
      .select("*")
      .eq("programme_id", "kalvi")
      .eq("status", "active")
      .order("event_date", { ascending: false });

    if (error) {
      console.error("Error loading events:", error);
      return;
    }

    setEvents(data || []);
  }

  loadEvents();
}, []);

  return (
    <main>
      <section className="page-section">
        <div className="page-container">

          <span className="section-label">
            {tamil ? "YRF கல்வி" : "YRF Kalvi"}
          </span>

          <h1>
            {tamil
              ? "கல்வி ஒரு வாய்ப்பு மட்டுமல்ல. அது ஒரு புதிய பாதை."
              : "Education opens the way to a better future."}
          </h1>

          <p className="page-intro">
            {tamil
              ? "ஒவ்வொரு மாணவருக்கும் தரமான கல்வி மற்றும் முன்னேற்றத்திற்கான சம வாய்ப்பு கிடைக்க வேண்டும் என்பதே எங்கள் நோக்கம்."
              : "Every student deserves access to education and a fair opportunity to move forward with confidence and dignity."}
          </p>

          <div className="programme-images">
            <img src={kalvi01} alt="YRF Kalvi programme" />
            <img src={kalvi02} alt="YRF Kalvi programme" />
          </div>

          <div className="programme-detail">

            <div className="detail-block">
              <span>01</span>

              <h2>
                {tamil ? "எங்கள் நோக்கம்" : "Our focus"}
              </h2>

              <p>
                {tamil
                  ? "கல்வி தொடர்பான ஆதரவு மாணவர்கள் மற்றும் குடும்பங்களுக்கு வழங்கப்படுகிறது."
                  : "Supporting students and families with the assistance they need to continue education and build a stronger future."}
              </p>
            </div>

            <div className="detail-block">
              <span>02</span>

              <h2>
                {tamil ? "நாங்கள் செய்யும் பணிகள்" : "What we support"}
              </h2>

              <p>
                {tamil
                  ? "கல்வி உதவி, மாணவர் ஆதரவு மற்றும் தேவையான நடைமுறை வாய்ப்புகளை வழங்குதல்."
                  : "Educational assistance, student support and practical opportunities that help young people move forward."}
              </p>
            </div>

            <div className="detail-block">
              <span>03</span>

              <h2>
                {tamil ? "நீண்டகால நோக்கம்" : "Looking ahead"}
              </h2>

              <p>
                {tamil
                  ? "மாணவர்கள் தன்னம்பிக்கை, சுதந்திரம் மற்றும் கண்ணியத்துடன் வலுவான எதிர்காலத்தை உருவாக்க உதவுதல்."
                  : "Helping students build a stronger future with confidence, independence and dignity."}
              </p>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}

export default Education;