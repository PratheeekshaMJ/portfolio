import './Hero.css';
import profilePhoto from '/profile.png';

export default function Hero() {
  return (
    <section id="about" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="hero-label">UKG WFM Consultant &amp; Business Analyst</p>
          <h1>Pratheeksha Maya Jayaprasad</h1>
          <p className="hero-tagline">
            9+ years turning complex workforce data into clear decisions.
          </p>
          <p className="hero-bio">
            UKG Workforce Management Consultant with 6+ years hands-on with UKG Pro
            WFM/Dimensions and Kronos Workforce Central. I specialise in enterprise
            implementation support, pay policy configuration, payroll integration, QA
            validation, and workforce analytics — partnering with HR, Payroll, and
            Operations teams to get things right from go-live through hypercare.
            Currently pursuing an MS in Business Analytics at Tennessee Wesleyan University.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>View My Work</a>
            <a href="#contact" className="btn btn-outline">Get In Touch</a>
          </div>
        </div>
        <div className="hero-avatar">
          <div className="avatar-wrap">
            <img
              src={profilePhoto}
              alt="Pratheeksha Maya Jayaprasad"
              className="avatar-photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
