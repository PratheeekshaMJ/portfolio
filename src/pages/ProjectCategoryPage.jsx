import { useState, useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { categories } from '../data/projectsData';
import './ProjectCategoryPage.css';

function TableauEmbed({ html }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = html;

    const vizId = 'viz1783022111647';
    const divElement = ref.current.querySelector(`#${vizId}`);
    if (!divElement) return;

    const vizElement = divElement.getElementsByTagName('object')[0];
    const w = ref.current.offsetWidth;
    vizElement.style.width = '100%';
    vizElement.style.minHeight = '400px';
    vizElement.style.height = (w > 500 ? w * 0.6 : 600) + 'px';

    const existing = document.querySelector('script[src*="viz_v1.js"]');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(script, vizElement);

    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, [html]);

  return <div ref={ref} className="tableau-container" />;
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`modal ${project.tableau ? 'modal-wide' : ''}`} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-header">
          <div>
            <p className="modal-industry">{project.industry}</p>
            <h2>{project.title}</h2>
            <p className="modal-role">{project.role}</p>
          </div>
        </div>

        <div className="modal-meta-row">
          <span className="modal-meta-item"><strong>Duration:</strong> {project.duration}</span>
          <span className="modal-meta-item"><strong>Team:</strong> {project.team}</span>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <span className="modal-label">Challenge</span>
            <p>{project.problem}</p>
            {project.context && <p className="modal-context">{project.context}</p>}
          </div>
          <div className="modal-section">
            <span className="modal-label">Approach</span>
            <p>{project.approach}</p>
            {project.steps && (
              <ul className="modal-steps">
                {project.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            )}
          </div>
          <div className="modal-section">
            <span className="modal-label">Outcome</span>
            <p>{project.outcome}</p>
            {project.metrics && (
              <div className="modal-metrics">
                {project.metrics.map((m, i) => (
                  <div key={i} className="metric-card">
                    <span className="metric-value">{m.value}</span>
                    <span className="metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {project.tableau && (
          <div className="modal-tableau">
            <span className="modal-label">Live Dashboard</span>
            <TableauEmbed html={project.tableau} />
          </div>
        )}

        <div className="modal-tags">
          {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCategoryPage() {
  const { categoryId } = useParams();
  const [selected, setSelected] = useState(null);

  const category = categories.find(c => c.id === categoryId);
  if (!category) return <Navigate to="/projects/analytics" replace />;

  return (
    <div className="category-page">
      <div className="category-hero">
        <div className="container">
          <span className="category-icon">{category.icon}</span>
          <h1>{category.label}</h1>
          <p className="category-subtitle">Projects & Case Studies</p>
        </div>
      </div>

      <div className="container category-body">
        <div className="projects-grid">
          {category.projects.map((p, i) => (
            <button key={i} className="project-card" onClick={() => setSelected(p)}>
              <p className="card-industry">{p.industry}</p>
              <h3>{p.title}</h3>
              <p className="card-role">{p.role}</p>
              <p className="card-preview">{p.problem}</p>
              <div className="card-tags">
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="card-footer">
                {p.tableau && <span className="card-badge">📊 Live Dashboard</span>}
                <span className="card-cta">View Case Study →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
