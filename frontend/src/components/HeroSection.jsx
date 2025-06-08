import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaStar, FaInstagram, FaFacebook, FaMapMarkedAlt } from "react-icons/fa";
import TravelGallery from "./ui/ImageAresal";

const HeroSection = () => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const galleryRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const videos = [videoRef1.current, videoRef2.current, videoRef3.current].filter(Boolean);

    // Set initial state for videos
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

    // Text and logo animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(textRef.current.children, {
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
        { opacity: 0, x: 20, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "elastic.out(1, 0.8)",
          delay: 0.7,
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

    // Gallery animation
    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power3.out", delay: 1.5 }
      );
    }

    // Interactive hover effects for textElements
    const textElements = textRef.current?.children ? gsap.utils.toArray(textRef.current.children) : [];
    const textListeners = textElements.map((el, index) => {
      const onMouseEnter = () => {
        gsap.to(el, {
          scale: index === 0 ? 1.1 : 1.05,
          color: index !== 0 ? "#10b981" : undefined,
          filter: index === 0 ? "drop-shadow(0 0 10px rgba(16, 185, 129, 0.7))" : undefined,
          textShadow: index !== 0 ? "0 0 10px rgba(16, 185, 129, 0.7)" : undefined,
          duration: 0.3,
        });
      };
      const onMouseLeave = () => {
        gsap.to(el, {
          scale: 1,
          color: index !== 0 ? "#ffffff" : undefined,
          filter: index === 0 ? "none" : undefined,
          textShadow: index !== 0 ? "none" : undefined,
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
        gsap.to(el, {
          scale: 1.05,
          borderColor: "#10b981",
          boxShadow: "0 4px 10px rgba(16, 185, 129, 0.5)",
          duration: 0.3,
          ease: "power2.out",
        });
      };
      const onMouseLeave = () => {
        gsap.to(el, {
          scale: 1,
          borderColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: "none",
          duration: 0.3,
          ease: "power2.out",
        });
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
        textRef.current?.children,
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

      {/* Stats Section (Top-Right Corner) */}
      <div
        ref={statsRef}
        className="absolute top-5 right-4 flex  mt-20 gap-2 text-xs sm:text-sm z-10"
      >
        {/* Google Rating */}
        <div className="flex items-center px-3 py-1 bg-transparent border border-white border-opacity-20 rounded-md cursor-pointer transition-all duration-300 hover:border-teal-500">
          <FaStar className="text-yellow-400 text-sm sm:text-base mr-1" />
          <div>
            <p className="font-semibold text-white">Google</p>
            <p className="text-teal-200 text-xs">5.0 Stars</p>
          </div>
        </div>

        {/* Instagram Community */}
        <div className="flex items-center px-3 py-1 bg-transparent border border-white border-opacity-20 rounded-md cursor-pointer transition-all duration-300 hover:border-teal-500">
          <FaInstagram className="text-pink-500 text-sm sm:text-base mr-1" />
          <div>
            <p className="font-semibold text-white">Instagram</p>
            <p className="text-teal-200 text-xs">380K+</p>
          </div>
        </div>

        {/* Facebook Rating */}
        <div className="flex items-center px-3 py-1 bg-transparent border border-white border-opacity-20 rounded-md cursor-pointer transition-all duration-300 hover:border-teal-500">
          <FaFacebook className="text-blue-600 text-sm sm:text-base mr-1" />
          <div>
            <p className="font-semibold text-white">Facebook</p>
            <p className="text-teal-200 text-xs">4.9 Stars</p>
          </div>
        </div>

        {/* Itineraries */}
       <div className="hidden sm:inline">
         <div className="flex items-center px-3 py-1 bg-transparent border  border-white border-opacity-20 rounded-md cursor-pointer transition-all duration-300 hover:border-teal-500">
          <FaMapMarkedAlt className="text-teal-300 text-sm sm:text-base mr-1" />
          <div>
            <p className="font-semibold text-white">Itineraries</p>
            <p className="text-teal-200 text-xs">500+</p>
          </div>
        </div>
       </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-4 sm:px-6 md:px-8">
        <div ref={textRef} className="mb-0 flex flex-col items-center">
          <a
            href="/"
            aria-label="Sansar Travals Homepage"
            className=""
            ref={logoRef}
          >
            <img
              src="/logo.png"
              alt="Sansar Travals Logo"
              className="h-48 object-contain transition-all duration-300"
            />
          </a>
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
          className="px-6 py-3 text-base sm:text-lg font-semibold mb-5 text-white bg-teal-600 rounded-full transition-all duration-300 font-body"
          aria-label="Plan your travel journey"
        >
          Plan Your Journey
        </button>
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