import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar, FaQuoteLeft, FaSuitcase, FaPassport } from "react-icons/fa";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const ReviewsPage = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);
  const starsRef = useRef([]); // Initialize as empty array

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

    // Stats animation (counters)
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll(".counter");
      counters.forEach((counter) => {
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: counter.dataset.target,
            duration: 2,
            ease: "power1.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
            onUpdate: function () {
              counter.innerText = Math.floor(this.targets()[0].innerText);
            },
          }
        );
      });
    }

    // Carousel cards animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 80%",
            },
          }
        );
        // Hover/flip effect
        const onMouseEnter = () => {
          gsap.to(card.querySelector(".front"), { y: "-100%", duration: 0.5 });
          gsap.to(card.querySelector(".back"), { y: "0%", duration: 0.5 });
        };
        const onMouseLeave = () => {
          gsap.to(card.querySelector(".front"), { y: "0%", duration: 0.5 });
          gsap.to(card.querySelector(".back"), { y: "100%", duration: 0.5 });
        };
        card.addEventListener("mouseenter", onMouseEnter);
        card.addEventListener("mouseleave", onMouseLeave);
        return () => {
          card.removeEventListener("mouseenter", onMouseEnter);
          card.removeEventListener("mouseleave", onMouseLeave);
        };
      }
    });

    // Star ratings animation
    starsRef.current.forEach((starContainer, index) => {
      if (starContainer) {
        const stars = starContainer.querySelectorAll(".star");
        gsap.fromTo(
          stars,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: index * 0.2,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    // Background travel icons animation
    const icons = sectionRef.current?.querySelectorAll(".travel-icon");
    if (icons) {
      icons.forEach((icon, index) => {
        gsap.fromTo(
          icon,
          { opacity: 0.2, y: -15 },
          {
            opacity: 0.5,
            y: 15,
            duration: 2.5,
            delay: index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      });
    }

    // Auto-scroll carousel
    const scrollWidth = carouselRef.current?.scrollWidth || 0;
    const clientWidth = carouselRef.current?.clientWidth || 0;
    if (carouselRef.current && scrollWidth > clientWidth) {
      gsap.to(carouselRef.current, {
        scrollLeft: scrollWidth - clientWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([
        headingRef.current,
        statsRef.current?.querySelectorAll(".counter") || [],
        cardsRef.current.filter((card) => card !== null && card !== undefined), // Enhanced null check
        // Safer star cleanup
        (Array.isArray(starsRef.current) ? starsRef.current : [])
          .filter((container) => container instanceof Element)
          .flatMap((container) => Array.from(container.querySelectorAll(".star"))), // Fixed line ~158
        sectionRef.current?.querySelectorAll(".travel-icon") || [],
        carouselRef.current,
      ]);
    };
  }, []);

  const testimonials = [
    {
      id: "1",
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      quote: "An unforgettable group tour to Himachal! The stays were cozy, and the transport was top-notch.",
      fullReview: "WanderVibe made our group tour to Himachal seamless and exciting. The handpicked stays were charming, and the comfortable transport ensured we enjoyed every moment. Their 24/7 support was a lifesaver!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    },
    {
      id: "2",
      name: "Rohan Patel",
      location: "Mumbai",
      rating: 5,
      quote: "The Rajasthan tour was a cultural delight. Highly recommend their premium city tours!",
      fullReview: "The Rajasthan tour was a dream come true. WanderVibe’s premium city tours brought the cultural richness of Jaipur and Udaipur to life. The guides were knowledgeable, and the itinerary was perfectly planned.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
    },
    {
      id: "3",
      name: "Anita Desai",
      location: "Bangalore",
      rating: 5,
      quote: "Our corporate retreat in Uttarakhand was flawless. Luxury travel at its best!",
      fullReview: "WanderVibe organized a corporate retreat in Uttarakhand that exceeded expectations. The luxury accommodations and seamless logistics made it a memorable experience for our team. Their attention to detail is unmatched.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
    },
    {
      id: "4",
      name: "Vikram Singh",
      location: "Chennai",
      rating: 5,
      quote: "Ladakh was breathtaking, thanks to WanderVibe’s custom tour planning.",
      fullReview: "The custom tour to Ladakh was an adventure of a lifetime. WanderVibe’s team tailored every detail to our preferences, from monasteries to desert camps. Their 24/7 assistance ensured we felt supported throughout.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    },
  ];

  const stats = [
    { label: "5-Star Reviews", value: 500 },
    { label: "Happy Travelers", value: 3800 },
    { label: "Destinations Covered", value: 150 },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      {/* Frosted Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-80"></div>

      {/* Animated Travel Icons */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="travel-icon absolute text-teal-600 opacity-20"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
            fontSize: `${1 + Math.random() * 0.5}rem`,
          }}
        >
          {i % 2 === 0 ? <FaSuitcase /> : <FaPassport />}
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-16">
        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 text-center mb-12"
        >
          Reviews & Testimonials
        </h1>

        {/* Stats Section */}
        <div ref={statsRef} className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-display font-bold text-teal-600 counter" data-target={stat.value}>
                0
              </p>
              <p className="text-sm sm:text-base font-body text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div
          ref={carouselRef}
          className="w-full flex flex-row gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hidden pb-4"
          role="region"
          aria-label="Testimonials carousel"
        >
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, i) => (
              <div
                key={testimonial.id}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el; // Only assign if el is valid
                }}
                className="group relative w-[85%] sm:w-80 md:w-96 h-80 flex-shrink-0 snap-center rounded-lg overflow-hidden bg-white shadow-lg"
              >
                {/* Front Face */}
                <div className="front absolute inset-0 flex flex-col p-6 bg-white">
                  <FaQuoteLeft className="text-teal-600 text-2xl mb-2" />
                  <p className="text-sm sm:text-base font-body text-gray-700 flex-grow">"{testimonial.quote}"</p>
                  <div className="flex items-center mt-4">
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.name}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-display font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-xs font-body text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <div
                    ref={(el) => {
                      if (el) starsRef.current[i] = el; // Only assign if el is valid
                    }}
                    className="flex mt-2"
                    aria-label={`${testimonial.rating} stars`}
                  >
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <FaStar key={j} className="star text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
                {/* Back Face */}
                <div className="back absolute inset-0 flex flex-col p-6 bg-teal-600 text-white translate-y-full">
                  <p className="text-sm font-body flex-grow">{testimonial.fullReview}</p>
                  <p className="text-sm font-display font-semibold mt-4">{testimonial.name}</p>
                  <p className="text-xs font-body">{testimonial.location}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 font-body">No testimonials available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;