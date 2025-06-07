import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaStar } from "react-icons/fa";
import TravelGallery from "./ui/ImageAresal";

const HeroSection = () => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const videos = [videoRef1.current, videoRef2.current, videoRef3.current].filter(Boolean);

    // Set initial state
    if (videos.length > 0) {
      gsap.set(videos[2], { opacity: 1, zIndex: 1 });
      gsap.set(videos.slice(0, 2), { opacity: 0, zIndex: 0 });
    }

    // GSAP timeline for video transitions
    const tl = gsap.timeline({ repeat: -1 });
    videos.forEach((_, index) => {
      const nextIndex = (index + 1) % videos.length;
      tl.to(videos[index], {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          videos.forEach((v, i) => {
            if (v) v.style.zIndex = i === nextIndex ? "1" : "0";
          });
        },
      })
        .to(videos[nextIndex], { opacity: 1, duration: 1, ease: "power2.inOut" }, "-=0.8")
        .to({}, { duration: 8 });
    });

    // Text animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(textRef.current, {
              y: -10,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        }
      );
    }

    // Stats animation
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "back.out(1.4)",
          delay: 0.5,
        }
      );
    }

    // CTA button animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 1 }
      );
    }

    // Gallery animation (minimal, fade-in only)
    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power3.out", delay: 1.5 }
      );
    }

    // Interactive hover effects for textElements
    const textElements = textRef.current?.children ? gsap.utils.toArray(textRef.current.children) : [];
    const textListeners = textElements.map((el) => {
      const onMouseEnter = () => {
        gsap.to(el, {
          scale: 1.05,
          color: "#10b981",
          textShadow: "0 0 10px rgba(16, 185, 129, 0.7)",
          duration: 0.3,
        });
      };
      const onMouseLeave = () => {
        gsap.to(el, {
          scale: 1,
          color: "#ffffff",
          textShadow: "none",
          duration: 0.3,
        });
      };
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
      return { el, onMouseEnter, onMouseLeave };
    });

    // Interactive hover effects for statsElements
    const statsElements = statsRef.current?.children ? gsap.utils.toArray(statsRef.current.children) : [];
    const statsListeners = statsElements.map((el) => {
      const onMouseEnter = () => {
        gsap.to(el, { scale: 1.1, duration: 0.3 });
      };
      const onMouseLeave = () => {
        gsap.to(el, { scale: 1, duration: 0.3 });
      };
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
      return { el, onMouseEnter, onMouseLeave };
    });

    // Interactive hover effects for CTA
    let ctaEnter, ctaLeave;
    if (ctaRef.current) {
      ctaEnter = () => {
        gsap.to(ctaRef.current, {
          scale: 1.1,
          boxShadow: "0 0 15px rgba(16, 185, 129, 0.8)",
          background: "linear-gradient(45deg, #1a5c38, #10b981)",
          duration: 0.3,
        });
      };
      ctaLeave = () => {
        gsap.to(ctaRef.current, {
          scale: 1,
          boxShadow: "none",
          background: "#10b981",
          duration: 0.3,
        });
      };
      ctaRef.current.addEventListener("mouseenter", ctaEnter);
      ctaRef.current.addEventListener("mouseleave", ctaLeave);
    }

    // Cleanup
    return () => {
      textListeners.forEach(({ el, onMouseEnter, onMouseLeave }) => {
        if (el) {
          el.removeEventListener("mouseenter", onMouseEnter);
          el.removeEventListener("mouseleave", onMouseLeave);
        }
      });
      statsListeners.forEach(({ el, onMouseEnter, onMouseLeave }) => {
        if (el) {
          el.removeEventListener("mouseenter", onMouseEnter);
          el.removeEventListener("mouseleave", onMouseLeave);
        }
      });
      if (ctaRef.current && ctaEnter && ctaLeave) {
        ctaRef.current.removeEventListener("mouseenter", ctaEnter);
        ctaRef.current.removeEventListener("mouseleave", ctaLeave);
      }
      gsap.killTweensOf([
        videoRef1.current,
        videoRef2.current,
        videoRef3.current,
        textRef.current,
        statsRef.current?.children,
        ctaRef.current,
        galleryRef.current,
      ]);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background Videos */}
      <video
        ref={videoRef1}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ willChange: "opacity" }}
        src="/video1.mp4"
        autoPlay
        loop
        muted
        preload="auto"
      />
      <video
        ref={videoRef2}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ willChange: "opacity" }}
        src="/video4.mp4"
        autoPlay
        loop
        muted
        preload="auto"
      />
      <video
        ref={videoRef3}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ willChange: "opacity" }}
        src="/video3.mp4"
        autoPlay
        loop
        muted
        preload="auto"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-4 sm:px-6 md:px-8">
        <div ref={textRef} className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 cursor-pointer font-display">
            Discover New Horizons
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl cursor-pointer font-body">
            Embark on Epic Adventures – Your Journey Begins Here!
          </p>
        </div>

        {/* Call-to-Action Button */}
        <button
          ref={ctaRef}
          className="px-6 py-3 text-base sm:text-lg font-semibold text-white bg-teal-600 rounded-full transition-all duration-300 font-body"
          aria-label="Plan your travel journey"
        >
          Plan Your Journey
        </button>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8 text-xs sm:text-sm md:text-base"
        >
          <div className="flex flex-col items-center cursor-pointer">
            <p className="font-bold flex items-center gap-1">
              <FaStar className="text-yellow-400" /> Google
            </p>
            <p>5 Stars</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <p className="font-bold">Instagram</p>
            <p>Community of 380+</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <p className="font-bold flex items-center gap-1">
              <FaStar className="text-blue-600" /> Facebook
            </p>
            <p>5 Stars</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <p className="font-bold">Itineraries</p>
            <p>500+ Adventures</p>
          </div>
        </div>
      </div>

      {/* Travel Gallery at Bottom Center */}
      <div
        ref={galleryRef}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-[90%] sm:max-w-[80%] md:max-w-3xl h-28 sm:h-36 md:h-44 z-20"
      >
        <TravelGallery />
      </div>
    </div>
  );
};

export default HeroSection;