// Contact.jsx
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); alert('Form submitted!'); };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} style={{ display: 'block', margin: '10px 0' }} />
        <input name="email" value={formData.email} onChange={handleChange} style={{ display: 'block', margin: '10px 0' }} />
        <textarea name="message" value={formData.message} onChange={handleChange} style={{ display: 'block', margin: '10px 0' }} />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
