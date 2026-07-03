import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { categories } from '../data/projectsData';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleCategory = (id) => {
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate(`/projects/${id}`);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link className="nav-brand" to="/">Pratheeeksha Maya Jayaprasad</Link>

        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>About</NavLink>
          </li>
          <li>
            <NavLink to="/#skills" onClick={() => { setMenuOpen(false); setTimeout(() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>
              Skills
            </NavLink>
          </li>

          {/* Projects dropdown */}
          <li className="nav-dropdown-wrap" ref={dropdownRef}>
            <button
              className={`nav-dropdown-trigger ${dropdownOpen ? 'trigger-active' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Projects
              <svg className={`chevron ${dropdownOpen ? 'chevron-open' : ''}`} viewBox="0 0 10 6" width="10" height="6">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </button>

            {dropdownOpen && (
              <ul className="nav-dropdown">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button className="dropdown-item" onClick={() => handleCategory(cat.id)}>
                      <span className="dropdown-icon">{cat.icon}</span>
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <NavLink to="/blogs" onClick={() => setMenuOpen(false)}>Blogs</NavLink>
          </li>
          <li>
            <NavLink to="/#contact" onClick={() => { setMenuOpen(false); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>
              Contact
            </NavLink>
          </li>
          <li>
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Hire Me</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
