import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // Replace with your form service (Formspree, EmailJS, etc.)
    setSent(true);
  };

  return (
    <section id="contact">
      <div className="container contact-inner">
        <div className="contact-info">
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider" />
          <p className="contact-desc">
            I'm open to new opportunities, consulting engagements, and collaboration.
            Feel free to reach out — I'll get back to you within 24 hours.
          </p>
          <ul className="contact-details">
            <li>
              <span className="contact-icon">✉</span>
              <a href="mailto:your@email.com">your@email.com</a>
            </li>
            <li>
              <span className="contact-icon">in</span>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">
                linkedin.com/in/yourprofile
              </a>
            </li>
            <li>
              <span className="contact-icon">↓</span>
              <a href="/resume.pdf" download>Download Resume (PDF)</a>
            </li>
          </ul>
        </div>

        <div className="contact-form-wrap">
          {sent ? (
            <div className="form-success">
              <p>Thank you! Your message has been sent.</p>
              <p>I'll be in touch shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                />
              </label>
              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows="5"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                />
              </label>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
