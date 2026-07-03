import './Hero.css';

export default function Hero() {
  return (
    <section id="about" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-label">Business Analyst</p>
          <h1>Pratheeeksha Maya Jayaprasad</h1>
          <p className="hero-tagline">
            Bridging the gap between business needs and technical solutions.
          </p>
          <p className="hero-bio">
            Experienced Business Analyst with a passion for translating complex business
            requirements into actionable insights and solutions. Skilled in stakeholder
            management, process optimization, and data-driven decision making across
            industries including finance, healthcare, and technology.
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
