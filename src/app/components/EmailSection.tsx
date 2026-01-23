// src/app/components/EmailSection.tsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import motion for animation

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setEmailSubmitted(false);

    const data = {
      email: e.currentTarget.email.value,
      subject: e.currentTarget.subject.value,
      message: e.currentTarget.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSONdata,
      });

      if (response.status === 200) {
        console.log("Message sent.");
        setEmailSubmitted(true);
        e.currentTarget.reset(); // Clear form fields
      } else {
        const errorData = await response.json();
        setError(`Failed to send. Error: ${errorData.error || response.statusText}`);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      id="contact"
      className='grid md:grid-cols-2 my-16 py-20 gap-12 relative overflow-hidden'
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* CONNECT TEXT & SOCIALS */}
      <div className="z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Let&apos;s <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className='text-[#ADB7BE] text-lg mb-8 max-w-md leading-relaxed'>
            I&apos;m currently looking for new opportunities and collaborations.
            Whether you have a project in mind or just want to say hello, my inbox is always open!
          </p>
          <div className='socials flex flex-row gap-4'>
            <Link href="https://github.com/your-github" target="_blank">
              <div className="group p-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                <Image src="/images/github.gif" alt="Github Icon" width={32} height={32} className="group-hover:scale-110 transition-transform" />
              </div>
            </Link>
            <Link href="https://linkedin.com/in/your-linkedin" target="_blank">
              <div className="group p-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                <Image src="/images/linkedin.gif" alt="Linkedin Icon" width={32} height={32} className="group-hover:scale-110 transition-transform" />
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* CONTACT FORM */}
      <div className="z-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          {emailSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-green-400 text-lg">Thank you for reaching out. I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="text-white block mb-2 text-sm font-semibold">Your Email</label>
                <input 
                  name="email" 
                  type="email" 
                  id="email" 
                  required 
                  className="bg-[#0a0a0a] border border-white/10 placeholder-[#9CA2A9] text-gray-100 text-base rounded-xl block w-full p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none" 
                  placeholder="jacob@example.com" 
                />
              </div>
              <div>
                <label htmlFor="subject" className="text-white block mb-2 text-sm font-semibold">Subject</label>
                <input 
                  name="subject" 
                  type="text" 
                  id="subject" 
                  required 
                  className="bg-[#0a0a0a] border border-white/10 placeholder-[#9CA2A9] text-gray-100 text-base rounded-xl block w-full p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none" 
                  placeholder="Let's collaborate on..." 
                />
              </div>
              <div>
                <label htmlFor="message" className="text-white block mb-2 text-sm font-semibold">Message</label>
                <textarea 
                  name="message" 
                  id="message" 
                  rows={5}
                  className="bg-[#0a0a0a] border border-white/10 placeholder-[#9CA2A9] text-gray-100 text-base rounded-xl block w-full p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none resize-none" 
                  placeholder="Your message here..." 
                />
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`group relative bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl w-full transition-all duration-300 overflow-hidden ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-purple-500/50 cursor-pointer'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </span>
                {!isSubmitting && (
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </motion.button>
              
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm p-3 bg-red-900/20 border border-red-500/30 rounded-lg"
                >
                  {error}
                </motion.p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EmailSection;