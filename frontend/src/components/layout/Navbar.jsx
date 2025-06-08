import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaBars, FaTimes, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { BiPhone } from 'react-icons/bi';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const galleryButtonRefs = useRef([]);
  const logoTextRef = useRef(null);

  useEffect(() => {
    // Dropdown animation
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        height: isPagesDropdownOpen ? 'auto' : 0,
        opacity: isPagesDropdownOpen ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    // Exit early if navRef.current is not available
    if (!navRef.current) return;

    // Hover effects for nav links
    const navLinks = navRef.current.querySelectorAll('.nav-link') || [];
    const linkMouseEnter = (link) => {
      gsap.to(link, {
        scale: 1.1,
        color: '#10b981',
        duration: 0.3,
      });
    };
    const linkMouseLeave = (link) => {
      gsap.to(link, {
        scale: 1,
        color: '#ffffff',
        duration: 0.3,
      });
    };

    navLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => linkMouseEnter(link));
      link.addEventListener('mouseleave', () => linkMouseLeave(link));
    });

    // Hover effect for phone button
    const phoneButton = navRef.current.querySelector('.phone-button');
    const buttonMouseEnter = () => {
      gsap.to(phoneButton, {
        scale: 1.1,
        background: 'linear-gradient(45deg, #1a5c38, #10b981)',
        boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
        duration: 0.3,
      });
    };
    const buttonMouseLeave = () => {
      gsap.to(phoneButton, {
        scale: 1,
        background: '#10b981',
        boxShadow: 'none',
        duration: 0.3,
      });
    };

    if (phoneButton) {
      phoneButton.addEventListener('mouseenter', buttonMouseEnter);
      phoneButton.addEventListener('mouseleave', buttonMouseLeave);
    }

    // Hover effect for gallery buttons
    galleryButtonRefs.current.forEach((button) => {
      if (button) {
        const arrow = button.querySelector('.gallery-arrow');
        const onMouseEnter = () => {
          gsap.to(button, {
            scale: 1.1,
            background: 'linear-gradient(45deg, #1a5c38, #10b981)',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
            duration: 0.3,
          });
          if (arrow) {
            gsap.to(arrow, {
              x: 5,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        };
        const onMouseLeave = () => {
          gsap.to(button, {
            scale: 1,
            background: '#10b981',
            boxShadow: 'none',
            duration: 0.3,
          });
          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        };

        button.addEventListener('mouseenter', onMouseEnter);
        button.addEventListener('mouseleave', onMouseLeave);

        button._onMouseEnter = onMouseEnter;
        button._onMouseLeave = onMouseLeave;
      }
    });

    // Logo text animation
    if (logoTextRef.current) {
      gsap.fromTo(
        logoTextRef.current.children,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    }

    // Cleanup event listeners
    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener('mouseenter', () => linkMouseEnter(link));
        link.removeEventListener('mouseleave', () => linkMouseLeave(link));
      });
      if (phoneButton) {
        phoneButton.removeEventListener('mouseenter', buttonMouseEnter);
        phoneButton.removeEventListener('mouseleave', buttonMouseLeave);
      }
      galleryButtonRefs.current.forEach((button) => {
        if (button) {
          button.removeEventListener('mouseenter', button._onMouseEnter);
          button.removeEventListener('mouseleave', button._onMouseLeave);
        }
      });
      gsap.killTweensOf(logoTextRef.current?.children);
    };
  }, [isPagesDropdownOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsPagesDropdownOpen(false);
  };

  const togglePagesDropdown = () => {
    setIsPagesDropdownOpen(!isPagesDropdownOpen);
  };

  return (
    <nav ref={navRef} className="fixed top-0 shadow-md left-0 w-full bg-black z-50 font-body">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between py-3">
        {/* Logo and Headline */}
        <div ref={logoTextRef} className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
         
          <div className="flex items-center gap-1">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-display tracking-tight">
              SANSAR
            </span>
             <img
            src="./logo.png"
            alt="Sansar Travals Logo"
            className="w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover"
          />
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-600 font-display tracking-tight">
              TRAVALS
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <a href="/" className="nav-link text-white hover:text-teal-600 transition-colors text-sm lg:text-base">
            Home
          </a>
          <a href="/upcoming-trips" className="nav-link text-white hover:text-teal-600 transition-colors text-sm lg:text-base">
            Upcoming Trips
          </a>
          <a href="/about" className="nav-link text-white hover:text-teal-600 transition-colors text-sm lg:text-base">
            About
          </a>
          {/* Pages Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsPagesDropdownOpen(true)}
            onMouseLeave={() => setIsPagesDropdownOpen(false)}
          >
            <button className="nav-link text-white hover:text-teal-600 flex items-center gap-1 text-sm lg:text-base">
              Pages <FaChevronDown className="text-sm text-teal-600" />
            </button>
            <div
              ref={dropdownRef}
              className={`absolute top-full left-0 bg-gray-800 text-white rounded-md shadow-lg w-48 overflow-hidden transition-all duration-300 ${isPagesDropdownOpen ? 'block' : 'hidden'}`}
            >
              <a
                href="/destination"
                className="block px-4 py-2 hover:bg-teal-600 hover:text-white transition-colors text-sm"
              >
                Destination
              </a>
              <a
                href="/booking"
                className="block px-4 py-2 hover:bg-teal-600 hover:text-white transition-colors text-sm"
              >
                Booking
              </a>
              <a
                href="/reviews"
                className="block px-4 py-2 hover:bg-teal-600 hover:text-white transition-colors text-sm"
              >
                Reviews
              </a>
              <a
                href="/testimonials"
                className="block px-4 py-2 hover:bg-teal-600 hover:text-white transition-colors text-sm"
              >
                Testimonials
              </a>
            </div>
          </div>
          <a
            href="/gallary"
            ref={(el) => (galleryButtonRefs.current[0] = el)}
            className="gallery-button px-3 py-1.5 text-white bg-teal-600 rounded-full hover:bg-teal-700 transition-all flex items-center gap-2 text-sm lg:text-base"
            aria-label="View Gallery"
          >
            View Gallery <FaArrowRight className="gallery-arrow text-teal-200" />
          </a>
          <a
            href="tel:+917982323147"
            className="phone-button px-3 py-1.5 text-white flex items-center gap-2 bg-teal-600 rounded-full hover:bg-teal-700 transition-all text-sm lg:text-base"
            aria-label="Call us at +91 79823 23147"
          >
            <BiPhone /> +91 79823 23147
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-teal-600 focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-100 text-black">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <a href="/" className="nav-link text-black hover:text-teal-600 text-sm">
              Home
            </a>
            <a href="/upcoming-trips" className="nav-link text-black hover:text-teal-600 text-sm">
              Upcoming Trips
            </a>
            <a href="/about" className="nav-link text-black hover:text-teal-600 text-sm">
              About
            </a>
            {/* Mobile Pages Dropdown */}
            <div>
              <button
                onClick={togglePagesDropdown}
                className="nav-link text-black hover:text-teal-600 flex items-center gap-1 text-sm"
              >
                Pages <FaChevronDown className="text-sm text-teal-600" />
              </button>
              {isPagesDropdownOpen && (
                <div className="pl-4 flex flex-col space-y-2 mt-2 bg-gray-800 rounded-md">
                  <a href="/destination" className="text-white hover:text-teal-600 py-1 text-sm">
                    Destination
                  </a>
                  <a href="/booking" className="text-white hover:text-teal-600 py-1 text-sm">
                    Booking
                  </a>
                  <a href="/reviews" className="text-white hover:text-teal-600 py-1 text-sm">
                    Reviews
                  </a>
                  <a href="/testimonials" className="text-white hover:text-teal-600 py-1 text-sm">
                    Testimonials
                  </a>
                </div>
              )}
            </div>
            <a
              href="/gallary"
              ref={(el) => (galleryButtonRefs.current[1] = el)}
              className="gallery-button px-4 py-2 text-white bg-teal-600 rounded-full hover:bg-teal-700 transition-all flex items-center gap-2 text-sm"
              aria-label="View Gallery"
            >
              View Gallery <FaArrowRight className="gallery-arrow text-teal-200" />
            </a>
            <a
              href="tel:+917982323147"
              className="phone-button px-4 py-2 text-white bg-teal-600 rounded-full hover:bg-teal-700 text-center text-sm"
              aria-label="Call us at +91 79823 23147"
            >
              +91 79823 23147
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;