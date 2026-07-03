import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogs } from '../data/blogsData';
import './BlogDetailPage.css';

function renderBlock(block, i) {
  switch (block.type) {
    case 'intro':
      return <p key={i} className="blog-intro">{block.text}</p>;

    case 'heading':
      return <h2 key={i} className="blog-h2">{block.text}</h2>;

    case 'text':
      return <p key={i} className="blog-text">{block.text}</p>;

    case 'list':
      return (
        <ul key={i} className="blog-list">
          {block.items.map((item, j) => <li key={j}>{item}</li>)}
        </ul>
      );

    case 'table':
      return (
        <div key={i} className="blog-table-wrap">
          <table className="blog-table">
            <thead>
              <tr>{block.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, j) => (
                <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'example':
      return (
        <div key={i} className="blog-example">
          <span className="blog-example-label">{block.label}</span>
          <p>{block.text}</p>
        </div>
      );

    default:
      return null;
  }
}

export default function BlogDetailPage() {
  const { blogId } = useParams();

  const blog = blogs.find(b => b.id === blogId);
  if (!blog) return <Navigate to="/blogs" replace />;

  const currentIndex = blogs.findIndex(b => b.id === blogId);
  const prev = blogs[currentIndex - 1];
  const next = blogs[currentIndex + 1];

  useEffect(() => { window.scrollTo(0, 0); }, [blogId]);

  return (
    <div className="blog-detail-page">
      {/* Header */}
      <div className="blog-detail-hero">
        <div className="container">
          <Link to="/blogs" className="back-link">← Back to all articles</Link>
          <div className="blog-detail-meta">
            <span className="blog-category">{blog.category}</span>
            <span className="blog-read-time">{blog.readTime} read</span>
            <span className="blog-date">{blog.date}</span>
          </div>
          <h1>{blog.title}</h1>
          <p className="blog-detail-summary">{blog.summary}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container blog-detail-body">
        <div className="blog-content">
          {blog.content.map((block, i) => renderBlock(block, i))}
        </div>

        {/* Prev / Next */}
        <div className="blog-nav">
          <div className="blog-nav-item">
            {prev && (
              <Link to={`/blogs/${prev.id}`} className="blog-nav-link blog-nav-prev">
                <span className="blog-nav-dir">← Previous</span>
                <span className="blog-nav-title">{prev.title}</span>
              </Link>
            )}
          </div>
          <div className="blog-nav-item blog-nav-right">
            {next && (
              <Link to={`/blogs/${next.id}`} className="blog-nav-link blog-nav-next">
                <span className="blog-nav-dir">Next →</span>
                <span className="blog-nav-title">{next.title}</span>
              </Link>
            )}
          </div>
        </div>

        {/* All articles */}
        <div className="blog-more">
          <h3>More Articles</h3>
          <div className="blog-more-grid">
            {blogs
              .filter(b => b.id !== blogId)
              .slice(0, 3)
              .map(b => (
                <Link key={b.id} to={`/blogs/${b.id}`} className="blog-more-card">
                  <span className="blog-category">{b.category}</span>
                  <p>{b.title}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
