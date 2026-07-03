import './Skills.css';

const categories = [
  {
    title: 'Business Analysis',
    items: ['Requirements Elicitation', 'Gap Analysis', 'Process Mapping', 'User Stories & Epics', 'BRD / FRD Writing', 'Stakeholder Management'],
  },
  {
    title: 'Tools & Platforms',
    items: ['JIRA & Confluence', 'Microsoft Visio', 'Lucidchart', 'Balsamiq', 'MS Project', 'SharePoint'],
  },
  {
    title: 'Data & Reporting',
    items: ['SQL', 'Excel (Advanced)', 'Power BI', 'Tableau', 'Google Analytics', 'Data Modelling'],
  },
  {
    title: 'Methodologies',
    items: ['Agile / Scrum', 'Waterfall', 'SDLC', 'SAFe', 'Six Sigma (Green Belt)', 'BPMN 2.0'],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="section-divider" />
        <div className="skills-grid">
          {categories.map(cat => (
            <div key={cat.title} className="skill-card">
              <h3>{cat.title}</h3>
              <ul>
                {cat.items.map(item => (
                  <li key={item}>
                    <span className="skill-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
