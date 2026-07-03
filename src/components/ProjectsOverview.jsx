import { useNavigate } from 'react-router-dom';
import { categories } from '../data/projectsData';
import './ProjectsOverview.css';

export default function ProjectsOverview() {
  const navigate = useNavigate();

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Projects & Case Studies</h2>
        <div className="section-divider" />
        <p className="projects-overview-desc">
          Explore my work across key WFM domains — from analytics and forecasting
          to timekeeping, pay rules, and scheduling.
        </p>
        <div className="overview-grid">
          {categories.map(cat => (
            <button
              key={cat.id}
              className="overview-card"
              onClick={() => navigate(`/projects/${cat.id}`)}
            >
              <span className="overview-icon">{cat.icon}</span>
              <h3>{cat.label}</h3>
              <p className="overview-count">{cat.projects.length} case {cat.projects.length === 1 ? 'study' : 'studies'}</p>
              <span className="overview-cta">Explore →</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
