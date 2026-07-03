import './Hero.css';

export default function Hero() {
  return (
    <section id="about" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-label">WFM Analyst</p>
          <h1>Pratheeeksha Maya Jayaprasad</h1>
          <p className="hero-tagline">
            Bridging the gap between workforce operations and technology solutions.
          </p>
          <p className="hero-bio">
            Experienced WFM Analyst with a passion for translating complex workforce
            requirements into actionable insights and solutions. Skilled in timekeeping,
            scheduling, pay rules, accruals, and forecasting across UKG Dimensions
            and enterprise workforce management platforms.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-outline">Get In Touch</a>
          </div>
        </div>
        <div className="hero-avatar">
          <div className="avatar-placeholder">
            <span>PMJ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
