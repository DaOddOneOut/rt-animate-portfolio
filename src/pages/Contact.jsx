// src/pages/Contact.jsx

import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email address.';
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert('Form submitted!');
    setForm({ name: '', email: '', message: '' });
    setErrors({});
  };

  return (
    <section className="flex items-center justify-center px-4 py-12 min-h-[calc(100vh-10rem)] text-ink">
      <Helmet>
        <title>RT.Animation | Contact</title>
        <meta name="description" content="Interested in working together or saying hi? Reach out to Rich here." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/80 dark:bg-black/60 backdrop-blur-lg p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-sketchPurple mb-6 text-center drop-shadow">
          Let’s Connect
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-ink dark:text-white">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 text-black dark:text-white bg-white dark:bg-gray-800"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-ink dark:text-white">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 text-black dark:text-white bg-white dark:bg-gray-800"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 font-medium text-ink dark:text-white">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 text-black dark:text-white bg-white dark:bg-gray-800"
              placeholder="Tell me about your project or say hello!"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-sketchPurple text-white px-6 py-2 rounded-md hover:bg-purple-600 transition"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
}
