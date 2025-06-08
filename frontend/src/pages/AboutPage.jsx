import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaMapPin, FaUsers, FaHotel, FaBus, FaCity, FaHeadset, FaBriefcase, FaCompass } from "react-icons/fa";
import MediaGrid from "../components/MediaGrid";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const mapRef = useRef(null);
  const servicesRef = useRef(null);
  const pinsRef = useRef([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Intro text animation
    if (introRef.current) {
      gsap.fromTo(
        introRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Map pins animation
    pinsRef.current.forEach((pin, index) => {
      if (pin) {
        gsap.fromTo(
          pin,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 80%",
            },
          }
        );
        // Hover effect
        const onMouseEnter = () => {
          gsap.to(pin, { scale: 1.2, duration: 0.3 });
          gsap.to(pin.querySelector(".tooltip"), { opacity: 1, y: -10, duration: 0.3 });
        };
        const onMouseLeave = () => {
          gsap.to(pin, { scale: 1, duration: 0.3 });
          gsap.to(pin.querySelector(".tooltip"), { opacity: 0, y: 0, duration: 0.3 });
        };
        pin.addEventListener("mouseenter", onMouseEnter);
        pin.addEventListener("mouseleave", onMouseLeave);
        return () => {
          pin.removeEventListener("mouseenter", onMouseEnter);
          pin.removeEventListener("mouseleave", onMouseLeave);
        };
      }
    });

    // Service cards animation
    if (servicesRef.current) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Background travel icons animation
    const icons = sectionRef.current?.querySelectorAll(".travel-icon");
    if (icons) {
      icons.forEach((icon, index) => {
        gsap.fromTo(
          icon,
          { opacity: 0.3, y: -20 },
          {
            opacity: 0.6,
            y: 20,
            duration: 3,
            delay: index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([
        headingRef.current,
        introRef.current?.children,
        pinsRef.current,
        cardsRef.current,
        sectionRef.current?.querySelectorAll(".travel-icon"),
      ]);
    };
  }, []);

  const destinations = [
    { name: "Uttarakhand", desc: "Serene Landscapes", top: "40%", left: "20%" },
    { name: "Himachal", desc: "Snowy Peaks", top: "30%", left: "50%" },
    { name: "Rajasthan", desc: "Cultural Richness", top: "60%", left: "30%" },
    { name: "J&K", desc: "Paradise on Earth", top: "20%", left: "70%" },
  ];

  const services = [
    { icon: <FaUsers />, title: "Group & Custom Tours", desc: "Tailored adventures for groups or solo travelers." },
    { icon: <FaHotel />, title: "Handpicked Stays", desc: "Curated accommodations for comfort and charm." },
    { icon: <FaBus />, title: "Comfortable Transport", desc: "Reliable and cozy travel options." },
    { icon: <FaCity />, title: "150+ Premium City Tours", desc: "Explore vibrant cities with expert guides." },
    { icon: <FaHeadset />, title: "24/7 Customer Assistance", desc: "Support whenever you need it." },
    { icon: <FaBriefcase />, title: "Corporate & Luxury Travel", desc: "Premium experiences for business or leisure." },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1553290322-0440fe3b1ddd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwbWFwfGVufDB8fDB8fHww')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-80"></div>

      {/* Animated Travel Icons */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="travel-icon absolute text-teal-600 opacity-30"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            fontSize: `${1 + Math.random()}rem`,
          }}
        >
          {i % 0 === 0 ? <FaMapPin /> : i % 2 === 0 ? <FaBriefcase /> : <FaCompass />}
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-16">
        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mt-12 text-center mb-12"
        >
          About Us
        </h1>

        {/* Intro Section */}
        <div ref={introRef} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg sm:text-xl text-gray-700 font-body mb-4">
            Welcome to our travel family! At <span className="text-teal-600 font-bold font-serif">SNASAR TRAVALS</span>, we believe
            travel is more than just visiting places – it’s about creating unforgettable experiences.
          </p>
          <p className="text-base sm:text-lg text-gray-600 font-body">
            Whether it’s a group adventure, a customized getaway, or a corporate retreat, we ensure every journey is
            seamless, exciting, and memorable. From the serene landscapes of Uttarakhand and Himachal to the cultural
            richness of Rajasthan and J&K, we curate trips that cater to every traveler’s dream.
          </p>
        </div>

        {/* Interactive Map Section */}
        <div ref={mapRef} className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden mb-16">
          <img
            src="https://images.unsplash.com/photo-1553290322-0440fe3b1ddd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwbWFwfGVufDB8fDB8fHww"
            alt="India Map Background"
            className="w-full h-full object-cover opacity-50"
          />
          {destinations.map((dest, i) => (
            <div
              key={dest.name}
              ref={(el) => (pinsRef.current[i] = el)}
              className="absolute flex items-center justify-center cursor-pointer"
              style={{ top: dest.top, left: dest.left }}
            >
              <FaMapPin className="text-teal-600 text-2xl sm:text-3xl" />
              <div className="tooltip absolute top-[-40px] opacity-0 bg-teal-600 text-white text-sm font-body px-3 py-1 rounded shadow-lg">
                {dest.name}: {dest.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div ref={servicesRef} className="w-full">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 text-center mb-8">
            Our Offerings
          </h2>
          <div className="flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hidden pb-4">
            {services.map((service, i) => (
              <div
                key={service.title}
                ref={(el) => (cardsRef.current[i] = el)}
                className="group relative w-[80%] sm:w-64 md:w-72 h-80 flex-shrink-0 snap-center bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Front Face */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white transition-transform duration-500 group-hover:-translate-y-full">
                  <div className="text-4xl text-teal-600 mb-4">{service.icon}</div>
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-900 text-center">
                    {service.title}
                  </h3>
                </div>
                {/* Back Face */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-teal-600 text-white translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="text-lg sm:text-xl font-display font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm sm:text-base font-body text-center">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MediaGrid />
    </div>
  );
};

export default AboutPage;