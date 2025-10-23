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
    // Add margin-y for separation and a motion wrapper
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      id="contact"
      className='grid md:grid-cols-2 my-12 py-16 gap-8 relative overflow-hidden' // Adjusted padding, added overflow-hidden
    >
      
      {/* BACKGROUND BLOB - Set to a lower z-index */}
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-transparent rounded-full h-80 w-80 z-0 blur-3xl absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      
      {/* CONNECT TEXT & SOCIALS */}
      <div className="z-10">
        <h5 className='text-3xl font-bold text-white mb-4'>Let&apos;s Connect</h5>
        <p className='text-[#ADB7BE] mb-6 max-w-md leading-relaxed'>
          I&apos;m currently looking for new opportunities and collaborations.
          If you have a project in mind or just want to say hello, feel free to reach out!
        </p>
        <div className='socials flex flex-row gap-4'> {/* Increased gap */}
          <Link href="https://github.com/your-github" target="_blank">
            <Image src="/images/github.gif" alt="Github Icon" width={40} height={40} className="rounded-full transition-transform hover:scale-110" /> {/* Larger icons, better hover */}
          </Link>
          <Link href="https://linkedin.com/in/your-linkedin" target="_blank">
            <Image src="/images/linkedin.gif" alt="Linkedin Icon" width={40} height={40} className="rounded-md transition-transform hover:scale-110" /> {/* Larger icons, better hover */}
          </Link>
        </div>
      </div>
      
      {/* CONTACT FORM */}
      <div className="z-10">
        {emailSubmitted ? (
          <p className="text-green-400 text-lg font-semibold mt-2 p-4 bg-green-900/50 rounded-lg">
            Thank you! Your email has been successfully sent.
          </p>
        ) : (
          <form className='flex flex-col space-y-4' onSubmit={handleSubmit}> {/* Added space-y-4 for vertical gap */}
            {/* Input fields enhanced with better focus/hover states */}
            <div>
              <label htmlFor="email" className="text-white block mb-2 text-base font-medium">Your email</label>
              <input 
                name="email" 
                type="email" 
                id="email" 
                required 
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-3 focus:border-purple-500 focus:ring-purple-500 transition-colors" 
                placeholder="jacob@google.com" 
              />
            </div>
            <div>
              <label htmlFor="subject" className="text-white block text-base mb-2 font-medium">Subject</label>
              <input 
                name="subject" 
                type="text" 
                id="subject" 
                required 
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-3 focus:border-purple-500 focus:ring-purple-500 transition-colors" 
                placeholder="Just saying hi" 
              />
            </div>
            <div>
              <label htmlFor="message" className="text-white block text-base mb-2 font-medium">Message</label>
              <textarea 
                name="message" 
                id="message" 
                rows={6} // Increased rows for better usability
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-3 focus:border-purple-500 focus:ring-purple-500 transition-colors" 
                placeholder="Let's talk about..." 
              />
            </div>
            
            {/* Submit Button - Enhanced with Disabled State and Loading Text */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold py-3 px-5 rounded-lg w-full transition-all duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-pink-600 cursor-pointer'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
            
            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-sm mt-2 p-2 bg-red-900/50 rounded-lg">
                {error}
              </p>
            )}

          </form>
        )}
      </div>
    </motion.section>
  );
};

export default EmailSection;