import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogsData';
import './BlogsPage.css';

const allCategories = ['All', ...new Set(blogs.map(b => b.category))];

export default function BlogsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = blogs.filter(b => {
    const matchCat = filter === 'All' || b.category === filter;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="blogs-page">
      <div className="blogs-hero">
        <div className="container">
          <p className="blogs-eyebrow">Knowledge Base</p>
          <h1>WFM Insights</h1>
          <p className="blogs-subtitle">
            Practical guides on UKG Dimensions — timekeeping, pay rules, scheduling, forecasting, and more.
          </p>
        </div>
      </div>

      <div className="container blogs-body">
        {/* Search + Filter */}
        <div className="blogs-controls">
          <input
            className="blogs-search"
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="blogs-filters">
            {allCategories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'filter-active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="blogs-count">{filtered.length} article{filtered.length !== 1 ? 's' : ''}</p>

        {/* Grid */}
        <div className="blogs-grid">
          {filtered.map((blog, i) => (
            <Link key={blog.id} to={`/blogs/${blog.id}`} className="blog-card">
              <div className="blog-card-top">
                <span className="blog-category">{blog.category}</span>
                <span className="blog-read-time">{blog.readTime} read</span>
              </div>
              <h3>{blog.title}</h3>
              <p className="blog-summary">{blog.summary}</p>
              <div className="blog-card-footer">
                <span className="blog-date">{blog.date}</span>
                <span className="blog-cta">Read →</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="blogs-empty">
            <p>No articles match your search. Try a different keyword or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
