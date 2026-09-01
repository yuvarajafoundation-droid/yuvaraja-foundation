import "./education.css";

function Livelihood({ language = "en" }) {
  const tamil = language === "ta";

  return (
    <main>
      <section className="page-section">
        <div className="page-container">

          <span className="section-label">
            {tamil ? "YRF வாழ்வாதாரம்" : "YRF Livelihood"}
          </span>

          <h1>
            {tamil
              ? "வாழ்வாதாரம் என்பது ஒரு வாய்ப்பு. அது ஒரு குடும்பத்தின் எதிர்காலத்தை மாற்றும்."
              : "A livelihood is more than an income. It is a pathway to a stronger future."}
          </h1>

          <p className="page-intro">
            {tamil
              ? "ஒவ்வொருவரும் தன்னம்பிக்கையுடனும் கண்ணியத்துடனும் வாழ்வதற்குத் தேவையான திறன்கள், வேலைவாய்ப்புகள் மற்றும் வாழ்வாதார வாய்ப்புகளை உருவாக்குவதே எங்கள் நோக்கம்."
              : "We work to create skills, employment and livelihood opportunities that help individuals and families build secure and dignified futures."}
          </p>

          <div className="programme-details">

            <article className="programme-card">
              <span className="programme-number">01</span>

              <h2>
                {tamil ? "எங்கள் நோக்கம்" : "Our focus"}
              </h2>

              <p>
                {tamil
                  ? "வேலை தேடும் இளைஞர்கள், பெண்கள் மற்றும் குடும்பங்களுக்கு திறன் மேம்பாடு மற்றும் வருமான வாய்ப்புகளை உருவாக்க உதவுதல்."
                  : "Supporting young people, women and families with skills, guidance and opportunities to build sustainable sources of income."}
              </p>
            </article>

            <article className="programme-card">
              <span className="programme-number">02</span>

              <h2>
                {tamil ? "நாங்கள் ஆதரிப்பது" : "What we support"}
              </h2>

              <p>
                {tamil
                  ? "தொழில் பயிற்சி, திறன் மேம்பாடு, வேலைவாய்ப்பு இணைப்பு, சுயதொழில் மற்றும் சிறு தொழில் முயற்சிகளுக்கு ஆதரவு."
                  : "Skill development, vocational training, employment connections, self-employment and small livelihood initiatives."}
              </p>
            </article>

            <article className="programme-card">
              <span className="programme-number">03</span>

              <h2>
                {tamil ? "முன்னேற்றத்தை நோக்கி" : "Looking ahead"}
              </h2>

              <p>
                {tamil
                  ? "ஒவ்வொரு குடும்பமும் நிலையான வருமானத்துடனும் தன்னம்பிக்கையுடனும் கண்ணியத்துடனும் முன்னேறுவதற்கான வாய்ப்புகளை உருவாக்குதல்."
                  : "Creating pathways for individuals and families to achieve stable incomes, greater independence and a life of dignity."}
              </p>
            </article>

          </div>

        </div>
      </section>
    </main>
  );
}

export default Livelihood;