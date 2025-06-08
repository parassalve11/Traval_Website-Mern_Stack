import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import ImageMouseTrail from './ui/ImageMouseTrail'; // Adjust path as needed

const Gallery = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const showcaseTextRef = useRef(null);
  const tapPromptRef = useRef(null);
  const scrollDownRef = useRef(null);
  const [showTapPrompt, setShowTapPrompt] = useState(true);

  useEffect(() => {
    // Animate section
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }

    // Staggered animation for heading, description, showcase text, tap prompt, button, and scroll down
    gsap.fromTo(
      [
        headingRef.current,
        descriptionRef.current,
        showcaseTextRef.current,
        tapPromptRef.current,
        buttonRef.current,
        scrollDownRef.current,
      ].filter(Boolean),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', delay: 0.3 }
    );

    // Scroll down animation
    if (scrollDownRef.current) {
      gsap.to(scrollDownRef.current, {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Hover effect for button
    if (buttonRef.current) {
      const onMouseEnter = () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          background: 'linear-gradient(45deg, #1a5c38, #10b981)',
          boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
          duration: 0.3,
        });
        gsap.to(buttonRef.current.querySelector('.back-arrow'), {
          x: -5,
          duration: 0.3,
          ease: 'power2.out',
        });
      };
      const onMouseLeave = () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          background: '#10b981',
          boxShadow: 'none',
          duration: 0.3,
        });
        gsap.to(buttonRef.current.querySelector('.back-arrow'), {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      buttonRef.current.addEventListener('mouseenter', onMouseEnter);
      buttonRef.current.addEventListener('mouseleave', onMouseLeave);

      // Hover effect for scroll down
      const scrollDownMouseEnter = () => {
        gsap.to(scrollDownRef.current, {
          scale: 1.1,
          background: 'linear-gradient(45deg, #1a5c38, #10b981)',
          boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
          duration: 0.3,
        });
      };
      const scrollDownMouseLeave = () => {
        gsap.to(scrollDownRef.current, {
          scale: 1,
          background: '#10b981',
          boxShadow: 'none',
          duration: 0.3,
        });
      };

      scrollDownRef.current.addEventListener('mouseenter', scrollDownMouseEnter);
      scrollDownRef.current.addEventListener('mouseleave', scrollDownMouseLeave);

      return () => {
        buttonRef.current?.removeEventListener('mouseenter', onMouseEnter);
        buttonRef.current?.removeEventListener('mouseleave', onMouseLeave);
        scrollDownRef.current?.removeEventListener('mouseenter', scrollDownMouseEnter);
        scrollDownRef.current?.removeEventListener('mouseleave', scrollDownMouseLeave);
      };
    }

    // Fade out tap prompt when hidden
    if (!showTapPrompt && tapPromptRef.current) {
      gsap.to(tapPromptRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          if (tapPromptRef.current) {
            tapPromptRef.current.style.display = 'none';
          }
        },
      });
    }
  }, [showTapPrompt]);

  // Travel-themed images with alt text
  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGluZGlhfGVufDB8fDB8fHww', alt: 'Snow-capped mountains in Manali' },
    { src: 'https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWF8ZW58MHx8MHx8fDA%3D', alt: 'Sunset beach in Goa' },
    { src: 'https://images.unsplash.com/photo-1519955266818-0231b63402bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhfGVufDB8fDB8fHww', alt: 'Rugged terrain of Ladakh' },
    { src: 'https://images.unsplash.com/photo-1580818135730-ebd11086660b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtlcmFsYXxlbnwwfHwwfHx8MA%3D%3D', alt: 'Lush backwaters of Kerala' },
    { src: 'https://images.unsplash.com/photo-1572782252655-9c8771392601?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFoYXJhc2h0cmF8ZW58MHx8MHx8fDA%3D', alt: 'Colorful palace in Rajasthan' },
  ];

  // Responsive ImageMouseTrail props
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const trailProps = {
    maxNumberOfImages: isMobile ? 2 : 4,
    imgClass: isMobile ? 'w-24 h-32 object-cover rounded-md' : 'w-32 h-40 object-cover rounded-md',
    distance: isMobile ? 12 : 15,
  };

  const handleInteractionStart = () => {
    if (showTapPrompt) {
      setShowTapPrompt(false);
    }
  };

  return (
    <section ref={sectionRef} className="bg-black text-white py-12 relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Heading and Description */}
        <h1 ref={headingRef} className="text-3xl md:text-4xl font-bold text-teal-600 font-display text-center mb-3">
          Our Gallery
        </h1>
        <p ref={descriptionRef} className="text-gray-300 font-body text-center max-w-xl mx-auto mb-6 text-sm md:text-base">
          Discover the beauty of our travel destinations through stunning visuals of India’s iconic landscapes.
        </p>

        {/* ImageMouseTrail with Showcase Text and Tap Prompt */}
        <div className="relative">
          <ImageMouseTrail
            items={galleryImages}
            className="h-[300px] md:h-[400px] bg-gray-900 rounded-lg overflow-hidden"
            {...trailProps}
            fadeAnimation={true}
            onTouchStart={handleInteractionStart}
            onMouseDown={handleInteractionStart}
          >
            <div
              ref={showcaseTextRef}
              className="absolute inset-0 flex items-center justify-center text-teal-600 text-2xl md:text-3xl font-display bg-black bg-opacity-50 rounded-lg pointer-events-none"
            >
              Explore Our Journeys
            </div>
            {showTapPrompt && (
              <div
                ref={tapPromptRef}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-body bg-black bg-opacity-70 px-3 py-1 rounded-md md:hidden pointer-events-none"
                aria-live="polite"
              >
                Tap to Start
              </div>
            )}
          </ImageMouseTrail>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-6">
          <a
            href="/gallary"
            ref={buttonRef}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm md:text-base text-white bg-teal-600 rounded-full hover:bg-teal-700 transition-all font-body"
            aria-label="View Gallery"
          >
            <FaArrowRight className="back-arrow text-teal-200 text-sm" /> View Gallery
          </a>
        </div>

        {/* Scroll Down Indicator */}
        <div
          ref={scrollDownRef}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 text-sm text-white bg-teal-600 bg-opacity-70 rounded-full cursor-pointer font-body md:bottom-6"
          aria-label="Scroll down to view more content"
          onClick={() => window.scrollTo({ top: window.scrollY + window.innerHeight, behavior: 'smooth' })}
        >
          <span>Scroll Down</span>
          <FaChevronDown className="text-teal-200" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;