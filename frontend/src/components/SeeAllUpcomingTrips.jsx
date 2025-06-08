
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaUsers, FaCalendarAlt } from 'react-icons/fa';

const SeeAllUpcomingTrips = () => {
  const headingRef = useRef(null);
  const cardRefs = useRef([]);
  const videoRefs = useRef([]);
  const contentRefs = useRef([]);

  useEffect(() => {
    // Animate heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }

    // Animate cards with stagger
    if (cardRefs.current.length) {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out', delay: 0.5 }
      );
    }

    // Hover effect for cards and video playback
    cardRefs.current.forEach((card, index) => {
      if (card && videoRefs.current[index] && contentRefs.current[index]) {
        const video = videoRefs.current[index];
        const content = contentRefs.current[index];
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            duration: 0.3,
          });
          gsap.to(content, { opacity: 0, duration: 0.2 }); // Hide content (excl. button)
          gsap.to(video, { opacity: 1, duration: 0.2 }); // Show video
          video.play().catch((error) => console.error('Video play failed:', error));
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
          });
          gsap.to(content, { opacity: 1, duration: 0.2 }); // Show content
          gsap.to(video, { opacity: 0, duration: 0.2 }); // Hide video
          video.pause();
          video.currentTime = 0; // Reset to start
        });
      }
    });

    // Hover effect for buttons
    const buttons = document.querySelectorAll('.book-now-button');
    buttons.forEach((button) => {
      if (button) {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.1,
            background: 'linear-gradient(45deg, #1a5c38, #10b981)',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
            duration: 0.3,
          });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            background: '#1a5c38',
            boxShadow: 'none',
            duration: 0.3,
          });
        });
      }
    });

    // Cleanup event listeners
    return () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          card.removeEventListener('mouseenter', () => {});
          card.removeEventListener('mouseleave', () => {});
        }
      });
      buttons.forEach((button) => {
        if (button) {
          button.removeEventListener('mouseenter', () => {});
          button.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-teal-800 mb-8 font-display"
        >
          See All Upcoming Trips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trips.map((trip, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="relative bg-gray-100 rounded-xl overflow-hidden shadow-md h-[500px] flex flex-col"
              aria-label={`Trip card for ${trip.title}, hover to play video`}
            >
              {/* Video (hidden by default) */}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="absolute top-0 left-0 w-full h-full object-cover opacity-0"
                src={trip.videoUrl}
                muted
                loop
                preload="metadata"
                poster={trip.imageUrl}
              />
              {/* Card Content (visible by default, excl. button) */}
              <div ref={(el) => (contentRefs.current[index] = el)} className="relative z-10 flex-grow">
                {/* Background Image */}
                <div
                  className="w-full h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${trip.imageUrl})` }}
                ></div>
                {/* Content (excl. button) */}
                <div className="p-6 pb-16"> {/* Added pb-16 to reserve space for button */}
                  <h3 className="text-xl font-bold text-teal-800 font-display mb-2">{trip.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 font-body mb-2">
                    <FaCalendarAlt className="text-teal-800" />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 font-body mb-4">
                    <FaUsers className="text-teal-800" />
                    <span>{trip.groupSize}</span>
                  </div>
                  <p className="text-lg font-semibold text-teal-800 font-body mb-4">{trip.price}</p>
                  <p className="text-gray-600 font-body line-clamp-2">{trip.description}</p> {/* Truncate description */}
                </div>
              </div>
              {/* Book Now Button (always visible) */}
              <a
                href={`/booking`}
                className="book-now-button inline-block px-6 py-2 text-white bg-teal-800 rounded-full transition-all font-body z-20 absolute bottom-6 left-6 right-6 text-center"
                aria-label={`Book trip to ${trip.title}`}
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const trips = [
  {
    title: 'Manali',
    duration: '2N/3D',
    groupSize: '20 Person',
    price: '₹4,999.00',
    description: 'Escape to Manali, where the mountains whisper adventure and peace ❄️🏔️',
    imageUrl:
      'https://images.unsplash.com/photo-1519955266818-0231b63402bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhfGVufDB8fDB8fHww',
    videoUrl: '/video1.mp4',
  },
  {
    title: 'Goa',
    duration: '3N/4D',
    groupSize: '15 Person',
    price: '₹7,499.00',
    description: 'Dive into Goa’s vibrant beaches and lively nightlife 🌊🥳',
    imageUrl:
      'https://images.unsplash.com/photo-1626407339413-60f4e6bc455e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1haGFyYXNodHJhfGVufDB8fDB8fHww',
    videoUrl: '/video3.mp4',
  },
  {
    title: 'Ladakh',
    duration: '5N/6D',
    groupSize: '10 Person',
    price: '₹12,999.00',
    description: 'Ride through Ladakh’s rugged terrains and ancient monasteries 🏍️🙏',
    imageUrl:
      'https://images.unsplash.com/photo-1573143950521-36ef5345dae9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFoYXJhc2h0cmF8ZW58MHx8MHx8fDA%3D',
    videoUrl: '/video4.mp4',
  },
];

export default SeeAllUpcomingTrips;