import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaImages } from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Animate footer sections
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }

    // Animate individual sections with stagger
    if (sectionRefs.current.length) {
      gsap.fromTo(
        sectionRefs.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out', delay: 0.5 }
      );
    }

    // Exit early if footerRef.current is not available
    if (!footerRef.current) return;

    // Hover effects for links
    const links = footerRef.current.querySelectorAll('.footer-link') || [];
    const linkMouseEnter = (link) => {
      gsap.to(link, {
        scale: 1.1,
        color: '#10b981', // Bright teal on hover
        duration: 0.3,
      });
    };
    const linkMouseLeave = (link) => {
      gsap.to(link, {
        scale: 1,
        color: '#ffffff', // White base
        duration: 0.3,
      });
    };

    links.forEach((link) => {
      link.addEventListener('mouseenter', () => linkMouseEnter(link));
      link.addEventListener('mouseleave', () => linkMouseLeave(link));
    });

    // Hover effect for newsletter button
    const newsletterButton = footerRef.current.querySelector('.newsletter-button');
    const buttonMouseEnter = () => {
      gsap.to(newsletterButton, {
        scale: 1.1,
        background: 'linear-gradient(45deg, #1a5c38, #10b981)',
        boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
        duration: 0.3,
      });
    };
    const buttonMouseLeave = () => {
      gsap.to(newsletterButton, {
        scale: 1,
        background: '#10b981',
        boxShadow: 'none',
        duration: 0.3,
      });
    };

    if (newsletterButton) {
      newsletterButton.addEventListener('mouseenter', buttonMouseEnter);
      newsletterButton.addEventListener('mouseleave', buttonMouseLeave);
    }

    // Cleanup event listeners
    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', () => linkMouseEnter(link));
        link.removeEventListener('mouseleave', () => linkMouseLeave(link));
      });
      if (newsletterButton) {
        newsletterButton.removeEventListener('mouseenter', buttonMouseEnter);
        newsletterButton.removeEventListener('mouseleave', buttonMouseLeave);
      }
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000); // Reset after 3s
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <footer className="bg-black text-white py-12">
      <div ref={footerRef} className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div ref={(el) => (sectionRefs.current[0] = el)} className="space-y-4">
            <h3 className="text-xl font-bold text-teal-600 font-display">Company</h3>
            <ul className="space-y-2 font-body">
              <li>
                <a href="/about" className="footer-link hover:text-teal-600">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="footer-link hover:text-teal-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="/team" className="footer-link hover:text-teal-600">
                  Our Team
                </a>
              </li>
              <li>
                <a href="/faq" className="footer-link hover:text-teal-600">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div ref={(el) => (sectionRefs.current[1] = el)} className="space-y-4">
            <h3 className="text-xl font-bold text-teal-600 font-display">Contact</h3>
            <ul className="space-y-2 font-body text-gray-300">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-teal-600" />
                <span>On Earth</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-teal-600" />
                <div className="flex flex-col">
                  <a href="tel:+919220645328" className="footer-link hover:text-teal-600">
                    +91 79823 23147
                  </a>
                  
                </div>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-teal-600" />
                <a href="mailto:info@urbanotrips.com" className="footer-link hover:text-teal-600">
                  Puneetgupta11459282@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Gallery Section */}
          <div ref={(el) => (sectionRefs.current[2] = el)} className="space-y-4">
            <h3 className="text-xl font-bold text-teal-600 font-display">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((image, index) => (
                <a
                  key={index}
                  href={`/gallery/${image.title.toLowerCase()}`}
                  className="block rounded-md overflow-hidden border border-teal-600"
                  aria-label={`View ${image.title} gallery`}
                >
                  <img
                    src={image.url}
                    alt={`${image.title} thumbnail`}
                    className="w-full h-16 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </a>
              ))}
            </div>
            <a href="/gallery" className="footer-link hover:text-teal-600 font-body flex items-center gap-2">
              <FaImages className="text-teal-600" /> View Full Gallery
            </a>
          </div>

          {/* Newsletter Section */}
          <div ref={(el) => (sectionRefs.current[3] = el)} className="space-y-4">
            <h3 className="text-xl font-bold text-teal-600 font-display">Newsletter</h3>
            <p className="text-gray-300 font-body">Get Every Monthly Newsletter</p>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-md text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-600 font-body"
                aria-label="Enter your email for newsletter"
              />
              <button
                type="submit"
                className="newsletter-button px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-all"
                aria-label="Subscribe to newsletter"
              >
                <FaPaperPlane />
              </button>
            </form>
            {isSubmitted && (
              <p className="text-teal-600 font-body">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        {/* Copyright and Credits */}
        <div className="mt-12 text-center text-gray-400 font-body border-t border-gray-700 pt-6">
          <p>
            © Copyright 2025 
           
          </p>
        </div>
      </div>
    </footer>
  );
};

const galleryImages = [
  {
    title: 'Manali',
    url: 'https://images.unsplash.com/photo-1597073867736-6758e842e983?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60',
  },
  {
    title: 'Goa',
    url: 'https://images.unsplash.com/photo-1514282401047-d2e53feda951?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60',
  },
  {
    title: 'Ladakh',
    url: 'https://images.unsplash.com/photo-1597751853364-2c3e53e798dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60',
  },
];

export default Footer;