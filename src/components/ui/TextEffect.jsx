import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Indian cities for scrambling effect
const indianCities = ['Delhi', 'Mumbai', 'Jaipur', 'Kolkata', 'Chennai', 'Agra', 'Varanasi', 'Goa'];

export function TravelTextEffect({ text, className }) {
  const textRef = useRef(null);

  useEffect(() => {
    const chars = text.split('');
    // const duration = 0.05; // Faster per-character transition
    const initialScrambleDuration = 0.5; // Short initial scramble
    const revealDelay = 0.8; // Delay before revealing actual text

    // Wrap each character in a span for individual animation
    const charElements = textRef.current.children;
    gsap.set(charElements, { opacity: 0, y: 20 });

    // Scramble animation with Indian city names
    const tl = gsap.timeline();
    tl.to(charElements, {
      duration: initialScrambleDuration / chars.length,
      stagger: 0.05,
      onStart: () => {
        charElements.forEach((el) => {
          const randomCity = indianCities[Math.floor(Math.random() * indianCities.length)];
          el.textContent = randomCity[Math.floor(Math.random() * randomCity.length)];
        });
      },
      onComplete: () => {
        charElements.forEach((el) => {
          const randomCity = indianCities[Math.floor(Math.random() * indianCities.length)];
          el.textContent = randomCity[Math.floor(Math.random() * randomCity.length)];
        });
      },
    }).to(charElements, {
      duration: 0.1,
      stagger: 0.05,
      onUpdate: function () {
        const progress = this.progress();
        charElements.forEach((el, i) => {
          if (progress > (i / chars.length) * 0.5) {
            el.textContent = chars[i];
          } else {
            const randomCity = indianCities[Math.floor(Math.random() * indianCities.length)];
            el.textContent = randomCity[Math.floor(Math.random() * randomCity.length)];
          }
        });
      },
    });

    // Reveal actual text with smooth animation
    tl.to(charElements, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power3.out',
      delay: revealDelay,
      onComplete: () => {
        // Add subtle glow pulse
        gsap.to(charElements, {
          textShadow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 20px rgba(255, 215, 0, 0.4)',
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      },
    });

    // Cleanup
    return () => {
      tl.kill();
    };
  }, [text]);

  // Split text into spans for individual character control
  return (
    <div
      ref={textRef}
      className={`relative inline-block ${className}`}
      aria-label={text}
      style={{
        background: 'linear-gradient(45deg, #ff4500, #ffd700)', // Saffron to gold gradient
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text.split('').map((char, index) => (
        <span key={index} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}