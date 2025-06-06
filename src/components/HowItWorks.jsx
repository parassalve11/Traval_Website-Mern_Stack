import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaMapMarkerAlt, FaCreditCard, FaBackspace, FaArrowRight } from 'react-icons/fa';

const HowItWorks = () => {
  const headingRef = useRef(null);
  const stepRefs = useRef([]);
  const arrowRefs = useRef([]);

  useEffect(() => {
    // Animate heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }

    // Animate steps with stagger
    if (stepRefs.current.length) {
      gsap.fromTo(
        stepRefs.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: 'power2.out', delay: 0.5 }
      );
    }

    // Animate arrows
    if (arrowRefs.current.length) {
      gsap.fromTo(
        arrowRefs.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, stagger: 0.3, ease: 'power2.out', delay: 1 }
      );
    }

    // Hover effects for steps
    stepRefs.current.forEach((step) => {
      if (step) {
        step.addEventListener('mouseenter', () => {
          gsap.to(step, {
            scale: 1.05,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            duration: 0.3,
          });
          gsap.to(step.querySelector('.step-icon'), {
            scale: 1.2,
            color: '#10b981', // Bright teal on hover
            duration: 0.3,
          });
        });
        step.addEventListener('mouseleave', () => {
          gsap.to(step, {
            scale: 1,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
          });
          gsap.to(step.querySelector('.step-icon'), {
            scale: 1,
            color: '#1a5c38', // Base teal
            duration: 0.3,
          });
        });
      }
    });

    // Cleanup event listeners
    return () => {
      stepRefs.current.forEach((step) => {
        if (step) {
          step.removeEventListener('mouseenter', () => {});
          step.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  const steps = [
    {
      title: 'Select Your Destination',
      description: 'Browse and pick from a variety of breathtaking locations.',
      icon: <FaMapMarkerAlt className="step-icon text-4xl text-teal-800" />,
    },
    {
      title: 'Book & Pay Securely',
      description: 'Complete your booking with safe and fast payment options.',
      icon: <FaCreditCard className="step-icon text-4xl text-teal-800" />,
    },
    {
      title: 'Enjoy Your Adventure',
      description: 'Pack your bags and get ready for an unforgettable trip.',
      icon: <FaBackspace className="step-icon text-4xl text-teal-800" />,
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-teal-800 mb-4 font-display"
        >
          How It Works
        </h2>
        <p className="text-lg sm:text-xl text-center text-gray-600 font-body mb-12">
          Plan Your Trip in 3 Simple Steps
        </p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6 md:gap-8">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div
                ref={(el) => (stepRefs.current[index] = el)}
                className="flex-1 bg-gray-100 rounded-xl p-6 text-center shadow-md"
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-teal-800 font-display mb-2">{step.title}</h3>
                <p className="text-gray-600 font-body">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div
                  ref={(el) => (arrowRefs.current[index] = el)}
                  className="hidden md:flex items-center justify-center text-teal-800 text-2xl"
                >
                  <FaArrowRight />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;