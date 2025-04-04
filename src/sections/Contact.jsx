import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        'service_qu57tbb',
        'template_znug9nv',
        {
          from_name: form.name,
          to_name: 'Roni Sarkar',
          from_email: form.email,  // Corrected variable name
          to_email: 'ronisarkar10938@gmail.com',
          message: form.message,
          reply_to: form.email,  // Added reply_to field
        },
        'ril0RSOHZiT8uRJXp'
      );
      setLoading(false);
      alert('Your message has been sent!');
      setForm({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert('Something went wrong!');
    }
  };

  return (
    <section className="c-space my-20" id='contact'>
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <div className="hidden md:block">
          <img src="/assets/terminal.png" alt="terminal background" className="absolute inset-0 min-h-screen" />
        </div>

        <div className="contact-container">
          <h3 className="head-text mt-8">Let's talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you're looking to build a new website, improve your existing platform, or bring a unique project to
            life, I'm here to help.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3 mt-12 space-y-5">
            <label className="space-y-2">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input focus:outline-none focus:ring-2 focus:ring-white-900 transition ease-in-out duration-300"
                placeholder="John Doe"
              />
            </label>
            <label className="space-y-2">
              <span className="field-label">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input focus:outline-none focus:ring-2 focus:ring-white-900 transition ease-in-out duration-300"
                placeholder="johndoe@gmail.com"
              />
            </label>
            <label className="space-y-2">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input focus:outline-none focus:ring-2 focus:ring-white-900 transition ease-in-out duration-300"
                placeholder="Hi, I want to work with you!"
              />
            </label>
            <button className="field-btn hover:bg-indigo-700 transition ease-in-out duration-300" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
